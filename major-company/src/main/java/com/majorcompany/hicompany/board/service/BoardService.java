package com.majorcompany.hicompany.board.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.board.dto.BoardAndMemberAndCommentDTO;
import com.majorcompany.hicompany.board.dto.BoardAndMemberDTO;
import com.majorcompany.hicompany.board.dto.BoardDTO;
import com.majorcompany.hicompany.board.dto.CommentDTO;
import com.majorcompany.hicompany.board.entity.Board;
import com.majorcompany.hicompany.board.entity.BoardAndMember;
import com.majorcompany.hicompany.board.entity.BoardAndMemberAndComment;
import com.majorcompany.hicompany.board.entity.Comment;
import com.majorcompany.hicompany.board.repository.BoardAndMemberAndCommentRepository;
import com.majorcompany.hicompany.board.repository.BoardAndMemberRepository;
import com.majorcompany.hicompany.board.repository.BoardRepository;
import com.majorcompany.hicompany.board.repository.CommentAndMemberRepository;
import com.majorcompany.hicompany.board.repository.CommentRepository;
import com.majorcompany.hicompany.common.Criteria;

@Service
public class BoardService {
	
	
	private static final Logger log = LoggerFactory.getLogger(BoardService.class);
	private final BoardRepository boardRepository;
	private final BoardAndMemberRepository boardAndMemberRepository;
	private final ModelMapper modelMapper;
	private final CommentRepository commentRepository;
	private final BoardAndMemberAndCommentRepository boardAndMemberAndCommentRepository;
	private final CommentAndMemberRepository commentAndMemberRepository;
	
	@Autowired
	public BoardService(BoardRepository boardRepository, BoardAndMemberRepository boardAndMemberRepository, ModelMapper modelMapper, CommentRepository commentRepository, BoardAndMemberAndCommentRepository boardAndMemberAndCommentRepository, CommentAndMemberRepository commentAndMemberRepository) {
		this.boardRepository = boardRepository;
		this.boardAndMemberRepository = boardAndMemberRepository;
		this.modelMapper = modelMapper;
		this.commentRepository = commentRepository;
		this.boardAndMemberAndCommentRepository = boardAndMemberAndCommentRepository;
		this.commentAndMemberRepository = commentAndMemberRepository;
	}
	
	public int selectBoardTotal() {
		/* 페이징 처리 결과를 Page 타입으로 반환받음 */
		int result = boardAndMemberRepository.findAll().size();
		
		return result;
	}
	
	/* 자유게시판 글 전체조회 서비스 */
	@Transactional
	public Object selectBoardList(Criteria cri) {
		
		int index = cri.getPageNum() -1;
		int count = cri.getAmount();
		Pageable paging = PageRequest.of(index, count, Sort.by("boardNo").descending());

		Page<BoardAndMember> result = boardAndMemberRepository.findAll(paging);
		List<BoardAndMember> boardList = (List<BoardAndMember>)result.getContent();
		
		return boardList.stream().map(board -> modelMapper.map(board, BoardAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	/* 자유게시판 글 작성 서비스 */
	@Transactional
	public Object insertBoard(BoardDTO boardDTO) {
		log.info("[BoardService] insertBoard Start ===================================");
        log.info("[BoardService] boardDTO : " + boardDTO);
		
        
        Board insertBoard = modelMapper.map(boardDTO, Board.class);
        
        
        return boardRepository.save(insertBoard);
	}

	/* 자유게시판 글 상세페이지 서비스 */
	@Transactional
	public Object selectBoard(int boardNo) {
		log.info("[BoardService] selectBoard Start =============");
//		System.out.println("-----------------------" + boardNo);
		Board board = boardRepository.findById(boardNo).get();
		log.info("[BoardService] selectBoard End ===============");
		
		return modelMapper.map(board, Board.class);
	}
		
	/* 자유게시판 글 수정 서비스 */
	@Transactional
	public Object updateBoard(BoardDTO boardDTO) {
		log.info("[BoardService] updateBoard Start ========");
		log.info("[BoardService] boardDTO : " + boardDTO);
		
		Board updateboard = boardRepository.findById(boardDTO.getBoardNo()).get();
		
		/* setter 꺼내기 */
		updateboard.setBoardTitle(boardDTO.getBoardTitle());
		updateboard.setBoardContent(boardDTO.getBoardContent());
				
		log.info("[BoardService] updateBoard End============");
		
		return updateboard;
	}

	/* 자유게시판 글삭제 서비스 */
	@Transactional
	public Object deleteBoard(BoardAndMemberDTO boardAndMemberDTO) {
		log.info("[BoardService] deleteBoard Start ==========");
		log.info("[BoardService] boardAndMemberDTO =========: " + boardAndMemberDTO);
		
		
		BoardAndMember deleteBoard = modelMapper.map(boardAndMemberDTO, BoardAndMember.class);
		boardAndMemberRepository.delete(deleteBoard);

		log.info("[BoardService] =========deleteBoard End============");
		
		log.info("[BoardService] boardAndMemberDTO =========: " + boardAndMemberDTO);
		log.info("[BoardService] deleteBoard ============" + deleteBoard);
		return deleteBoard;
	}

	@Transactional
	public long selectCommentTotal(int boardNo) {
		/* 페이징 처리 결과를 Page 타입으로 반환받음 */
		long result = boardAndMemberAndCommentRepository.countByBoardNo(boardNo);
		return result;
	}
	
	/* 자유게시판 댓글조회 서비스 */
	public Object selectComment(Criteria cri) {
		int index = cri.getPageNum() -1;
		int count = cri.getAmount();
//		, Sort.by("commentNo").descending()
		Pageable paging = PageRequest.of(index, count);
		Page<BoardAndMemberAndComment> result = boardAndMemberAndCommentRepository.findByBoardNo(Integer.valueOf(cri.getSearchValue()), paging);
		List<BoardAndMemberAndComment> commentList = (List<BoardAndMemberAndComment>)result.getContent();
		
		return commentList.stream().map(comment -> modelMapper.map(comment, BoardAndMemberAndCommentDTO.class)).collect(Collectors.toList());
	}

	/* 자유게시판 댓글 등록 서비스 */
	@Transactional
	public Object insertComment(CommentDTO commentDTO) {
		log.info("[BoardService] inserComment Start ==================================");
//		System.out.println("commentinsert=====" + commentDTO);
		Comment insertComment = modelMapper.map(commentDTO, Comment.class);
		
		return commentRepository.save(insertComment);
	}
	
	/* 자유게시판 댓글 수정 서비스 */
	@Transactional
	public Object updateComment(CommentDTO commentDTO) {
		log.info("[BoardService] updateComment Start");
		log.info("updateComment======" + commentDTO);
		
		Comment updatecomment = commentRepository.findById(commentDTO.getCommentNo()).get();
		updatecomment.setCommentContent(commentDTO.getCommentContent());

		log.info("[BoardService] updateComment End");
		return updatecomment;
	}
	
	/* 자유게시판 댓글 삭제 서비스 */
	@Transactional
	public Object deleteComment(CommentDTO commentDTO) {
		log.info("[Boardservice] deleteComment : {} " , commentDTO);
		
		Comment deleteComment = modelMapper.map(commentDTO, Comment.class);
		log.info("[BoardService] deleteComment : {}", deleteComment);
		commentRepository.delete(deleteComment);
		
		return deleteComment;
	}
}
