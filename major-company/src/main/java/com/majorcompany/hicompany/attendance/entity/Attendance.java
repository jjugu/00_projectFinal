package com.majorcompany.hicompany.attendance.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_ATTENDANCE")
@SequenceGenerator(
      name = "ATTENDANCE_SEQ_GENERATOR",
      sequenceName = "SEQ_ID",
      initialValue = 1, allocationSize = 1
)
public class Attendance {
	
	@Id
	@Column(name = "ID")
	@GeneratedValue(
	        strategy = GenerationType.SEQUENCE,
	        generator = "ATTENDANCE_SEQ_GENERATOR"
	)
	private Long id;						// 근태 번호
	
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "START1")
	private LocalDateTime start;			// 출근 시각
	
	@Column(name = "END1")
	private LocalDateTime end;				// 퇴근 시각
	
	@Column(name = "ATTENDANCE_HOUR")	
	private Long attendanceHour;			// 근무 시간
	
	@Column(name = "ATTENDANCE_OVERTIME")
	private Long attendanceOvertime;		// 초과 근무 시간
	
	@Column(name = "MEMBER_CODE")
	private Long memberCode;				// 사번
	
	@Column(name = "ATTENDANCE_DATE")
	private String attendanceDate;			// 출근 일자

	public Attendance() {}
	
	public Attendance(Long id, String title, LocalDateTime start, LocalDateTime end, Long attendanceHour, Long attendanceOvertime,
			Long memberCode, String attendanceDate) {
		super();
		this.id = id;
		this.title = title;
		this.start = start;
		this.end = end;
		this.attendanceHour = attendanceHour;
		this.attendanceOvertime = attendanceOvertime;
		this.memberCode = memberCode;
		this.attendanceDate = attendanceDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
	}

	public LocalDateTime getEnd() {
		return end;
	}

	public void setEnd(LocalDateTime end) {
		this.end = end;
	}

	public Long getAttendanceHour() {
		return attendanceHour;
	}

	public void setAttendanceHour(Long attendanceHour) {
		this.attendanceHour = attendanceHour;
	}

	public Long getAttendanceOvertime() {
		return attendanceOvertime;
	}

	public void setAttendanceOvertime(Long attendanceOvertime) {
		this.attendanceOvertime = attendanceOvertime;
	}

	public Long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Long memberCode) {
		this.memberCode = memberCode;
	}

	public String getAttendanceDate() {
		return attendanceDate;
	}

	public void setAttendanceDate(String attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	@Override
	public String toString() {
		return "Attendance [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end + ", attendanceHour="
				+ attendanceHour + ", attendanceOvertime=" + attendanceOvertime + ", memberCode=" + memberCode
				+ ", attendanceDate=" + attendanceDate + "]";
	}
}