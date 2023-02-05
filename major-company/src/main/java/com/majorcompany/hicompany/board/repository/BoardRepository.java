package com.majorcompany.hicompany.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Integer>{

}
