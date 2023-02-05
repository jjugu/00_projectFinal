package com.majorcompany.hicompany.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.majorcompany.hicompany.member.entity.Member;

@Repository
public interface ManagementRepository extends JpaRepository <Member, Long> {

	List<Member> findAll();

	Member findByMemberCode(Long memberCode);
}	