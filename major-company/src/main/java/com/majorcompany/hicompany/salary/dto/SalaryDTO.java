package com.majorcompany.hicompany.salary.dto;

public class SalaryDTO {
	
	private Long salaryCode;
	private String salaryOvertime;
	private Long salaryBasic;
	private String salaryMonth;
	private String salaryYear;
	private Long salaryBonus;
	private String salaryStatus;
	private Long memberCode;
	private String salaryRejectReason;
	
	public SalaryDTO() {
	}

	public SalaryDTO(Long salaryCode, String salaryOvertime, Long salaryBasic, String salaryMonth, String salaryYear,
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
		return "SalaryDTO [salaryCode=" + salaryCode + ", salaryOvertime=" + salaryOvertime + ", salaryBasic="
				+ salaryBasic + ", salaryMonth=" + salaryMonth + ", salaryYear=" + salaryYear + ", salaryBonus="
				+ salaryBonus + ", salaryStatus=" + salaryStatus + ", memberCode=" + memberCode
				+ ", salaryRejectReason=" + salaryRejectReason + "]";
	}

}
