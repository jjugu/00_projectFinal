package com.majorcompany.hicompany.salary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.salary.entity.MemberAndSalary;

public interface MemberAndSalaryRepository extends JpaRepository<MemberAndSalary, Integer>{

	MemberAndSalary findByMemberCode(Long memberCode);

	List<MemberAndSalary> findAllByMemberEnt(char memberEnt);
	List<MemberAndSalary> findMemberByMemberEnt(char ent);

}
