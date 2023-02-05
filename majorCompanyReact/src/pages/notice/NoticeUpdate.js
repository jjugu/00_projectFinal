import { useEffect,  useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoticeUpdateCSS from './NoticeUpdate.module.css';
/* 로그인한 회원정보 담기 */
import { decodeJwt } from '../../utils/tokenUtils';

/* 로그인한 회원정보 담기 */
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

import {
  callNoticeUpdateAPI
} from '../../apis/NoticeAPICalls';
import { PUT_NOTICE } from '../../modules/NoticeModule';

function NoticeUpdate() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer);
    const params = useParams();
    console.log(params.noticeNo)
    /* 로그인한 회원정보 담기 */
    const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    // console.log('memberDetail 값: ', memberDetail);


    // console.log("useRef값: ", memberCodeRef.current.focus());

    /* 글쓰기에 무엇을 담아낼지 */
    const [form, setForm] = useState({
      noticeNo: '',
      noticeTitle: '',
      noticeContent:'',
      memberCode: ''
    });
    console.log(form);

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
      // 스테이트 초기값을 마운트 시점에 인지하지 못해서 체인지 핸들러에 초기값을 불러와서 글을 입력 받을 때 인지시키게 처리
    const onChangeHandler = (e) => {
      setForm({
        ...form,
        ['noticeNo']: notice.noticeNo,
        ['memberCode']:memberDetail.memberCode,
        [e.target.name]: e.target.value
      },);
      
    };

    const onClickNoticeUpdateokHandler = () => {
      dispatch(callNoticeUpdateAPI({
        form: form
        // noticeNo: notice.noticeNo
      }));
      alert('글 수정에 성공하셨습니다')
      // window.location.reload();
      navigate(-1); // 글 수정 완료 후 다시 디테일 페이지로
    }
    
    return(
      <>
        <br></br>
        <input
          className={NoticeUpdateCSS.title}
          type="text"
          name="noticeTitle"
          defaultValue={ notice.noticeTitle || '' }
          onChange={ onChangeHandler }
        >
        </input>
        <hr width= "795px"></hr>
        <textarea
          className={NoticeUpdateCSS.content}
          cols={"128"}
          rows={"30"}
          type="text"
          name="noticeContent"
          defaultValue={ notice.noticeContent || '' }
          onChange={ onChangeHandler }
        >
        </textarea>
        <hr width= "795px"></hr>
        <span>
        <button
          className={NoticeUpdateCSS.btn}
          onClick={ () => navigate(-1) }          
        >
          돌아가기
        </button>
        <button
          className={NoticeUpdateCSS.btn}
          onClick = { onClickNoticeUpdateokHandler }
        >
          수정완료
        </button>
        </span>
      </>
  )
} export default NoticeUpdate;