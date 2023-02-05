package com.majorcompany.hicompany.salary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.salary.entity.MemberAndSalary;
import com.majorcompany.hicompany.salary.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Integer>{

	Object findBySalaryMonth(String salaryMonth);

	Object findBySalaryYear(String salaryYear);

	Object findByMemberCode(Long memberCode);

	Salary findBySalaryCode(Long salaryCode);

}
