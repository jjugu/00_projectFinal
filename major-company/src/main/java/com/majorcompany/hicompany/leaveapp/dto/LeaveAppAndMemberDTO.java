package com.majorcompany.hicompany.leaveapp.dto;

import com.majorcompany.hicompany.member.dto.MemberDTO;

public class LeaveAppAndMemberDTO {

	private int leaveappNo;
	private String leaveappDate;
	private String leaveappTitle;
	private String leaveappContent;
	private String leaveappStart;
	private String leaveappEnd;
	private char leaveappStatus;
	private String reportlineDate;
	private String leavedocumentCat;
	private MemberDTO memberCode;
	private MemberDTO memberCode1;
	private MemberDTO memberCode2;
	
	public LeaveAppAndMemberDTO() {
		super();
	}

	public LeaveAppAndMemberDTO(int leaveappNo, String leaveappDate, String leaveappTitle, String leaveappContent,
			String leaveappStart, String leaveappEnd, char leaveappStatus, String reportlineDate,
			String leavedocumentCat, MemberDTO memberCode, MemberDTO memberCode1, MemberDTO memberCode2) {
		super();
		this.leaveappNo = leaveappNo;
		this.leaveappDate = leaveappDate;
		this.leaveappTitle = leaveappTitle;
		this.leaveappContent = leaveappContent;
		this.leaveappStart = leaveappStart;
		this.leaveappEnd = leaveappEnd;
		this.leaveappStatus = leaveappStatus;
		this.reportlineDate = reportlineDate;
		this.leavedocumentCat = leavedocumentCat;
		this.memberCode = memberCode;
		this.memberCode1 = memberCode1;
		this.memberCode2 = memberCode2;
	}

	public int getLeaveappNo() {
		return leaveappNo;
	}

	public void setLeaveappNo(int leaveappNo) {
		this.leaveappNo = leaveappNo;
	}

	public String getLeaveappDate() {
		return leaveappDate;
	}

	public void setLeaveappDate(String leaveappDate) {
		this.leaveappDate = leaveappDate;
	}

	public String getLeaveappTitle() {
		return leaveappTitle;
	}

	public void setLeaveappTitle(String leaveappTitle) {
		this.leaveappTitle = leaveappTitle;
	}

	public String getLeaveappContent() {
		return leaveappContent;
	}

	public void setLeaveappContent(String leaveappContent) {
		this.leaveappContent = leaveappContent;
	}

	public String getLeaveappStart() {
		return leaveappStart;
	}

	public void setLeaveappStart(String leaveappStart) {
		this.leaveappStart = leaveappStart;
	}

	public String getLeaveappEnd() {
		return leaveappEnd;
	}

	public void setLeaveappEnd(String leaveappEnd) {
		this.leaveappEnd = leaveappEnd;
	}

	public char getLeaveappStatus() {
		return leaveappStatus;
	}

	public void setLeaveappStatus(char leaveappStatus) {
		this.leaveappStatus = leaveappStatus;
	}

	public String getReportlineDate() {
		return reportlineDate;
	}

	public void setReportlineDate(String reportlineDate) {
		this.reportlineDate = reportlineDate;
	}

	public String getLeavedocumentCat() {
		return leavedocumentCat;
	}

	public void setLeavedocumentCat(String leavedocumentCat) {
		this.leavedocumentCat = leavedocumentCat;
	}

	public MemberDTO getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(MemberDTO memberCode) {
		this.memberCode = memberCode;
	}

	public MemberDTO getMemberCode1() {
		return memberCode1;
	}

	public void setMemberCode1(MemberDTO memberCode1) {
		this.memberCode1 = memberCode1;
	}

	public MemberDTO getMemberCode2() {
		return memberCode2;
	}

	public void setMemberCode2(MemberDTO memberCode2) {
		this.memberCode2 = memberCode2;
	}

	@Override
	public String toString() {
		return "LeaveAppandMemberDTO [leaveappNo=" + leaveappNo + ", leaveappDate=" + leaveappDate + ", leaveappTitle="
				+ leaveappTitle + ", leaveappContent=" + leaveappContent + ", leaveappStart=" + leaveappStart
				+ ", leaveappEnd=" + leaveappEnd + ", leaveappStatus=" + leaveappStatus + ", reportlineDate="
				+ reportlineDate + ", leavedocumentCat=" + leavedocumentCat + ", memberCode=" + memberCode
				+ ", memberCode1=" + memberCode1 + ", memberCode2=" + memberCode2 + "]";
	}
	
	
}