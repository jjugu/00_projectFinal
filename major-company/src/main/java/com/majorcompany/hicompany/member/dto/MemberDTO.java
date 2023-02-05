package com.majorcompany.hicompany.member.dto;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MemberDTO implements UserDetails {
	
	private Long memberCode;
	private String memberName;
	private String memberBirth;
	private String memberTel;
	private String memberAddress;
	private String memberJoin;
	private String memberLeave;
	private char memberEnt;
	private Long memberRemanet;
	private String memberGrade;
	private String memberDep;
	private Long memberRtPayment;
	private char memberRtStatus;
	private String memberFile;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberSalaryBonus;
	private List<MemberRoleDTO> memberRole;
	
	public MemberDTO() {
	}
	
	public MemberDTO(Long memberCode, String memberName, String memberBirth, String memberTel, String memberAddress,
			String memberJoin, String memberLeave, char memberEnt, Long memberRemanet, String memberGrade,
			String memberDep, Long memberRtPayment, char memberRtStatus, String memberFile, String memberId,
			String memberPw, String memberEmail, String memberSalaryBonus, List<MemberRoleDTO> memberRole,
			Collection<GrantedAuthority> authorities) {
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
		this.memberRole = memberRole;
		this.authorities = authorities;
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


	public char getMemberRtStatus() {
		return memberRtStatus;
	}


	public void setMemberRtStatus(char memberRtStatus) {
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


	public String getMemberSalaryBonus() {
		return memberSalaryBonus;
	}


	public void setMemberSalaryBonus(String memberSalaryBonus) {
		this.memberSalaryBonus = memberSalaryBonus;
	}

	public List<MemberRoleDTO> getMemberRole() {
		return memberRole;
	}


	public void setMemberRole(List<MemberRoleDTO> memberRole) {
		this.memberRole = memberRole;
	}

	@Override
	public String toString() {
		return "MemberDTO [memberCode=" + memberCode + ", memberName=" + memberName + ", memberBirth=" + memberBirth
				+ ", memberTel=" + memberTel + ", memberAddress=" + memberAddress + ", memberJoin=" + memberJoin
				+ ", memberLeave=" + memberLeave + ", memberEnt=" + memberEnt + ", memberRemanet=" + memberRemanet
				+ ", memberGrade=" + memberGrade + ", memberDep=" + memberDep + ", memberRtPayment=" + memberRtPayment
				+ ", memberRtStatus=" + memberRtStatus + ", memberFile=" + memberFile + ", memberId=" + memberId
				+ ", memberPw=" + memberPw + ", memberEmail=" + memberEmail + ", memberSalaryBonus=" + memberSalaryBonus
				+ ", memberRole=" + memberRole + ", authorities=" + authorities + "]";
	}


	/* 이하 코드들을 UserDetails로부터 물려받는 추상메소드들을 오버라이딩 한 것이다.(필요한 것만 작성하자) */
	/* MemberDTO는 Member와 매핑 될 DTO이자 UserDetails로써 속성을 추가로 가짐 */
	private Collection<GrantedAuthority> authorities;
	
	/* setter 추가할 것 */
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return this.authorities;
	}
	@Override
	public String getPassword() {

		return this.memberPw;
	}
	@Override
	public String getUsername() {

		return this.memberId;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}	
	
	
}
