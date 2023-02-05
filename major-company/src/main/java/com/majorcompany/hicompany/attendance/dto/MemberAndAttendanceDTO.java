package com.majorcompany.hicompany.attendance.dto;

import java.util.ArrayList;
import java.util.List;

import com.majorcompany.hicompany.attendance.entity.Attendance;

public class MemberAndAttendanceDTO {

	private Long memberCode;        	// 사번
	private String memberName;      	// 이름
	private String memberBirth;      	// 생년월일
	private String memberTel;      		// 전화번호
	private String memberAddress;   	// 주소
	private String memberJoin;     		// 입사일자
	private String memberLeave;    	  	// 퇴사일자
	private char memberEnt;         	// 퇴직여부
	private Long memberRemanet;     	// 휴가잔여일수
	private String memberGrade;     	// 직급
	private String memberDep;      		// 부서
	private Long memberRtPayment;       // 퇴직금 실지급액
	private String memberRtStatus;      // 퇴직금 지급 여부
	private String memberFile;      	// 첨부파일 이름
	private String memberId;         	// 아이디
	private String memberPw;         	// 비밀번호
	private String memberEmail;      	// 이메일
	private Long memberSalaryBonus;   	// 보너스
	private List<Attendance> attendance = new ArrayList<>();
	
	public MemberAndAttendanceDTO() {
	}

	public MemberAndAttendanceDTO(Long memberCode, String memberName, String memberBirth, String memberTel,
			String memberAddress, String memberJoin, String memberLeave, char memberEnt, Long memberRemanet,
			String memberGrade, String memberDep, Long memberRtPayment, String memberRtStatus, String memberFile,
			String memberId, String memberPw, String memberEmail, Long memberSalaryBonus, List<Attendance> attendance) {
		super();
		this.memberCode = memberCode;
		this.memberName = memberName;
		this.memberBirth = memberBirth;
		this.memberTel = memberTel;
		this.memberAddress = memberAddress;
		this.memberJoin = memberJoin;
		this.memberLeave = memberLeave;
		this.memberEnt = memberEnt;
		this.memberRemanet = memberRemanet;
		this.memberGrade = memberGrade;
		this.memberDep = memberDep;
		this.memberRtPayment = memberRtPayment;
		this.memberRtStatus = memberRtStatus;
		this.memberFile = memberFile;
		this.memberId = memberId;
		this.memberPw = memberPw;
		this.memberEmail = memberEmail;
		this.memberSalaryBonus = memberSalaryBonus;
		this.attendance = attendance;
	}

	public Long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Long memberCode) {
		this.memberCode = memberCode;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberBirth() {
		return memberBirth;
	}

	public void setMemberBirth(String memberBirth) {
		this.memberBirth = memberBirth;
	}

	public String getMemberTel() {
		return memberTel;
	}

	public void setMemberTel(String memberTel) {
		this.memberTel = memberTel;
	}

	public String getMemberAddress() {
		return memberAddress;
	}

	public void setMemberAddress(String memberAddress) {
		this.memberAddress = memberAddress;
	}

	public String getMemberJoin() {
		return memberJoin;
	}

	public void setMemberJoin(String memberJoin) {
		this.memberJoin = memberJoin;
	}

	public String getMemberLeave() {
		return memberLeave;
	}

	public void setMemberLeave(String memberLeave) {
		this.memberLeave = memberLeave;
	}

	public char getMemberEnt() {
		return memberEnt;
	}

	public void setMemberEnt(char memberEnt) {
		this.memberEnt = memberEnt;
	}

	public Long getMemberRemanet() {
		return memberRemanet;
	}

	public void setMemberRemanet(Long memberRemanet) {
		this.memberRemanet = memberRemanet;
	}

	public String getMemberGrade() {
		return memberGrade;
	}

	public void setMemberGrade(String memberGrade) {
		this.memberGrade = memberGrade;
	}

	public String getMemberDep() {
		return memberDep;
	}

	public void setMemberDep(String memberDep) {
		this.memberDep = memberDep;
	}

	public Long getMemberRtPayment() {
		return memberRtPayment;
	}

	public void setMemberRtPayment(Long memberRtPayment) {
		this.memberRtPayment = memberRtPayment;
	}

	public String getMemberRtStatus() {
		return memberRtStatus;
	}

	public void setMemberRtStatus(String memberRtStatus) {
		this.memberRtStatus = memberRtStatus;
	}

	public String getMemberFile() {
		return memberFile;
	}

	public void setMemberFile(String memberFile) {
		this.memberFile = memberFile;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberPw() {
		return memberPw;
	}

	public void setMemberPw(String memberPw) {
		this.memberPw = memberPw;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}

	public Long getMemberSalaryBonus() {
		return memberSalaryBonus;
	}

	public void setMemberSalaryBonus(Long memberSalaryBonus) {
		this.memberSalaryBonus = memberSalaryBonus;
	}

	public List<Attendance> getAttendance() {
		return attendance;
	}

	public void setAttendance(List<Attendance> attendance) {
		this.attendance = attendance;
	}

	@Override
	public String toString() {
		return "MemberAndSalaryDTO [memberCode=" + memberCode + ", memberName=" + memberName + ", memberBirth="
				+ memberBirth + ", memberTel=" + memberTel + ", memberAddress=" + memberAddress + ", memberJoin="
				+ memberJoin + ", memberLeave=" + memberLeave + ", memberEnt=" + memberEnt + ", memberRemanet="
				+ memberRemanet + ", memberGrade=" + memberGrade + ", memberDep=" + memberDep + ", memberRtPayment="
				+ memberRtPayment + ", memberRtStatus=" + memberRtStatus + ", memberFile=" + memberFile + ", memberId="
				+ memberId + ", memberPw=" + memberPw + ", memberEmail=" + memberEmail + ", memberSalaryBonus="
				+ memberSalaryBonus + ", attendance=" + attendance + "]";
	}
}