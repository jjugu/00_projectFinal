package com.majorcompany.hicompany.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.board.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{

}
