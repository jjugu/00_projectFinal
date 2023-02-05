package com.majorcompany.hicompany.notice.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.majorcompany.hicompany.member.entity.Member;

public class NoticeAndMemberDTO {

	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    private Member member;
    
	public NoticeAndMemberDTO() {}

	public NoticeAndMemberDTO(int noticeNo, String noticeTitle, String noticeContent, String createdDate,
			String modifiedDate, Member member) {
		this.noticeNo = noticeNo;
		this.noticeTitle = noticeTitle;
		this.noticeContent = noticeContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.member = member;
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

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	@Override
	public String toString() {
		return "NoticeAndMemberDTO [noticeNo=" + noticeNo + ", noticeTitle=" + noticeTitle + ", noticeContent="
				+ noticeContent + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", member="
				+ member + "]";
	}
}
