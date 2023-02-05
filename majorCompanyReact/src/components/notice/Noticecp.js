import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NoticecpCSS from './Noticecp.module.css';

function Noticecp({ prop : {noticeNo, noticeTitle, createdDate, modifiedDate, member}}) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickNoticeHandler = (noticeNo) => {
    navigate(`/notice/${noticeNo}`, { replace: false });
  }

  return (
    <div style={{backgroundColor:"rgb(196, 233, 255)"}}>
      <hr width= "800px"></hr> 
      <div onClick={ () => onClickNoticeHandler(noticeNo) }>
        <div className={ NoticecpCSS.title}>{ noticeTitle }</div>
        <div className={ NoticecpCSS.name}>{member.memberName}</div>
        <div className={ NoticecpCSS.item }>
        <span>작성일 :&nbsp;{ createdDate }</span>&nbsp;&nbsp;&nbsp;
        <span>최종수정일 : { modifiedDate }</span>
        </div>
      </div>
    <hr width= "800px"></hr>
    </div>
  );
}
export default Noticecp;