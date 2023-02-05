package com.majorcompany.hicompany.board.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class BoardAndMemberAndComment {

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
	
	// (mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE) // mppedBy : 연관관계의 주인이 아니므로 DB의 FK가 아니다 라는 뜻(Board 테이블에 댓글리스트를 추가하겠따는 건데 DB에는 하나의 raw 데이터에 하나의 값만 들어갈 수 있다, 만약 여러개가 들어가면 원자성이 깨진다, 그래서 commentList는 DB에 FK로 생성되면 안되서 사용한다
	@OneToMany
	@JoinColumn(name = "BOARD_NO")
	// 화면단에서 댓글작성자를  뽑기위해 CommentAndMember생성
	private List<CommentAndMember> commentList;

	public BoardAndMemberAndComment() {}

	public BoardAndMemberAndComment(int boardNo, String boardTitle, String boardContent, String createdDate,
			String modifiedDate, Member member, List<CommentAndMember> commentList) {
		this.boardNo = boardNo;
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.member = member;
		this.commentList = commentList;
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

	public List<CommentAndMember> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<CommentAndMember> commentList) {
		this.commentList = commentList;
	}

	@Override
	public String toString() {
		return "BoardAndMemberAndComment [boardNo=" + boardNo + ", boardTitle=" + boardTitle + ", boardContent="
				+ boardContent + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", member="
				+ member + ", commentList=" + commentList + "]";
	}
}
