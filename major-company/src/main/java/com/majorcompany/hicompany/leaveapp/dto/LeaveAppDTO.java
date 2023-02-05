package com.majorcompany.hicompany.leaveapp.dto;

public class LeaveAppDTO {

	private int leaveappNo;
	private String leaveappDate;
	private String leaveappTitle;
	private String leaveappContent;
	private String leaveappStart;
	private String leaveappEnd;
	private char leaveappStatus;
	private String reportlineDate;
	private String leavedocumentCat;
	private Long memberCode;
	private Long memberCode1;
	private Long memberCode2;
	private int holiday;
	
	public LeaveAppDTO() {
		
	}
	
	public LeaveAppDTO(int leaveappNo, String leaveappDate, String leaveappTitle, String leaveappContent,
			String leaveappStart, String leaveappEnd, char leaveappStatus, String reportlineDate,
			String leavedocumentCat, Long memberCode, Long memberCode1, Long memberCode2, int holiday) {
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
		this.holiday = holiday;
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
	public Long getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(Long memberCode) {
		this.memberCode = memberCode;
	}
	public Long getMemberCode1() {
		return memberCode1;
	}
	public void setMemberCode1(Long memberCode1) {
		this.memberCode1 = memberCode1;
	}
	public Long getMemberCode2() {
		return memberCode2;
	}
	public void setMemberCode2(Long memberCode2) {
		this.memberCode2 = memberCode2;
	}
	public int getHoliday() {
		return holiday;
	}
	public void setHoliday(int holiday) {
		this.holiday = holiday;
	}
	
	@Override
	public String toString() {
		return "LeaveAppDTO [leaveappNo=" + leaveappNo + ", leaveappDate=" + leaveappDate + ", leaveappTitle="
				+ leaveappTitle + ", leaveappContent=" + leaveappContent + ", leaveappStart=" + leaveappStart
				+ ", leaveappEnd=" + leaveappEnd + ", leaveappStatus=" + leaveappStatus + ", reportlineDate="
				+ reportlineDate + ", leavedocumentCat=" + leavedocumentCat + ", memberCode=" + memberCode
				+ ", memberCode1=" + memberCode1 + ", memberCode2=" + memberCode2 + ", holiday=" + holiday + "]";
	}
	
	

}