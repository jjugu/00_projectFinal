package com.majorcompany.hicompany.management.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.majorcompany.hicompany.attendance.controller.AttendanceController;
import com.majorcompany.hicompany.common.Criteria;
import com.majorcompany.hicompany.common.PageDTO;
import com.majorcompany.hicompany.common.PagingResponseDTO;
import com.majorcompany.hicompany.common.ResponseDTO;
import com.majorcompany.hicompany.management.service.ManagementService;
import com.majorcompany.hicompany.member.dto.MemberDTO;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class ManagementController {
	
	private static final Logger log = LoggerFactory.getLogger(AttendanceController.class);
	private final ManagementService managementService;
	
	@Autowired
	public ManagementController(ManagementService managementService) {
		this.managementService = managementService;
	}
	
	/* 사원 전체 select */
	@Operation(summary = "사원 전체 조회 요청", description = "사원 전체 목록이 조회됩니다.", tags = { "ManagementController" })
	@GetMapping("/management/list")
	public ResponseEntity<ResponseDTO> getEmpList() {

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 전체 목록 조회 성공",  managementService.selectEmpAllList()));
	}
	
	/* 사원 한 명 select */
	@Operation(summary = "사원 한 명 조회 요청", description = "사원 한 명의 정보가 조회됩니다.", tags = { "ManagementController" })
	@GetMapping("/management/list/{memberCode}")
	public ResponseEntity<ResponseDTO> getEmpOne(@PathVariable long memberCode) {

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 정보 조회 성공",  managementService.selectEmpOne(memberCode)));
	}
	
	/* 사원 modify */
	@Operation(summary = "사원 정보 수정", description = "해당 사원의 정보 수정이 진행됩니다.", tags = { "ManagementController" })
    @PutMapping(value = "/management/list/update")
    public ResponseEntity<ResponseDTO> updateProductReview(@ModelAttribute MemberDTO memberDTO, MultipartFile memberImage) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 정보 수정 성공",  managementService.updateEmp(memberDTO, memberImage)));
    }
	
	/* 사원 전체 select paging */
	@Operation(summary = "사원 전체 조회 요청", description = "사원 전체 목록이 조회됩니다.", tags = { "ManagementController" })
	@GetMapping("/management/list/paging")
	public ResponseEntity<ResponseDTO> getEmpList(
		@RequestParam(name = "offset", defaultValue = "1")  String offset
		) {
		
		int total = managementService.selectEmpTotal();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		pagingResponseDTO.setData(managementService.selectEmpList(cri));
		
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 전체 목록 조회 성공", pagingResponseDTO));
	}
}