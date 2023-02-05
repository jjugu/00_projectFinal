package com.majorcompany.hicompany.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.majorcompany.hicompany.common.ResponseDTO;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;

/*
 * @RestController, @ResponseBody, ResponseEntity, CORS
 * 
 * 1. @RestController(@Controller + @ResponseBody)란
 * 	  @ResponseBody를 포함한 컨트롤러로 응답 body에 담긴 데이터는 Spring boot에서 기본적으로 제공하는
 * 	  MappingJackson2HttpsMessageConverter가 내부적으로 ObjectMapper를 활용하여 UTF-8인코딩 타입
 * 	  및 application/json MIME 타입의 json문자열로 반환한다.
 * 
 * 2. ResponseEntity란
 * 	  응답으로 변환 될 정보를 모두 담은 요소들을 객체로 만들어서 반환해 준다.(body와 header와 status)
 * 	  ResponseEntity를 사용할 때, 생성자 대신 Builder 사용을 권장한다.
 * 	  (숫자로 된 상태 코드를 실수로 잘못 넣지 않도록 메소드들이 제공 된다.)
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	private final AuthService authService;
	
	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	/* @RequestBody를 통해 RequestBody로 넘어온 Json 문자열을 파싱해서 MemberDTO 속성으로 매핑해 객체로 받아낸디.(회원 아이디, 비밀번호) */
	@Operation(summary = "로그인 요청", description = "로그인이 진행됩니다.", tags = { "AuthController" })
	@PostMapping("/login")
	public ResponseEntity<ResponseDTO> login(@RequestBody MemberDTO memberDTO) {
		return ResponseEntity
				.ok()
				.body(new ResponseDTO(HttpStatus.OK, "로그인 성공", authService.login(memberDTO)));
		
	}
	
	@Operation(summary = "회원가입 요청", description = "회원가입이 진행됩니다.", tags = { "AuthController" })
	@PostMapping("/signup")
	public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO) {
		return ResponseEntity
				.ok()
				.body(new ResponseDTO(HttpStatus.CREATED, "회원가입 성공", authService.signup(memberDTO)));
		
	}
}
