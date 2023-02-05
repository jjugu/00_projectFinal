package com.majorcompany.hicompany.member.dto;

public enum MemberGrade {
	staff(3, "사원"), 
	assistantManager(3, "대리"), 
	manager(2, "과장"), 
	deputyGeneralManager(2, "차장"),
	generalManager(2, "부장"),
	managingDirector(1, "상무"),
	seniorManagingDirector(1, "전무");
	
	private final int role;
	private final String grade;
	
	MemberGrade(int role, String grade) {
		this.role = role;
		this.grade = grade;
	}

	public int getRole() {
		return role;
	}

	public String getGrade() {
		return grade;
	}
	
	
}
