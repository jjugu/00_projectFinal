package com.majorcompany.hicompany.jwt;

import java.security.Key;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.majorcompany.hicompany.exception.TokenException;
import com.majorcompany.hicompany.member.dto.TokenDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.entity.MemberRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/*
 * JWT(Json Web Token)의 구조
 * 
 * 1. 헤더(Header)
 * 	 - typ: 토큰의 타입 지정(JWT)
 * 	 - alg: 해싱 알고리즘으로 Verify Signature에서 사용 됨
 * 
 * 2. 내용 또는 정보(Payload)
 * 	 - 토큰에 담을 정보가 들어 있음
 * 	 - 담는 정보의 한 조각을 클레임(claim - name과 value의 쌍으로 구성)이라 부름
 *   	a. 등록된 클레임(registered claim)
 *   		: 토큰에 대한 정보가 담김
 *   		  (iss: 토큰 발급자(issuer)
 *   		   sub: 토큰 제목(subject)
 *   		   aud: 토큰 대상자(audience)
 *   		   exp: 토큰 만료 시간(expiration)
 *   		   nbf: 토큰 활성화(발급) 날짜(not before)
 *   		   iat: 토큰 활성화(발급) 시간(issued at))
 *   
 *   	b. 공개 클레임(public claim)
 *   		: 사용자 정의 클레임으로 공개용 정보를 위해 사용(충돌 방지를 위해 URI로 구성)
 *   
 *   	c. 비공개 클레임(private claim)
 *   		: 사용자 정의 클레임으로 서버(JWT 발급자)와 클라이언트 사이에 임의로 지정한 정보를 저장
 *   		  (충돌 발생 우려가 있어 조심해서 사용할 것)
 *    
 * 3. 서명(Verify Signature)
 * 	 - Header 인코딩 값과 Payload 인코딩 값을 합쳐서 비밀 키로 해쉬(헤더의 해싱 알고리즘으로)하여 생성
 */

/* 토큰 생성, 토큰 인증(Authentication 객체 반환), 토큰 유효성 검사 */
@Component
public class TokenProvider {
	
	private static final Logger log = LoggerFactory.getLogger(TokenProvider.class);
	private static final String AUTHORITIES_KEY = "auth";
	private static final String BEARER_TYPE = "Bearer";
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 120;	// 120분(ms 단위)
//	private static final long ACCESS_TOKEN_EXPIRE_TIME = 3000;	// 30분(ms 단위)
	
	private final UserDetailsService userDetailsService;
	
	private final Key key;		// java.security.Key로 임포트 할 것
	
	public TokenProvider(@Value("${jwt.secret}")String sercretKey, UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
		byte[] keyBytes = Decoders.BASE64.decode(sercretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	/* 1. 토큰 생성 메소드 */
	public TokenDTO generateTokenDTO(Member member) {
		
		List<String> roles = new ArrayList<>();
		for(MemberRole memberRole : member.getMemberRole()) {
			roles.add(memberRole.getAuthority().getAuthorityName());
		}
		
		/* 1. 회원 아이디를 "sub"이라는 클레임으로 토큰에 추가 */
		Claims claims = Jwts.claims().setSubject(member.getMemberId());
		
		/* 2. 회원의 권한들을 "auth"라는 클레임으로 토큰에 추가 */
		claims.put("auth", roles);
		
		long now = System.currentTimeMillis();
		
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
		String accessToken = Jwts.builder()
								 .setClaims(claims)
								 
								 /* 3. 토큰의 만료 기간을 DATE형으로 토큰에 추가("exp"라는 클레임으로 long 형으로 토큰에 추가) */
								 .setExpiration(accessTokenExpiresIn)
								 .signWith(key, SignatureAlgorithm.HS512)
								 .compact();
		
		return new TokenDTO(BEARER_TYPE, member.getMemberName(), accessToken, accessTokenExpiresIn.getTime());
	}
	/* 2. 토큰의 등록된 클레임의 subject에서 해당 회원의 아이디를 추출 */
	public String getUserId(String token) {
		return Jwts.parserBuilder()
				   .setSigningKey(key).build()
				   .parseClaimsJws(token)
				   .getBody()					// payload의 Claims 추출	
				   .getSubject();				// Claim중에 등록 클레임에 해당하는 sub값 추출(회원 아이디)
	}
	
	/* 3. AccessToken으로 인증 객체 추출 */
	public Authentication getAuthentication(String token) {
		
		/*  토큰에서 claim들 추출(토큰 복호화) */
		Claims claims = parseClaims(token);		// 아래 5번에서 만든 메소드
		
		if(claims.get(AUTHORITIES_KEY) == null) {
			throw new RuntimeException("권한 정보가 없는 토큰 입니다.");
		}
		
		/* 클레임에서 권한 정보 가져오기 */
		Collection<? extends GrantedAuthority> authorities = 
//				Arrays.stream(claims.get("auth").toString().split(","))	// 변수명 넣어도 상관없음
				Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))	// ex: "ROLE_ADMIN"이랑 ROLE_MEMBER"같은 문자열이 들어있는 문자열 배열
					  .map(role -> new SimpleGrantedAuthority(role))				// 문자열 배열에 들어있는 권한 문자열 마다 SimpleGrantedAuthority 객체로 만듦
					  .collect(Collectors.toList());								// List<SimpleGrantedAuthority>로 만듦
					  
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
		
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}
	/* 4. 토큰 유효성 검사 */
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("[TokenProvider] 잘못된 JWT 서명입니다.");
			throw new TokenException("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			log.info("[TokenProvider] 만료된 JWT 토큰입니다.");
			throw new TokenException("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			log.info("[TokenProvider] 지원되지 않는 JWT 토큰입니다.");
			throw new TokenException("지원되지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			log.info("[TokenProvider] JWT 토큰이 잘못되었습니다.");
			throw new TokenException("JWT 토큰이 잘못되었습니다.");
		}
	}
	
	/* 5. AccessToken에서 클레임 추출하는 메소드 */
	private Claims parseClaims(String token) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();			// 토큰이 만료되어 예외가 발생하더라도 클레임 값들은 뽑을 수 있다.
		}
	}
}
