package com.majorcompany.hicompany.leaveapp.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.majorcompany.hicompany.common.Criteria;
import com.majorcompany.hicompany.common.PageDTO;
import com.majorcompany.hicompany.common.PagingResponseDTO;
import com.majorcompany.hicompany.common.ResponseDTO;
import com.majorcompany.hicompany.leaveapp.dto.LeaveAppDTO;
import com.majorcompany.hicompany.leaveapp.service.LeaveAppService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class LeaveAppController {
	
	private static final Logger log = LoggerFactory.getLogger(LeaveAppController.class);
	private final LeaveAppService leaveAppService;
	
	@Autowired
	public LeaveAppController(LeaveAppService leaveAppService) {
		this.leaveAppService = leaveAppService;
	}
	
	@Operation(summary = "(기안자)기안서 조회 요청", description = "(기안자)기안서 조회 및 페이징 처리가 진행됩니다.", tags = { "LeaveAppController" })
	@GetMapping("/leaveApp-memberCode")
	public ResponseEntity<ResponseDTO> selectLeaveAppMemberCodeListWithPaging(
			@RequestParam(name = "offset", defaultValue = "1")  String offset,
			@RequestParam(name = "code") String memberCode
			) {

		/* common 패키지에 Criteria, PageDTO, PagingResponseDTO 추가 */
		log.info("[LeaveAppController] selectLeaveAppListWithPaging : " + offset);

		int total = leaveAppService.selectLeaveAppMemberCodeTotal(memberCode);
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		/* 1. offset의 번호에 맞는 페이지에 뿌릴 LeaveApp들 */
		pagingResponseDTO.setData(leaveAppService.selectLeaveAppMemberCodeWithPaging(cri, memberCode));
		
		/* 2. PageDTO(Criteria(보고싶은 페이지, 한페이지에 뿌릴 개수), 전체 상품 수) : 화면에서 페이징 처리에 필요한 개념들을 더 계산해서 추출함 */
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
	}
	
	@Operation(summary = "(결재자1)기안서 조회 요청", description = "(결재자1)기안서 조회 및 페이징 처리가 진행됩니다.", tags = { "LeaveAppController" })
	@GetMapping("/leaveApp-memberCode1")
	public ResponseEntity<ResponseDTO> selectLeaveAppMemberCode1ListWithPaging(
			@RequestParam(name = "offset", defaultValue = "1")  String offset,
			@RequestParam(name = "code") String memberCode
			) {

		/* common 패키지에 Criteria, PageDTO, PagingResponseDTO 추가 */
		log.info("[LeaveAppController] selectLeaveAppListWithPaging : " + offset);

		int total = leaveAppService.selectLeaveAppMemberCode1Total(memberCode);
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		/* 1. offset의 번호에 맞는 페이지에 뿌릴 LeaveApp들 */
		pagingResponseDTO.setData(leaveAppService.selectLeaveAppMemberCode1WithPaging(cri, memberCode));
		
		/* 2. PageDTO(Criteria(보고싶은 페이지, 한페이지에 뿌릴 개수), 전체 상품 수) : 화면에서 페이징 처리에 필요한 개념들을 더 계산해서 추출함 */
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
	}
	
	@Operation(summary = "(결재자2)기안서 조회 요청", description = "(결재자2)기안서 조회 및 페이징 처리가 진행됩니다.", tags = { "LeaveAppController" })
	@GetMapping("/leaveApp-memberCode2")
	public ResponseEntity<ResponseDTO> selectLeaveAppMemberCode2ListWithPaging(
			@RequestParam(name = "offset", defaultValue = "1")  String offset,
			@RequestParam(name = "code") String memberCode
			) {

		/* common 패키지에 Criteria, PageDTO, PagingResponseDTO 추가 */
		log.info("[LeaveAppController] selectLeaveAppListWithPaging : " + offset);

		int total = leaveAppService.selectLeaveAppMemberCode2Total(memberCode);
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		/* 1. offset의 번호에 맞는 페이지에 뿌릴 LeaveApp들 */
		pagingResponseDTO.setData(leaveAppService.selectLeaveAppMemberCode2WithPaging(cri, memberCode));
		
		/* 2. PageDTO(Criteria(보고싶은 페이지, 한페이지에 뿌릴 개수), 전체 상품 수) : 화면에서 페이징 처리에 필요한 개념들을 더 계산해서 추출함 */
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
	}
	
	@Operation(summary = "기안서 상세 페이지 조회 요청", description = "해당 기안서의 상세 페이지 조회가 진행됩니다.", tags = { "LeaveAppController" })
	@GetMapping("/leaveApp-management/{leaveappNo}")
	public ResponseEntity<ResponseDTO> selectReviewDetail(@PathVariable String leaveappNo) {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공",  leaveAppService.selectLeaveAppDetail(Integer.valueOf(leaveappNo))));
	}
	
	@Operation(summary = "전자결재 등록 요청", description = "전자결재 등록이 진행됩니다.", tags = {"LeaveAppController"})
	@PostMapping("/leaveApp")
	public ResponseEntity<ResponseDTO> insertLeaveApp(@RequestBody LeaveAppDTO leaveAppDTO) {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "기안 요청 완료",  leaveAppService.insertLeaveApp(leaveAppDTO)));
	}
	
	@Operation(summary = "기안서 승인 요청", description = "기안자의 기안서 승인이 진행됩니다.", tags = { "LeaveAppController" })
    @PutMapping("/leaveApp")
    public ResponseEntity<ResponseDTO> updateLeaveApp(@RequestBody LeaveAppDTO leaveAppDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "기안 승인 성공",  leaveAppService.updateLeaveApp(leaveAppDTO)));
    }

}
