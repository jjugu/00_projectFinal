package com.majorcompany.hicompany.leaveapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.leaveapp.entity.LeaveAppAndMember;
import com.majorcompany.hicompany.member.entity.Member;

public interface LeaveAppAndMemberRepository extends JpaRepository<LeaveAppAndMember, Integer>{

	// 기안 작성자와 로그인 한 사람이 같을 때 조회하는 리스트
	Page<LeaveAppAndMember> findByMemberCodeAndLeaveappStatusLikeOrMemberCodeAndLeaveappStatusLike(Member searchValue, char status, Member searchValue2, char status2, Pageable paging);
	// 결재자 1과 로그인 한 사람이 같을 때 조회하는 리스트
	Page<LeaveAppAndMember> findByMemberCode1AndLeaveappStatus(Member searchValue, char status, Pageable paging);
	// 결재자 2와 로그인 한 사람이 같을 때 조회하는 리스트
	Page<LeaveAppAndMember> findByMemberCode2AndLeaveappStatus(Member searchValue, char status, Pageable paging);
	
}
