package com.majorcompany.hicompany.member.service;

import java.text.SimpleDateFormat;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.exception.DuplicatedMemberEmailException;
import com.majorcompany.hicompany.exception.DuplicatedMemberIdException;
import com.majorcompany.hicompany.exception.LoginFailedException;
import com.majorcompany.hicompany.jwt.TokenProvider;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.dto.MemberGrade;
import com.majorcompany.hicompany.member.dto.TokenDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.entity.MemberRole;
import com.majorcompany.hicompany.member.repository.MemberRepository;
import com.majorcompany.hicompany.member.repository.MemberRoleRepository;

@Service
public class AuthService {
	
	private static final Logger log = LoggerFactory.getLogger(AuthService.class);
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	private final ModelMapper modelMapper;
	private final MemberRoleRepository memberRoleRepository;
	
	@Autowired
	public AuthService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, ModelMapper modelMapper, MemberRoleRepository memberRoleRepository) {
		this.memberRepository = memberRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenProvider = tokenProvider;
		this.modelMapper = modelMapper;
		this.memberRoleRepository = memberRoleRepository;
	}

	public Object login(MemberDTO memberDTO) {
		log.info("[AuthService] Login Start =====================================");
		
		/* 1. 아이디 조회 */
		Member member = memberRepository.findByMemberId(memberDTO.getMemberId());
		
		if(member == null) {
			throw new LoginFailedException(memberDTO.getMemberId() + "를 찾을 수 없습니다.");
		}
		
		/* 2. 비밀번호 매칭(BCrypt 암호화 라이브러리 bean을 의존성 주입받아 처리하는 부분부터 security 설정 부분을 추가해 보자.) */
		/* matches(평문, 다이제스트) */
		if(!passwordEncoder.matches(memberDTO.getMemberPw(), member.getMemberPw())) {
			throw new LoginFailedException("잘못된 비밀번호 입니다.");
		}
		
		/* 3. 토큰 발급*/
		TokenDTO tokenDTO = tokenProvider.generateTokenDTO(member);
		log.info("[AuthService] Login End =======================================");
		return tokenDTO;
	}

	@Transactional
	public MemberDTO signup(MemberDTO memberDTO) {
		log.info("[AuthService] Signup Start ==================================");
		
		/* 우선 repository를 통해 쿼리를 날리기 전에 DTO에 담긴 값을 Entity로 옮기자. */
		Member registMember = modelMapper.map(memberDTO, Member.class);
		
		/* 이메일 중복 유효성 검사(선택적) */
		if(memberRepository.findByMemberEmail(memberDTO.getMemberEmail()) != null) {
			log.info("[AuthService] 이메일이 중복됩니다.");
			throw new DuplicatedMemberEmailException("이메일이 중복됩니다.");
		}
		
		/* 아이디 중복 유효성 검사(선택적) */
		if(memberRepository.findByMemberId(memberDTO.getMemberId()) != null) {
			log.info("[AuthService] 아이디가 중복됩니다.");
			throw new DuplicatedMemberIdException("아이디가 중복됩니다.");
		}
		
		/* 1. TBL_MEMBER 테이블에 회원 insert */
		/* 비밀번호 암호화 후 insert */
		registMember.setMemberPw(passwordEncoder.encode(registMember.getMemberPw()));
		/* 회원가입 시 입사일자 날짜 insert */
		java.util.Date now = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd");
		String joinDate = sdf.format(now);
		registMember.setMemberJoin(joinDate);
		
		Member result1 = memberRepository.save(registMember);		// 반환형이 int값이 아님
		
		/* 2. TBL_MEMBER_ROLE 테이블에 회원별 권한 insert(현재 엔티티에는 회원가입 후 pk값이 없음) */
		/* 2-1. 일반 권한의 회원을 추가(AuthorityCode값이 2번) */
		/* 
		 * 2-2. 엔티티에는 추가 할 회원의 pk값이 아직 없으므로 기존 회원의 마지막 회원 번호를 조회
		 *      (하지만 jpql에 의해 앞선 save와 jpql이 flush()로 쿼리와 함께 날아가고 회원이 이미 sequence객체 값
		 *       증가와 함께 insert가 되 버린다. -> 결론은, maxMemberCode가 현재 가입하는 회원의 번호이다.) 
		 * */
		int maxMemberCode = memberRepository.maxMemberCode();	// jpql을 활용해서 회원번호 max값 추출
		
		/* Enum에서 직급 매칭 */
		registMember.setMemberGrade(MemberGrade.valueOf(memberDTO.getMemberGrade()).getGrade());

		/* Enum - Role 매칭 */
		MemberRole registMemberRole = new MemberRole(maxMemberCode, MemberGrade.valueOf(memberDTO.getMemberGrade()).getRole());
		
//		// DTO에서 받아온 멤버코드를 직접 memberRole에 넘겨줌
//		MemberRole registMemberRole = new MemberRole(maxMemberCode, Integer.valueOf(memberDTO.getMemberGradeCode()));
		
		// 권한코드를 넣어줄수는 있지만 1<admin 권한이면 2, 3 권한을 같이 넣어줘야 하기 때문에 for문을 돌릴 예정
		MemberRole result2 = memberRoleRepository.save(registMemberRole);
		
		log.info("[AuthService] Member Insert Result {}", (result1 != null && result2 != null) ? "회원 가입 성공" : "회원 가입 실패");

		log.info("[AuthService] Signup End ==================================");
		
		return memberDTO;
	}

}
