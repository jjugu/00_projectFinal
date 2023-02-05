package com.majorcompany.hicompany.board.entity;

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
@Table(name = "TBL_BOARD_COMMENT")
@SequenceGenerator(
        name = "COMMENT_SEQ_GENERATOR",
        sequenceName = "SEQ_COMMENT_NO",
        initialValue = 1,
        allocationSize = 1
)
public class CommentAndMember {

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
	@CreatedDate
	private String createdDate;
	
	@Column(name = "MODIFIED_DATE")
	@LastModifiedDate
	private String modifiedDate;
	
	@ManyToOne
	@JoinColumn(name = "MEMBER_CODE")
	private Member member;

	@Column(name = "BOARD_NO")
	private int boardNo;

	public CommentAndMember() {
		super();
	}

	public CommentAndMember(int commentNo, String commentContent, String createdDate, String modifiedDate,
			Member member, int boardNo) {
		super();
		this.commentNo = commentNo;
		this.commentContent = commentContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.member = member;
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

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	@Override
	public String toString() {
		return "CommentAndMember [commentNo=" + commentNo + ", commentContent=" + commentContent + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + ", member=" + member + ", boardNo=" + boardNo + "]";
	}
	
	
}