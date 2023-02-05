import { useEffect,  useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FreeUpdateCSS from './FreeUpdate.module.css';

/* 로그인한 회원정보 담기 */
import { decodeJwt } from '../../utils/tokenUtils';

/* 로그인한 회원정보 담기 */
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

import {
  callFreeUpdateAPI
} from '../../apis/FreeAPICalls';
import { PUT_FREE } from '../../modules/FreeModule';

function FreeUpdate() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const free = useSelector(state => state.freeReducer);
    const params = useParams();

    /* 로그인한 회원정보 담기 */
    const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    // console.log('memberDetail 값: ', memberDetail);



    /* 글쓰기에 무엇을 담아낼지 */
    const [form, setForm] = useState({
      boardNo: '',
      boardTitle: '',
      boardContent:'',
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

    const onChangeHandler = (e) => {
      setForm({
        ...form,
        ['boardNo']: free.boardNo,
        ['memberCode']:memberDetail.memberCode,
        [e.target.name]: e.target.value
      },);
      
    };

    const onClickFreeUpdateokHandler = () => {
      dispatch(callFreeUpdateAPI({
        form: form
      }));
      alert('글 수정에 성공하셨습니다')
      navigate(-1);
    }
    
    return(
      <>
        <input
          className={ FreeUpdateCSS.title }
          type="text"
          name="boardTitle"
          defaultValue={ free.boardTitle || '' }
          onChange={ onChangeHandler }
        >
        </input>

        <hr width= "795px"></hr>
        <textarea
          className={ FreeUpdateCSS.content }
          cols={"128"}
          rows={"30"}
          type="text"
          name="boardContent"
          defaultValue={ free.boardContent || '' }
          onChange={ onChangeHandler }
        />
        <hr width= "795px"></hr>
        <span>
        <button
          className={ FreeUpdateCSS.btn}
          onClick={ () => navigate(-1) }          
        >
          돌아가기
        </button>
        <button
          className={ FreeUpdateCSS.btn}
          onClick = { onClickFreeUpdateokHandler }
        >
          수정완료
        </button>

        </span>
      </>
  )
} export default FreeUpdate;