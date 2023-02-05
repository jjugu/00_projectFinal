package com.majorcompany.hicompany.leaveapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_LEAVEAPP")
@SequenceGenerator(
		name = "LEAVEAPP_SEQ_GENERATOR",
		sequenceName = "SEQ_LEAVEAPP_NO",
		initialValue = 1, allocationSize = 1
		)
public class LeaveApp {
	
	@Id
	@Column(name = "LEAVEAPP_NO")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "LEAVEAPP_SEQ_GENERATOR"
		)
	private int leaveappNo;
	
	@Column(name = "LEAVEAPP_DATE")
    private String leaveappDate;
	
	@Column(name = "LEAVEAPP_TITLE")
    private String leaveappTitle;
	
	@Column(name ="LEAVEAPP_CONTENT")
	private String leaveappContent;
	
	@Column(name ="LEAVEAPP_START")
	private String leaveappStart;
	
	@Column(name ="LEAVEAPP_END")
	private String leaveappEnd;
	
	@Column(name ="LEAVEAPP_STATUS")
	private char leaveappStatus;
	
	@Column(name = "REPORTLINE_DATE")
	private String reportlineDate;
	
	@Column(name = "LEAVEDOCUMENT_CAT")
	private String leavedocumentCat;
	
	@Column(name= "MEMBER_CODE")
	private Long memberCode;
	
	@Column(name= "MEMBER_CODE1")
	private Long memberCode1;

	@Column(name= "MEMBER_CODE2")
	private Long memberCode2;

	public LeaveApp() {
	}

	public LeaveApp(int leaveappNo, String leaveappDate, String leaveappTitle, String leaveappContent,
			String leaveappStart, String leaveappEnd, char leaveappStatus, String reportlineDate,
			String leavedocumentCat, Long memberCode, Long memberCode1, Long memberCode2) {
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

	@Override
	public String toString() {
		return "LeaveApp [leaveappNo=" + leaveappNo + ", leaveappDate=" + leaveappDate + ", leaveappTitle="
				+ leaveappTitle + ", leaveappContent=" + leaveappContent + ", leaveappStart=" + leaveappStart
				+ ", leaveappEnd=" + leaveappEnd + ", leaveappStatus=" + leaveappStatus + ", reportlineDate="
				+ reportlineDate + ", leavedocumentCat=" + leavedocumentCat + ", memberCode=" + memberCode
				+ ", memberCode1=" + memberCode1 + ", memberCode2=" + memberCode2 + "]";
	}
		
}
