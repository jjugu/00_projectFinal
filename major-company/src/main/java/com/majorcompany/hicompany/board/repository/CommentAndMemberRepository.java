package com.majorcompany.hicompany.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.board.entity.CommentAndMember;

public interface CommentAndMemberRepository extends JpaRepository<CommentAndMember, Integer>{

}
