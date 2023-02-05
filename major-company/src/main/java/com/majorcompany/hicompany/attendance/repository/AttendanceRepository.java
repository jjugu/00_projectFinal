package com.majorcompany.hicompany.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.majorcompany.hicompany.attendance.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long>{

	List<Attendance> findByAttendanceDate(String AttendanceDate);

	List<Attendance> findByMemberCode(long memberCode);

}