package com.majorcompany.hicompany.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentDTO {

	private int commentNo;
	private String commentContent;
	private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private Long memberCode;
    private int boardNo;
	
    public CommentDTO() {}

	public CommentDTO(int commentNo, String commentContent, String createdDate, String modifiedDate, Long memberCode,
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

	public Long getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Long memberCode) {
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
		return "CommentDTO [commentNo=" + commentNo + ", commentContent=" + commentContent + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + ", memberCode=" + memberCode + ", boardNo=" + boardNo
				+ "]";
	}
}
