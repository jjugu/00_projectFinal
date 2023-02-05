package com.majorcompany.hicompany.attendance.dto;

import java.time.LocalDateTime;

import com.majorcompany.hicompany.member.dto.MemberDTO;

public class AttendanceAndMemberDTO {

	private Long id;						// 근태 번호 (@)
	private String title;					// 시작 일자 (+)
	private LocalDateTime start;			// 출근 시각 (@)
	private LocalDateTime end;				// 퇴근 시각 (@)
	private Long attendanceHour;			// 근무 시간
	private Long attendanceOvertime;		// 초과 근무 시간
	private MemberDTO member;				// 사번
	private String attendanceDate;			// 출근 일자
	
	public AttendanceAndMemberDTO() {}
	
	public AttendanceAndMemberDTO(Long id, String title, LocalDateTime start, LocalDateTime end, Long attendanceHour,
			Long attendanceOvertime, MemberDTO member, String attendanceDate) {
		super();
		this.id = id;
		this.title = title;
		this.start = start;
		this.end = end;
		this.attendanceHour = attendanceHour;
		this.attendanceOvertime = attendanceOvertime;
		this.member = member;
		this.attendanceDate = attendanceDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
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

	public String getAttendanceDate() {
		return attendanceDate;
	}

	public void setAttendanceDate(String attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	@Override
	public String toString() {
		return "AttendanceAndMemberDTO [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end
				+ ", attendanceHour=" + attendanceHour + ", attendanceOvertime=" + attendanceOvertime + ", member="
				+ member + ", attendanceDate=" + attendanceDate + "]";
	}
}