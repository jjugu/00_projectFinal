package com.majorcompany.hicompany.member.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.entity.MemberRole;
import com.majorcompany.hicompany.member.repository.MemberRepository;

@Service	// 어노테이션 빼먹지 말것!
public class CustomUserDetailsService implements UserDetailsService {
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;			// ModelMapper 설정 파일에 빈 등록할 것
	
	@Autowired
	public CustomUserDetailsService(MemberRepository memberRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}
	
	/*
	 * org.hibernate.LazyInitializationException 에러가 발생한다면...
	 * 조회라도 @Transactional을 달자!!
	 * 해당 에러는 영속성 컨텍스트가 도중에 종료되어 발생하는 오류이다.
	 * @Transactional을 달면 해당 메소드가 끝날 때까지 하나의 영속성 컨텍스트가 유지되어 뒤늦게 연관관계에 있는
	 * 엔티티를 활용함에 있어서 문제되지 않는다. 
	 */
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
		Member member = memberRepository.findByMemberId(memberId);

		/* MemberDTO는 엔티티를 옮겨 담은 DTO이자 UserDetails이다. */
		MemberDTO memberDTO = modelMapper.map(member, MemberDTO.class);
		
		/* 엔티티로는 MemberDTO에 추가한 Collection<GrantedAuthority> authorities 속성이 옮겨담아지지 않는다. */
		List<GrantedAuthority> authorities = new ArrayList<>();
		for(MemberRole memberRole : member.getMemberRole()) {
			String authrityName = memberRole.getAuthority().getAuthorityName();
			authorities.add(new SimpleGrantedAuthority(authrityName));
		}
		
		memberDTO.setAuthorities(authorities);
		
		return memberDTO;
	}

}
