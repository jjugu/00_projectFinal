package com.majorcompany.hicompany.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.board.entity.BoardAndMemberAndComment;

public interface BoardAndMemberAndCommentRepository extends JpaRepository<BoardAndMemberAndComment, Integer>{

	Page<BoardAndMemberAndComment> findByBoardNo(int  searchvalueOf, Pageable paging);

	long countByBoardNo(int boardNo);
}
