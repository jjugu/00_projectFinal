package com.majorcompany.hicompany.attendance.controller;

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

import com.majorcompany.hicompany.attendance.dto.AttendanceDTO;
import com.majorcompany.hicompany.attendance.dto.MemberAndAttendanceDTO;
import com.majorcompany.hicompany.attendance.service.AttendanceService;
import com.majorcompany.hicompany.common.ResponseDTO;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class AttendanceController {
	
	private static final Logger log = LoggerFactory.getLogger(AttendanceController.class);
	private final AttendanceService attendanceService;
	
	@Autowired
	public AttendanceController(AttendanceService attendanceService) {
		this.attendanceService = attendanceService;
	}
	
	/* 사원별 출퇴 select */
	@Operation(summary = "사원별 근태 조회 요청", description = "해당 사원의 전체 근태 목록이 조회됩니다.", tags = { "AttendanceController" })
	@GetMapping("/attendance/{memberId}")
	public ResponseEntity<ResponseDTO> getEmpAttendance(@PathVariable String memberId) {

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원별 근태 목록 조회 성공",  attendanceService.selectEmpAttendanceList(memberId)));
	}
	
	/* 출근 create */
	@Operation(summary = "출근 처리 요청", description = "해당 사원의 출근 처리가 진행됩니다.", tags = { "AttendanceController" })
	@PostMapping("/attendance")
	public ResponseEntity<ResponseDTO> insertAttendance(@RequestBody MemberAndAttendanceDTO memberAndAttendanceDTO, AttendanceDTO attendanceDTO) {

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "출근 확인",  attendanceService.insertAttendance(memberAndAttendanceDTO, attendanceDTO)));
	}
	
	/* 퇴근 modify */
	@Operation(summary = "퇴근 처리 요청", description = "해당 사원의 퇴근 처리가 진행됩니다.", tags = { "AttendanceController" })
    @PutMapping("/attendance")
    public ResponseEntity<ResponseDTO> updateAttendance(@RequestBody MemberAndAttendanceDTO memberAndAttendanceDTO, AttendanceDTO attendanceDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴근 확인",  attendanceService.updateAttendance(memberAndAttendanceDTO, attendanceDTO)));
    }
	
	/* Management */
	// react에서 오늘을 넘겨주는 형태로, 어제도 확인 가능하게? 아니면 진짜 오늘만 보여주게?
	/* 금일 사원 근태 select */
	@Operation(summary = "금일 전체 사원 근태 조회", description = "금일 사원 전체의 근태 목록이 조회됩니다.", tags = { "ManagementController" })
	@GetMapping("/management/attendance/{attendanceDate}")
	public ResponseEntity<ResponseDTO> getDateAttendance(@PathVariable String attendanceDate) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "금일 사원 근태 목록 조회 성공", attendanceService.selectDateAttendanceList(attendanceDate)));
	}
	
	/* 사원 근태 한 건 조회 */
	@Operation(summary = "사원 근태 한 건 조회", description = "사원 근태 한 건이 조회됩니다..", tags = { "ManagementController" })
	@GetMapping("/management/attendance/list/{id}")
	public ResponseEntity<ResponseDTO> getDateAttendance(@PathVariable long id) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 근태 한 건 조회 성공", attendanceService.selectDateAttendanceOne(id)));
	}
	
	/* 사원 근태 정보 수정 */
	@Operation(summary = "사원 근태 정보 수정", description = "해당 사원의 근태 정보 수정이 진행됩니다.", tags = { "ManagementController" })
    @PutMapping("/management/attendance/update")
    public ResponseEntity<ResponseDTO> updateProductReview(@RequestBody AttendanceDTO attendanceDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사원 근태 정보 수정 성공",  attendanceService.updateEmpAttendance(attendanceDTO)));
    }
	
	/* 사원 근태정보 추가 -> title만 */
}