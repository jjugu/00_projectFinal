package com.majorcompany.hicompany.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.majorcompany.hicompany.attendance.entity.MemberAndAttendance;

@Repository
public interface MemberAndAttendanceRepository extends JpaRepository<MemberAndAttendance, Long>{

	List<MemberAndAttendance> findByMemberCode(Long memberCode);

	MemberAndAttendance findMemberByMemberId(String memberId);
}