package com.majorcompany.hicompany.salary.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_MEMBER")
public class MemberAndSalary {

	@Id
	@Column(name = "MEMBER_CODE")
	@GeneratedValue(
	      strategy = GenerationType.SEQUENCE,
	      generator = "MEMBER_SEQ_GENERATOR"
	)
	private Long memberCode;
	   
	@Column(name = "MEMBER_NAME")
	private String memberName;
	 
	@Column(name = "MEMBER_BIRTH")
	private String memberBirth;
	   
	@Column(name = "MEMBER_TEL")
	private String memberTel;
	   
	@Column(name = "MEMBER_ADDRESS")
	private String memberAddress;
	   
	@Column(name = "MEMBER_JOIN")
	private String memberJoin;
	   
	@Column(name = "MEMBER_LEAVE")
	private String memberLeave;
	   
	@Column(name = "MEMBER_ENT")
	private char memberEnt;
	   
	@Column(name = "MEMBER_REMANET")
	private Long memberRemanet;
	   
	@Column(name = "MEMBER_GRADE")
	private String memberGrade;
	   
	@Column(name = "MEMBER_DEP")
	private String memberDep;
	   
	@Column(name = "MEMBER_RT_PAYMENT")
	private Long memberRtPayment;
	   
	@Column(name = "MEMBER_RT_STATUS")
	private String memberRtStatus;
	   
	@Column(name = "MEMBER_FILE")
	private String memberFile;
	   
	@Column(name = "MEMBER_ID")
	private String memberId;
	   
	@Column(name = "MEMBER_PW")
	private String memberPw;
	   
	@Column(name = "MEMBER_EMAIL")
	private String memberEmail;
	   
	@Column(name = "MEMBER_BASIC_SALARY")
	private Long memberSalaryBonus;

	@OneToMany
	@JoinColumn(name = "MEMBER_CODE")
	private List<Salary> memberSalary;

	public MemberAndSalary() {
		super();
	}

	public MemberAndSalary(Long memberCode, String memberName, String memberBirth, String memberTel,
			String memberAddress, String memberJoin, String memberLeave, char memberEnt, Long memberRemanet,
			String memberGrade, String memberDep, Long memberRtPayment, String memberRtStatus, String memberFile,
			String memberId, String memberPw, String memberEmail, Long memberSalaryBonus,
			List<Salary> memberSalary) {
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
		this.memberSalary = memberSalary;
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

	public List<Salary> getMemberSalary() {
		return memberSalary;
	}

	public void setMemberSalary(List<Salary> memberSalary) {
		this.memberSalary = memberSalary;
	}

	@Override
	public String toString() {
		return "MemberAndSalary [memberCode=" + memberCode + ", memberName=" + memberName + ", memberBirth="
				+ memberBirth + ", memberTel=" + memberTel + ", memberAddress=" + memberAddress + ", memberJoin="
				+ memberJoin + ", memberLeave=" + memberLeave + ", memberEnt=" + memberEnt + ", memberRemanet="
				+ memberRemanet + ", memberGrade=" + memberGrade + ", memberDep=" + memberDep + ", memberRtPayment="
				+ memberRtPayment + ", memberRtStatus=" + memberRtStatus + ", memberFile=" + memberFile + ", memberId="
				+ memberId + ", memberPw=" + memberPw + ", memberEmail=" + memberEmail
				+ ", memberSalaryBonus=" + memberSalaryBonus + ", memberSalary=" + memberSalary + "]";
	}
	
	

}
