import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import NoticecDetailCSS from './NoticeDetail.module.css';

import { decodeJwt } from '../../utils/tokenUtils';
/* 로그인한 회원정보 담기 */
import {
  callGetMemberAPI
} from '../../apis/MemberAPICalls'
import {
  callNoticeDetailAPI
} from '../../apis/NoticeAPICalls'
import { PUT_NOTICE } from '../../modules/NoticeModule';
import {
  callNoticeDeleteAPI
} from '../../apis/NoticeAPICalls'
import { DELETE_NOTICE } from '../../modules/NoticeModule';

function NoticeDetail() {

      /* 로그인한 회원정보 담기 */
      const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
      const token = decodeJwt(window.localStorage.getItem("accessToken"));   
      const memberDetail = member.data;

      // console.log('form값: ', form)
  /* 로그인한 회원정보 담기 */
  useEffect(
    () => {    
        console.log('token', token.sub);
        if(token !== null) {
            dispatch(callGetMemberAPI({
                memberId: token.sub
            }));
        }
       
    }
    ,[]
);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const notice = useSelector(state => state.noticeReducer);
  
  
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length -1];
  console.log(location);
  
  
  const onClickBackHandler = () => {
    navigate("/notice/list", { replace: true })
  }
  
  const [form, setForm] = useState({
    noticeNo: location,
    noticeTitle: '',
    noticeContent:'',
    memberCode: ''
  });

  useEffect(
    () => {
      dispatch(callNoticeDetailAPI({
        noticeNo: params.noticeNo
      }));
    }
    ,[]
    );
    
    const onClickNoticeUpdateHandler = () => {
      navigate(`/notice/update/${notice.noticeNo}`, {replace: false});
    }
    
    const onClickNoticeDeleteHandler = () => {
      // eslint-disable-next-line no-restricted-globals
      // window.confirm을 붙이거나 위의 주석을 붙여줘서 이 파일에만 rule를 적용시키면 된다
      if(!window.confirm("삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까?")){
        return false;
      }
      setForm({
        ...form,
        ['noticeNo']: location,
        ['memberCode']:memberDetail.memberCode
      },);

      dispatch(callNoticeDeleteAPI({
        form: form
      }));
      navigate("/notice/list", { replace: true })
      window.location.reload();
    }
    // console.log("123",notice.memberCode)
      return (
    <div>
      {notice &&
      <div>
      <br></br>
        <textarea
          className={NoticecDetailCSS.title}
          cols={"129"}
          rows={"2"}
          type="text"
          name="noticeTitle"
          readOnly={true}
          value={ notice.noticeTitle || ''}
          >
        </textarea>
        <hr width= "795px"></hr>
        <textarea
          className={NoticecDetailCSS.content}
          cols={"129"}
          rows={"30"}
          type="text"
          name="noticeContent"
          readOnly={true}
          value={ notice.noticeContent || '' }
        >
        </textarea>
        <hr width= "795px"></hr>
        { notice &&
          (memberDetail?.memberCode === notice?.memberCode) 
           ?
        <div className={NoticecDetailCSS.g}>
        <button
          className={NoticecDetailCSS.btn}
          name='noticeNo'
          onClick={ onClickNoticeDeleteHandler }
        >
          글 삭제
        </button>
        <button
          className={NoticecDetailCSS.btn2}  
          onClick = { onClickNoticeUpdateHandler }
        >
          수정하기
        </button>
        </div>
        : null
        }
        <div className={NoticecDetailCSS.g}>
        <button
          className={NoticecDetailCSS.btn}
          onClick = { onClickBackHandler }
        >
          돌아가기
        </button>
        <hr width= "795px"></hr>
      </div>
      </div>
    }    
    </div>   
  )

}
export default NoticeDetail;