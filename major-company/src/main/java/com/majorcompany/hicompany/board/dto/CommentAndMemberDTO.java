package com.majorcompany.hicompany.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.majorcompany.hicompany.member.entity.Member;

public class CommentAndMemberDTO {

	private int commentNo;
	private String commentContent;
	private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private Member member;
    private int boardNo;
	
    public CommentAndMemberDTO() {
		super();
	}

	public CommentAndMemberDTO(int commentNo, String commentContent, String createdDate, String modifiedDate,
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
		return "CommentAndMemberDTO [commentNo=" + commentNo + ", commentContent=" + commentContent + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + ", member=" + member + ", boardNo=" + boardNo + "]";
	}
	
    
    
}
