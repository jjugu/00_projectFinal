import { useEffect,  useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FreeRegistrationCSS from './FreeRegistration.module.css';

/* 로그인한 회원정보 담기 */
import { decodeJwt } from '../../utils/tokenUtils';

/* 로그인한 회원정보 담기 */
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

import {
  callFreeRegistAPI
} from '../../apis/FreeAPICalls';
import { POST_FREE } from '../../modules/FreeModule';

function FreeRegistration() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const free = useSelector(state => state.freeReducer);
    
    /* 로그인한 회원정보 담기 */
    const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    // console.log('memberDetail 값: ', memberDetail);


    // console.log("useRef값: ", memberCodeRef.current.focus());

    /* 글쓰기에 무엇을 담아낼지 */
    const [form, setForm] = useState({
      boardTitle: '',
      boardContent:'',
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
      navigate("/board/free/list", { replace: true })
    }
    
    const onClickFreeRegistrationHandler = () => {
      dispatch(callFreeRegistAPI({
        form: form,
      }));
      navigate('/board/free/list', { replace: true});
        window.location.reload();
    }
    


    return(
      <>
        <br></br>
        <input
            type="text"
            className={ FreeRegistrationCSS.title }
            name="boardTitle"
            placeholder="제목을 입력하세요"
            autoComplete="off"
            onChange={ onChangeHandler }
        />
        <hr width= "795px"></hr>
        <textarea
            cols={"128"}
            rows={"30"}
            className={ FreeRegistrationCSS.content }
            type="text"
            name="boardContent"
            placeholder="내용을 입력하세요"
            autoComplete="off"
            onChange={ onChangeHandler }
        />
        <hr width= "795px"></hr>
        <span>
        <button
          className={ FreeRegistrationCSS.btn }
          onClick = { onClickBackHandler }
        >
          작성취소
        </button>
        <button
          className={ FreeRegistrationCSS.btn }
          onClick = { onClickFreeRegistrationHandler }
        >
          작성하기
        </button>
        </span>
      </>
    )
} export default FreeRegistration;