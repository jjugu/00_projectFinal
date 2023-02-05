package com.majorcompany.hicompany.attendance.dto;

import java.time.LocalDateTime;

public class AttendanceDTO {

	private Long id;						// 근태 번호 (@)
	private String title;					// 시작 일자 (+)
	private LocalDateTime start;			// 출근 시각 (@)
	private LocalDateTime end;				// 퇴근 시각 (@)
	private String attendanceHour;			// 근무 시간
	private Long attendanceOvertime;		// 초과 근무 시간
	private Long memberCode;				// 사번
	private String attendanceDate;			// 출근 일자
	
	public AttendanceDTO() {}
	
	public AttendanceDTO(Long id, String title, LocalDateTime start, LocalDateTime end, String attendanceHour,
			Long attendanceOvertime, Long memberCode, String attendanceDate) {
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

	public String getAttendanceHour() {
		return attendanceHour;
	}

	public void setAttendanceHour(String attendanceHour) {
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "AttendanceDTO [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end
				+ ", attendanceHour=" + attendanceHour + ", attendanceOvertime=" + attendanceOvertime + ", memberCode="
				+ memberCode + ", attendanceDate=" + attendanceDate + "]";
	}
}