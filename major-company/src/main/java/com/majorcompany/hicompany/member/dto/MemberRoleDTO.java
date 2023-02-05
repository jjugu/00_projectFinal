package com.majorcompany.hicompany.member.dto;

public class MemberRoleDTO {
	private int memberNo;
	private int authorityCode;		// 엔티티를 작성하고 복합키 설정에 용이하기 위함이자 MemberRole insert나 update에서 필수!
	
	private AuthorityDTO authority;

	public MemberRoleDTO() {
	}

	public MemberRoleDTO(int memberNo, int authorityCode, AuthorityDTO authority) {
		this.memberNo = memberNo;
		this.authorityCode = authorityCode;
		this.authority = authority;
	}

	public int getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}

	public int getAuthorityCode() {
		return authorityCode;
	}

	public void setAuthorityCode(int authorityCode) {
		this.authorityCode = authorityCode;
	}

	public AuthorityDTO getAuthority() {
		return authority;
	}

	public void setAuthority(AuthorityDTO authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "MemberRoleDTO [memberNo=" + memberNo + ", authorityCode=" + authorityCode + ", authority=" + authority
				+ "]";
	}
	
	
}
