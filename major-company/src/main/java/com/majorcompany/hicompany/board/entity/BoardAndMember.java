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
@Table(name = "TBL_BOARD")
@SequenceGenerator(
	name = "BOARD_SEQ_GENERATOR",
	sequenceName = "SEQ_BOARD_NO",
	initialValue = 1, allocationSize = 1
)
public class BoardAndMember {
	
	@Id
	@Column(name = "BOARD_NO")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "BOARD_SEQ_GENERATOR"
	)
	private int boardNo;
	
	@Column(name = "BOARD_TITLE")
	private String boardTitle;
	
	@Column(name = "BOARD_CONTENT")
	private String boardContent;
	
	@Column(name = "CREATED_DATE")
	@CreatedDate
	private String createdDate;
	
	@Column(name = "MODIFIED_DATE")
	@LastModifiedDate
	private String modifiedDate;
	
	@ManyToOne
	@JoinColumn(name = "MEMBER_CODE")
	private Member member;

	public BoardAndMember() {}

	public BoardAndMember(int boardNo, String boardTitle, String boardContent, String createdDate, String modifiedDate,
			Member member) {
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
		return "BoardAndMember [boardNo=" + boardNo + ", boardTitle=" + boardTitle + ", boardContent=" + boardContent
				+ ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", member=" + member + "]";
	}
}
