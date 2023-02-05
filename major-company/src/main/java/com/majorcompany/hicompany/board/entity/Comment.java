package com.majorcompany.hicompany.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@SequenceGenerator( /// 식별자, 시퀀스전략
        name = "COMMENT_SEQ_GENERATOR",
        sequenceName = "SEQ_COMMENT_NO",
        initialValue = 1,
        allocationSize = 1
)
@Entity
@Table(name = "TBL_BOARD_COMMENT")
public class Comment {
	
	@Id
	@Column(name = "COMMENT_NO")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "COMMENT_SEQ_GENERATOR"
	)
	private int commentNo;
	
	@Column(name = "COMMENT_CONTENT")
	private String commentContent;
	
	@Column(name = "CREATED_DATE")
	private String createdDate;
	
	@Column(name = "MODIFiED_DATE")
	private String modifiedDate;
	
	@Column(name = "MEMBER_CODE")
	private long memberCode;
	
	@Column(name = "BOARD_NO")
	private int boardNo;

	public Comment() {}

	public Comment(int commentNo, String commentContent, String createdDate, String modifiedDate, long memberCode,
			int boardNo) {
		this.commentNo = commentNo;
		this.commentContent = commentContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.memberCode = memberCode;
		this.boardNo = boardNo;
	}

	public int getCommentNo() {
		return commentNo;
	}

	public void setCommentNo(int commentNo) {
		this.commentNo = commentNo;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
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

	public long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(long memberCode) {
		this.memberCode = memberCode;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	@Override
	public String toString() {
		return "Comment [commentNo=" + commentNo + ", commentContent=" + commentContent + ", createdDate=" + createdDate
				+ ", modifiedDate=" + modifiedDate + ", memberCode=" + memberCode + ", boardNo=" + boardNo + "]";
	}
}
