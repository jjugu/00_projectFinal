package com.majorcompany.hicompany.board.controller;

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

import com.majorcompany.hicompany.board.dto.BoardAndMemberDTO;
import com.majorcompany.hicompany.board.dto.BoardDTO;
import com.majorcompany.hicompany.board.dto.CommentDTO;
import com.majorcompany.hicompany.board.service.BoardService;
import com.majorcompany.hicompany.common.Criteria;
import com.majorcompany.hicompany.common.PageDTO;
import com.majorcompany.hicompany.common.PagingResponseDTO;
import com.majorcompany.hicompany.common.ResponseDTO;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/board")
public class BoardController {
	
	
	private static final Logger log = LoggerFactory.getLogger(BoardController.class);

	private final BoardService boardService;
	
	@Autowired
	public BoardController(BoardService boardService) {
		this.boardService = boardService;
	}
	
	/* 자유게시판 글 전체조회 */
	@Operation(summary = "자유게시판 게시글 조회 요청", description = "게시글 조회가 진행됩니다.", tags = { "BoardController" })
	@GetMapping("/free/list")
	public ResponseEntity<ResponseDTO> selectBoardList(@RequestParam(name = "offset", defaultValue = "1") String offset) {
		/* common 패키지에 Criteria, PageDTO, PagingResponseDTO 추가 */
		
		log.info("[BoardController] selectBoardList : " + offset);
		int total = boardService.selectBoardTotal();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		/* 1. offset의 번호에 맞는 패키지에 뿌릴 Board들 */
		pagingResponseDTO.setData(boardService.selectBoardList(cri));
		
		/* 2. PageDTO(Criteria(보고싶은 페이지, 한페이지에 뿌릴 개수), 전체 수) : 화면에서 페이징 처리에 필요한 개념들을 더 계산해서 추출함 */
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
	}
	
	/* 자유게시판 글 등록 */
	@Operation(summary = "자유게시판 게시글 작성 요청", description = "게시글 작성이 진행됩니다.", tags = { "BoardController" })
    @PostMapping(value ="/free/post")
    public ResponseEntity<ResponseDTO> insertBoard(@RequestBody BoardDTO boardDTO) {
    	
//    	System.out.println("=========================="+boardDTO);
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 작성 성공",  boardService.insertBoard(boardDTO)));
    }
	
    /* 자유게시판 글 상세페이지 */
	@Operation(summary = "자유게시판 게시글 상세페이지 조회 요청", description = "게시글 상세페이지 조회가 진행됩니다.", tags = { "BoardController" })
    @GetMapping("/free/{boardNo}")
    public ResponseEntity<ResponseDTO> selectBoardDetail(@PathVariable int boardNo){
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 상세페이지 조회 성공", boardService.selectBoard(boardNo)));
    }
    
    /* 자유게시판 글 수정 */
    @PutMapping(value = "/free/update")
	@Operation(summary = "자유게시판 게시글 수정 요청", description = "게시글 수정이 진행됩니다.", tags = { "BoardController" })
    public ResponseEntity<ResponseDTO> updateBoard(@RequestBody BoardDTO boardDTO){
//    	System.out.println("update Service --------"+boardDTO);
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 수정 성공", boardService.updateBoard(boardDTO)));
    }
    
	/* 자유게시판 글 삭제 */
	@Operation(summary = "자유게시판 게시글 삭제 요청", description = "게시글 삭제가 진행됩니다.", tags = { "BoardController" })
    @DeleteMapping(value = "/free/{boardNo}")
    public ResponseEntity<ResponseDTO> deleteBoard(@RequestBody BoardAndMemberDTO boardAndMemberDTO){
//    	System.out.println("delete Controller --------"+boardAndMemberDTO);
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 삭제 성공", boardService.deleteBoard(boardAndMemberDTO)));
    }
    
    /* 자유게시판 댓글 조회 및 페이징 */
	@Operation(summary = "자유게시판 댓글 조회 요청", description = "댓글 조회가 진행됩니다.", tags = { "BoardController" })
    @GetMapping("/free/{boardNo}/comment")
    public ResponseEntity<ResponseDTO> selectComment(@PathVariable String boardNo, @RequestParam(name = "offset", defaultValue="1") String offset){
//    	System.out.println("dddddddddd"+ offset);
    	
    	Criteria cri = new Criteria(Integer.valueOf(offset), 10);
    	cri.setSearchValue(boardNo); // 해당 글의 댓글만 검색하기 위한 조건
    	PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
    	int total = (int)boardService.selectCommentTotal(Integer.valueOf(cri.getSearchValue()));
    	
    	pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
    	pagingResponseDTO.setData(boardService.selectComment(cri));

    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 조회 성공", pagingResponseDTO ));
    }
    
    /* 자유게시판 댓글 등록 */
	@Operation(summary = "자유게시판 댓글 작성 요청", description = "댓글 작성이 진행됩니다.", tags = { "BoardController" })
    @PostMapping(value ="/free/comment/post")
    public ResponseEntity<ResponseDTO> insertComment(@RequestBody CommentDTO commentDTO) {
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 작성 성공", boardService.insertComment(commentDTO)));
    }
    
    /* 자유게시판 댓글 수정 */
	@Operation(summary = "자유게시판 댓글 수정 요청", description = "댓글 수정이 진행됩니다.", tags = { "BoardController" })
    @PutMapping(value ="/free/comment/update")
    public ResponseEntity<ResponseDTO> updateComment(@RequestBody CommentDTO commentDTO) {
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 수정 성공", boardService.updateComment(commentDTO)));
    }
    
    /* 자유게시판 댓글 삭제 */
	@Operation(summary = "자유게시판 댓글 삭제 요청", description = "댓글 삭제가 진행됩니다.", tags = { "BoardController" })
    @DeleteMapping(value = "/free/comment/delete")
    public ResponseEntity<ResponseDTO> deleteComment(@RequestBody CommentDTO commentDTO) {
//    	System.out.println("삭제====="+commentDTO);
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 삭제 성공", boardService.deleteComment(commentDTO)));
    }
}

