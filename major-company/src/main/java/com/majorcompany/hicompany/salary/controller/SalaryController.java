package com.majorcompany.hicompany.salary.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.majorcompany.hicompany.common.ResponseDTO;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.salary.dto.MemberAndSalaryDTO;
import com.majorcompany.hicompany.salary.dto.SalaryDTO;
import com.majorcompany.hicompany.salary.service.SalaryService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/salary")
public class SalaryController {

	
	private static final Logger log = LoggerFactory.getLogger(SalaryController.class);

	private final SalaryService salaryService;
	
	@Autowired
	public SalaryController(SalaryService salaryService) {
		this.salaryService = salaryService;
	}
	
	@Operation(summary = "사원 급여 내역 조회 요청", description = "사원의 급여에 대한 급여 내역이 조회됩니다.", tags = {"SalaryController"})
	@GetMapping("/list")
	public ResponseEntity<ResponseDTO> getSalaryList() {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 내역 조회 성공", salaryService.selectSalaryList()));
	}

	@Operation(summary = "사원 및 해당 사원 급여 리스트 조회 요청", description = "사원들에 대한 급여 내역이 조회됩니다.", tags = {"SalaryController"})
	@GetMapping("/memberList")
	public ResponseEntity<ResponseDTO> getAllMemberSalaryList() {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 내역 조회 성공", salaryService.getAllMemberSalaryList()));
	}
	
	@Operation(summary = "1. 해당 사원의 급여 리스트 조회 요청", description = "해당 사원의 급여 리스트 조회가 진행됩니다.", tags = {"SalaryController"})
	@GetMapping("/list/{memberId}")
	public ResponseEntity<ResponseDTO> selectMemberSalaryList(@PathVariable String memberId) {
		log.info("[SalaryController] selectMemberSalaryList Start ========================");
		log.info("[SalaryController] selectMemberSalaryList End ==========================");
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", salaryService.selectMemberSalary(memberId)));
	}
	
	@Operation(summary = "2. 해당 사원의 급여 리스트 조회 요청", description = "해당 사원의 급여 리스트 조회가 진행됩니다.", tags = {"SalaryController"})
	@GetMapping("/memberList/{memberId}")
	public ResponseEntity<ResponseDTO> selectMemberSalary(@PathVariable String memberId) {
		log.info("[SalaryController] selectMemberSalary Start ========================");
		log.info("[SalaryController] selectMemberSalary End ==========================");
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", salaryService.selectMemberSalaryList(memberId)));
	}
	
	/* 사원 급여 지급 요청 */
	@Operation(summary = "급여 지급 요청", description = "해당 사원의 급여 지급 요청이 진행됩니다.", tags = { "SalaryController" })
	@PostMapping("/give")
    public ResponseEntity<ResponseDTO> insertGiveSalary(@RequestBody SalaryDTO salaryDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 지급 요청",  salaryService.insertGiveSalary(salaryDTO)));
    }
	
	/* 사원 급여 지급 결재 - 승인  */
	@Operation(summary = "급여 지급 승인", description = "해당 사원의 급여 지급이 진행됩니다.", tags = { "SalaryController" })
    @PutMapping("/okay")
    public ResponseEntity<ResponseDTO> okayGiveSalary(@RequestBody SalaryDTO salaryDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 지급 확인 - 승인",  salaryService.okayGiveSalary(salaryDTO)));
    }
	
	/* 사원 급여 지급 결재 - 거절  */
	@Operation(summary = "급여 지급 반려", description = "해당 사원의 급여 지급이 반려됩니다.", tags = { "SalaryController" })
    @PutMapping("/reject")
    public ResponseEntity<ResponseDTO> rejectGiveSalary(@RequestBody SalaryDTO salaryDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 지급 확인 - 반려",  salaryService.rejectGiveSalary(salaryDTO)));
    }
	
	/* 반려된 급여 지급 요청 수정 후 제출 */
	@Operation(summary = "반려된 급여 지급 요청 수정", description = "반려된 급여 지급 요청이 재요청됩니다.", tags = { "SalaryController" })
    @PutMapping("/rejectedOne")
    public ResponseEntity<ResponseDTO> reRequestSalary(@RequestBody SalaryDTO salaryDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 지급 재요청",  salaryService.reRequestSalary(salaryDTO)));
    }
	
	/* 퇴사자 리스트 조회 */
    @Operation(summary = "퇴직한 사원 및 해당 사원 급여 리스트 조회 요청", description = "급여 내역을 포함한 퇴직한 사원들을 조회됩니다.", tags = {"SalaryController"})
	@GetMapping("/retired")
	public ResponseEntity<ResponseDTO> getRetiredMemberList() {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴사자 리스트 조회 성공", salaryService.getAllRetiredMemberSalaryList()));
	}
    
    /* 리스트에서 불러낸 퇴사자 찾기 */
    @Operation(summary = "해당 퇴사자 조회 요청", description = "해당 퇴사자가 조회됩니다.", tags = {"SalaryController"})
	@GetMapping("/retired/{memberId}")
	public ResponseEntity<ResponseDTO> getRetiredMember(@PathVariable String memberId) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "해당 퇴사자 조회 성공", salaryService.getRetiredMember(memberId)));
	}
    
    /* 퇴직금 지급 요청 */
	@Operation(summary = "퇴직금 지급 요청", description = "해당 사원의 퇴직금 지급 요청이 진행됩니다.", tags = { "SalaryController" })
	@PutMapping("/retired/request")
    public ResponseEntity<ResponseDTO> insertGiveRetirementPay(@RequestBody MemberAndSalaryDTO memberAndSalaryDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴직금 지급 요청",  salaryService.insertGiveRetirementPay(memberAndSalaryDTO)));
    }
	
	/* 퇴직금 지급 - 승인  */
	@Operation(summary = "퇴직금 지급 승인", description = "해당 사원의 퇴직금 지급이 진행됩니다.", tags = { "SalaryController" })
    @PutMapping("/retired/payOkay")
    public ResponseEntity<ResponseDTO> okayGiveRetirePay(@RequestBody MemberDTO memberDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴직금 지급 확인 - 승인",  salaryService.okayGiveRetirePay(memberDTO)));
    }
	
	/* 퇴사 처리 기능  */
	@Operation(summary = "해당 사원의 퇴사 처리 기능", description = "해당 사원의 퇴사 처리가 진행됩니다.", tags = { "SalaryController" })
    @PutMapping("/retired/member")
    public ResponseEntity<ResponseDTO> retiredMember(@RequestBody MemberDTO memberDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴사 처리",  salaryService.retiredMember(memberDTO)));
    }
	
	/* 퇴사 -> 재직 처리 기능  */
	@Operation(summary = "해당 사원의 퇴사 취하 및 재직으로 변경", description = "해당 사원의 퇴사를 취하하고 재직으로 변경합니다.", tags = { "SalaryController" })
    @PutMapping("/retired/cancel")
    public ResponseEntity<ResponseDTO> cancelRetired(@RequestBody MemberDTO memberDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴사 취하 및 재직 처리",  salaryService.cancelRetired(memberDTO)));
    }
	
}






