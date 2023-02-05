package com.majorcompany.hicompany.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.majorcompany.hicompany.attendance.entity.AttendanceAndMember;

@Repository
public interface AttendanceAndMemberRepository extends JpaRepository<AttendanceAndMember, Long>{

	List<AttendanceAndMember> findByAttendanceDate(String attendanceDate);

}