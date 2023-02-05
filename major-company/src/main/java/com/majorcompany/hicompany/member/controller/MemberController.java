package com.majorcompany.hicompany.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.majorcompany.hicompany.common.ResponseDTO;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class MemberController {
	
	private final MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members/{memberId}")
	public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId) {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberId)));
	}
	
	@Operation(summary = "모든 회원 조회 요청", description = "회원 전부가 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members")
	public ResponseEntity<ResponseDTO> getMemberList() {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "멤버 리스트 조회 성공", memberService.selectMemberList()));
	}
	
	@Operation(summary = "ID 중복확인을 위한 회원 정보 요청", description = "회원 정보가 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/validId/{memberId}")
	public ResponseEntity<ResponseDTO> validMemberId(@PathVariable String memberId) {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.validMemberId(memberId)));
	}
	
	@Operation(summary = "프로필 수정 요청", description = "회원 프로필 수정이 진행됩니다.", tags = { "MemberController" })
    @PutMapping(value = "/members")
    public ResponseEntity<ResponseDTO> updateMember(@ModelAttribute MemberDTO memberDTO, MultipartFile memberImage) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "프로필 수정 성공",  memberService.updateMember(memberDTO, memberImage)));
    }
}
