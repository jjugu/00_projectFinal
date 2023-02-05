package com.majorcompany.hicompany.leaveapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.leaveapp.entity.LeaveApp;

public interface LeaveAppRepository extends JpaRepository<LeaveApp, Integer>{

	long countByLeaveappNo(int leaveappNo);
	int countByMemberCodeAndLeaveappStatusLikeOrMemberCodeAndLeaveappStatusLike(Long memberCode, char status, Long memberCode2, char status2);
	int countByMemberCode1AndLeaveappStatus(Long memberCode, char status);
	int countByMemberCode2AndLeaveappStatus(Long memberCode, char status);
}
