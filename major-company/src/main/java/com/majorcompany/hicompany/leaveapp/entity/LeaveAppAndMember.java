package com.majorcompany.hicompany.leaveapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.majorcompany.hicompany.member.entity.Member;

@Entity
@Table(name = "TBL_LEAVEAPP")
public class LeaveAppAndMember {
	
	@Id
	@Column(name = "LEAVEAPP_NO")
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
	
//	@ManyToOne(targetEntity=Member.class, fetch=FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name= "MEMBER_CODE")
	private Member memberCode;
	
//	@ManyToOne(targetEntity=Member.class, fetch=FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name= "MEMBER_CODE1")
	private Member memberCode1;
	
//	@ManyToOne(targetEntity=Member.class, fetch=FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name= "MEMBER_CODE2")
	private Member memberCode2;

	public LeaveAppAndMember() {
	}

	public LeaveAppAndMember(int leaveappNo, String leaveappDate, String leaveappTitle, String leaveappContent,
			String leaveappStart, String leaveappEnd, char leaveappStatus, String reportlineDate,
			String leavedocumentCat, Member memberCode, Member memberCode1, Member memberCode2) {
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

	public Member getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Member memberCode) {
		this.memberCode = memberCode;
	}

	public Member getMemberCode1() {
		return memberCode1;
	}

	public void setMemberCode1(Member memberCode1) {
		this.memberCode1 = memberCode1;
	}

	public Member getMemberCode2() {
		return memberCode2;
	}

	public void setMemberCode2(Member memberCode2) {
		this.memberCode2 = memberCode2;
	}

	@Override
	public String toString() {
		return "LeaveAppAndMember [leaveappNo=" + leaveappNo + ", leaveappDate=" + leaveappDate + ", leaveappTitle="
				+ leaveappTitle + ", leaveappContent=" + leaveappContent + ", leaveappStart=" + leaveappStart
				+ ", leaveappEnd=" + leaveappEnd + ", leaveappStatus=" + leaveappStatus + ", reportlineDate="
				+ reportlineDate + ", leavedocumentCat=" + leavedocumentCat + ", memberCode=" + memberCode
				+ ", memberCode1=" + memberCode1 + ", memberCode2=" + memberCode2 + "]";
	}

	
}
