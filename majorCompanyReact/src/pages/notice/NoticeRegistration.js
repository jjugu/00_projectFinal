import { useEffect,  useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoticeRegistrationCSS from './NoticeRegistration.module.css';

/* 로그인한 회원정보 담기 */
import { decodeJwt } from '../../utils/tokenUtils';

/* 로그인한 회원정보 담기 */
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

import {
  callNoticeRegistAPI
} from '../../apis/NoticeAPICalls';
import { POST_NOTICE } from '../../modules/NoticeModule';

function NoticeRegistration() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer);
    
    /* 로그인한 회원정보 담기 */
    const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    // console.log('memberDetail 값: ', memberDetail);


    // console.log("useRef값: ", memberCodeRef.current.focus());

    /* 글쓰기에 무엇을 담아낼지 */
    const [form, setForm] = useState({
      noticeTitle: '',
      noticeContent:'',
      memberCode: ''
    });
    
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

    const onChangeHandler = (e) => {
      setForm({
        ...form,
        ['memberCode']:memberDetail.memberCode,
        [e.target.name]: e.target.value
      });
    };
    
    const onClickBackHandler = () => {
      navigate("/notice/list", { replace: true })
    }
    
    const onClickNoticeRegistrationHandler = () => {
      dispatch(callNoticeRegistAPI({
        form: form,
      }));
      navigate('/notice/list', { replace: true});
        window.location.reload();
    }
    


    return(
      <>
      <br></br><br></br>
        <input
            className={NoticeRegistrationCSS.title}
            type="text"
            name="noticeTitle"
            placeholder="제목을 입력하세요"
            autoComplete="off"
            onChange={ onChangeHandler }
        />
        <hr width= "795px"></hr>
        <textarea
            cols={"128"}
            rows={"30"}
            className={NoticeRegistrationCSS.content}
            type="text"
            name="noticeContent"
            placeholder="내용을 입력하세요"
            autoComplete="off"
            onChange={ onChangeHandler }
        />
        <hr width= "795px"></hr>
        <span>
        <button
          className={NoticeRegistrationCSS.btn}
          onClick = { onClickBackHandler }
        >
          작성취소
        </button>

        <button
          className={NoticeRegistrationCSS.btn}
          onClick = { onClickNoticeRegistrationHandler }
        >
          작성하기
        </button>
        </span>
      </>
    )
} export default NoticeRegistration;