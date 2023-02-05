package com.majorcompany.hicompany.notice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.majorcompany.hicompany.member.entity.Member;

@Entity
@Table(name ="TBL_NOTICE")
@SequenceGenerator(
	name = "NOTICE_SEQ_GENERATOR",
	sequenceName = "SEQ_NOTICE_NO",
	initialValue = 1, allocationSize = 1	
)
public class NoticeAndMember {


	@Id
	@Column(name = "NOTICE_NO")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "NOTICE_SEQ_GENERATOR"
	)
	private int noticeNo;
	
	@Column(name = "NOTICE_TITLE")
	private String noticeTitle;
	
	@Column(name = "NOTICE_CONTENT")
	private String noticeContent;
	
	@Column(name = "CREATED_DATE")
	@CreatedDate
	private String createdDate;
	
	@Column(name = "MODIFIED_DATE")
	@LastModifiedDate
	private String modifiedDate;

	@ManyToOne
	@JoinColumn(name = "MEMBER_CODE")
	private Member member;

	public NoticeAndMember() {}

	public NoticeAndMember(int noticeNo, String noticeTitle, String noticeContent, String createdDate,
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
		return "NoticeAndMember [noticeNo=" + noticeNo + ", noticeTitle=" + noticeTitle + ", noticeContent="
				+ noticeContent + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", member="
				+ member + "]";
	}
}
