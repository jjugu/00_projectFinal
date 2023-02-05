package com.majorcompany.hicompany.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.majorcompany.hicompany.jwt.TokenProvider;

@EnableWebSecurity
public class SecurityConfig {
	
	private final TokenProvider tokenProvider;
	
	@Autowired
	public SecurityConfig(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	/* 1. 암호화 처리를 위한 PasswordEncoder를 빈으로 설정(빈을 등록 시 메소드 이름 오타 없을 것) */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/* 2. 시큐리티 설정을 무시 할 정적 리소스 등록 */
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) ->web.ignoring().antMatchers("/css/**", "/js/**", "/images/**", "/lib/**", "/memberimgs/**");
	}
	
	/* 3. HTTP요청에 대한 권한별 설정(세션 인증 -> 토큰 인증으로 인해 바뀐 부분 존재) */
	@Bean
	public SecurityFilterChain filterChanin(HttpSecurity http) throws Exception {
	
		http.csrf().disable()	// 토큰 위조 공격 방지 관련해서는 처리 할 필요가 없다.
			.exceptionHandling()
			.and()
			.authorizeRequests()
				.antMatchers("/").authenticated()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()	// cors를 위해 preflight 요청 처리용 options 요청 허용
																	// preflight request란?
																	// 요청 할 url이 외부 도메인일 경우 웹 브라우저에서 자체 실행되며
																	// options 메소드로 사전 요청을 보내게 된다.
																	// 사전에 요청이 안전한지 확인하기 위함(유효한지 서버에 미리 파악할 수 있도록 보내는 수단이다.)
			.antMatchers("/auth/**").permitAll()
			.antMatchers("/api/v1/leaveApp").permitAll()
			.antMatchers("/api/v1/leaveApp-memberCode").permitAll()
			.antMatchers("/api/v1/leaveApp-memberCode1").hasRole("LEADER")
			.antMatchers("/api/v1/leaveApp-memberCode2").hasRole("ADMIN")
			.antMatchers("/api/v1/leaveApp-management").hasAnyRole("LEADER", "ADMIN")
			.antMatchers("/api/v1/leaveApp-management/**").permitAll()
			
//			.antMatchers("/board").permitAll()
//			.antMatchers("/management/").hasAnyRole("LEADER", "ADMIN")
//	    	.antMatchers("/api/**").hasRole("ADMIN")
//	    	.antMatchers("/api/**").hasAnyRole("USER", "ADMIN")
//			.anyRequest().permitAll();	// 어떤 요청이든 허용 가능, 시큐리티를 활용한 로그인이 모두 완성 되지 않았을 때 활용할 것
			.and()
				/* 세션 인증 방식을 쓰지 않겠다는 설정 */
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.cors()
			.and()
				
				/* jwt 토큰 방식을 쓰겠다는 설정 */
				.apply(new JwtSecurityConfig(tokenProvider));
			
		return http.build();
	}
	
	/* 4. CORS 설정용 Bean(허용 할 origin과 httpMethod 종류와 header 값) */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Content-type"
													, "Access-Control-Allow-Headers", "Authorization"
													, "X-Requested-With"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
