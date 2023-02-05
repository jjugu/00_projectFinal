package com.majorcompany.hicompany.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.majorcompany.hicompany.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	Member findByMemberId(String string);
	
	Member findByMemberEmail(String memberEmail);
	
	/* jpql과 @Query를 활용한 구문 */
	@Query("SELECT MAX(a.memberCode) FROM Member a")	// jpql에서 엔티티 이름은 대소문자까지 완벽히 일치할 것
	int maxMemberCode();
	
	/* 직원별 Attendance 정보 조회를 위한 구문 */
	Member findMemberCodeByMemberId(String memberId);
}
