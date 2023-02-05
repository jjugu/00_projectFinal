package com.majorcompany.hicompany.notice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.majorcompany.hicompany.notice.dto.NoticeAndMemberDTO;
import com.majorcompany.hicompany.notice.dto.NoticeDTO;
import com.majorcompany.hicompany.notice.service.NoticeService;

import io.swagger.v3.oas.annotations.Operation;



@RestController
@RequestMapping("/notice")
public class NoticeController {
	
	private static final Logger log = LoggerFactory.getLogger(NoticeController.class);

	private final NoticeService noticeService;
	
	@Autowired
	public NoticeController(NoticeService noticeService) {
		this.noticeService = noticeService;
	}
	
	/* 공지사항 게시글 조회 및 페이징 */
	@Operation(summary = "공지사항 게시글 조회 요청", description = "공지사항 게시글 조회가 진행됩니다.", tags = { "NoticeController" })
	@GetMapping("/list")
    public ResponseEntity<ResponseDTO> selectNoticeList(@RequestParam(name = "offset", defaultValue = "1") String offset) {
		/* common 패키지에 Criteria, PageDTO, PagingResponseDTO 추가 */
		log.info("[NoticeController] selectNoticeList : " + offset);
		
		int total = noticeService.selectNoticeTotal();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		/* 1. offset의 번호에 맞는 페이지에 뿌릴 Notice들 */
		pagingResponseDTO.setData(noticeService.selectNoticeList(cri));
		
		/* 2. PageDTO(Criteria(보고싶은 페이지, 한페이지에 뿌릴 개수), 전체 수) : 화면에서 페이징 처리에 필요한 개념을들 더 계산해서 추출함 */
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }
	
	/* 공지사항 게시글 작성 */
	@Operation(summary = "공지사항 게시글 작성 요청", description = "공지사항 게시글 작성이 진행됩니다.", tags = { "NoticeController" })
    @PostMapping(value ="/post")
    public ResponseEntity<ResponseDTO> insertNotice(@RequestBody NoticeDTO noticeDTO) {
//    	System.out.println("=========================="+noticeDTO);
    	
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 작성 성공",  noticeService.insertNotice(noticeDTO)));
    }
    
    /* 공지사항 게시글 수정 */
	@Operation(summary = "공지사항 게시글 수정 요청", description = "공지사항 게시글 수정이 진행됩니다.", tags = { "NoticeController" })
    @PutMapping(value = "/update")
    public ResponseEntity<ResponseDTO> updateNotice(@RequestBody NoticeDTO noticeDTO){
//    	System.out.println("update Service --------"+noticeDTO);
    	
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 수정 성공", noticeService.updateNotice(noticeDTO)));
    }
    
	/* 공지사항 게시글 삭제 */
	@Operation(summary = "공지사항 게시글 삭제 요청", description = "공지사항 게시글 삭제가 진행됩니다.", tags = { "NoticeController" })
    @DeleteMapping(value = "/{noticeNo}")
    public ResponseEntity<ResponseDTO> deleteNotice(@RequestBody NoticeAndMemberDTO noticeAndMemberDTO){
//    	System.out.println("delete Controller --------"+noticeAndMemberDTO);
    	
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 삭제 성공", noticeService.deleteNotice(noticeAndMemberDTO)));
    }
    
    /* 공지사항 게시글 상세페이지 조회 */
	@Operation(summary = "공지사항 게시글 상세페이지 조회 요청", description = "공지사항 게시글 상세페이지 조회가 진행됩니다.", tags = { "NoticeController" })
    @GetMapping("/{noticeNo}")
    public ResponseEntity<ResponseDTO> selectNoticeDetail(@PathVariable int noticeNo){
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 상세페이지 조회 성공", noticeService.selectNoitce(noticeNo)));
    }
    
}
