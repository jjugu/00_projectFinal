import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FreecpCSS from './Freecp.module.css';

function Freecp({ prop : {boardNo, boardTitle, createdDate, modifiedDate, member}}) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickFreeHandler = (boardNo) => {
    navigate(`/board/free/${boardNo}`, { replace: false });
  }

  return (
    <div style={{backgroundColor:"rgb(196, 233, 255)"}}>
      <hr width= "800px"></hr> 
      <div onClick={ () => onClickFreeHandler(boardNo) }>
        <div className={ FreecpCSS.title }>{ boardTitle }</div>
        <div className={ FreecpCSS.name}>{member.memberName}</div>
        <div className={ FreecpCSS.item }>
        <span>작성일 :&nbsp;{ createdDate }</span>&nbsp;&nbsp;&nbsp;
        <span>최종수정일 : { modifiedDate }</span>
        </div>
      </div>
    <hr width= "800px"></hr>
    </div>
  );
}
export default Freecp;