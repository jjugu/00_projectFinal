package com.majorcompany.hicompany.salary.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_SALARY")
@SequenceGenerator(
		name = "SALARY_SEQ_GENERATOR",
		sequenceName = "SEQ_SALARY_CODE",
		initialValue = 1, allocationSize = 1
)
public class Salary {
	
	@Id
	@Column(name = "SALARY_CODE")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "SALARY_SEQ_GENERATOR"
	)
	private Long salaryCode;
	
	@Column(name = "SALARY_OVERTIME")
	private String salaryOvertime;
	
	@Column(name = "SALARY_BASIC")
	private Long salaryBasic;
	
	@Column(name = "SALARY_MONTH")
	private String salaryMonth;
	
	@Column(name = "SALARY_YEAR")
	private String salaryYear;
	
	@Column(name = "SALARY_BONUS")
	private Long salaryBonus;
	
	@Column(name = "SALARY_STATUS")
	private String salaryStatus;
	
	@Column(name = "MEMBER_CODE")
	private Long memberCode;
	
	@Column(name = "SALARY_REJECT_REASON")
	private String salaryRejectReason;

	public Salary() {
	}

	public Salary(Long salaryCode, String salaryOvertime, Long salaryBasic, String salaryMonth, String salaryYear,
			Long salaryBonus, String salaryStatus, Long memberCode, String salaryRejectReason) {
		this.salaryCode = salaryCode;
		this.salaryOvertime = salaryOvertime;
		this.salaryBasic = salaryBasic;
		this.salaryMonth = salaryMonth;
		this.salaryYear = salaryYear;
		this.salaryBonus = salaryBonus;
		this.salaryStatus = salaryStatus;
		this.memberCode = memberCode;
		this.salaryRejectReason = salaryRejectReason;
	}

	public Long getSalaryCode() {
		return salaryCode;
	}

	public void setSalaryCode(Long salaryCode) {
		this.salaryCode = salaryCode;
	}

	public String getSalaryOvertime() {
		return salaryOvertime;
	}

	public void setSalaryOvertime(String salaryOvertime) {
		this.salaryOvertime = salaryOvertime;
	}

	public Long getSalaryBasic() {
		return salaryBasic;
	}

	public void setSalaryBasic(Long salaryBasic) {
		this.salaryBasic = salaryBasic;
	}

	public String getSalaryMonth() {
		return salaryMonth;
	}

	public void setSalaryMonth(String salaryMonth) {
		this.salaryMonth = salaryMonth;
	}

	public String getSalaryYear() {
		return salaryYear;
	}

	public void setSalaryYear(String salaryYear) {
		this.salaryYear = salaryYear;
	}

	public Long getSalaryBonus() {
		return salaryBonus;
	}

	public void setSalaryBonus(Long salaryBonus) {
		this.salaryBonus = salaryBonus;
	}

	public String getSalaryStatus() {
		return salaryStatus;
	}

	public void setSalaryStatus(String salaryStatus) {
		this.salaryStatus = salaryStatus;
	}

	public Long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Long memberCode) {
		this.memberCode = memberCode;
	}

	public String getSalaryRejectReason() {
		return salaryRejectReason;
	}

	public void setSalaryRejectReason(String salaryRejectReason) {
		this.salaryRejectReason = salaryRejectReason;
	}

	@Override
	public String toString() {
		return "Salary [salaryCode=" + salaryCode + ", salaryOvertime=" + salaryOvertime + ", salaryBasic="
				+ salaryBasic + ", salaryMonth=" + salaryMonth + ", salaryYear=" + salaryYear + ", salaryBonus="
				+ salaryBonus + ", salaryStatus=" + salaryStatus + ", memberCode=" + memberCode
				+ ", salaryRejectReason=" + salaryRejectReason + "]";
	}

}