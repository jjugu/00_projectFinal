package com.majorcompany.hicompany.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.board.entity.BoardAndMember;

public interface BoardAndMemberRepository extends JpaRepository<BoardAndMember, Integer>{

}
