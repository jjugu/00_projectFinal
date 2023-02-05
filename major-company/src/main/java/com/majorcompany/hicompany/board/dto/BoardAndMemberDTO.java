package com.majorcompany.hicompany.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.majorcompany.hicompany.member.entity.Member;

public class BoardAndMemberDTO {

	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd E. a hh:mm"));
    private Member member;
	
    public BoardAndMemberDTO() {}

	public BoardAndMemberDTO(int boardNo, String boardTitle, String boardContent, String createdDate,
			String modifiedDate, Member member) {
		this.boardNo = boardNo;
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.member = member;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardContent() {
		return boardContent;
	}

	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
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
		return "BoardAndMemberDTO [boardNo=" + boardNo + ", boardTitle=" + boardTitle + ", boardContent=" + boardContent
				+ ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", member=" + member + "]";
	}
}
