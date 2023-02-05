package com.majorcompany.hicompany.notice.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class NoticeDTO {

	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private Long memberCode;
	
    public NoticeDTO() {}

	public NoticeDTO(int noticeNo, String noticeTitle, String noticeContent, String createdDate, String modifiedDate,
			Long memberCode) {
		this.noticeNo = noticeNo;
		this.noticeTitle = noticeTitle;
		this.noticeContent = noticeContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.memberCode = memberCode;
	}

	public int getNoticeNo() {
		return noticeNo;
	}

	public void setNoticeNo(int noticeNo) {
		this.noticeNo = noticeNo;
	}

	public String getNoticeTitle() {
		return noticeTitle;
	}

	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}

	public String getNoticeContent() {
		return noticeContent;
	}

	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Long memberCode) {
		this.memberCode = memberCode;
	}

	@Override
	public String toString() {
		return "NoticeDTO [noticeNo=" + noticeNo + ", noticeTitle=" + noticeTitle + ", noticeContent=" + noticeContent
				+ ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", memberCode=" + memberCode
				+ "]";
	}
 }
