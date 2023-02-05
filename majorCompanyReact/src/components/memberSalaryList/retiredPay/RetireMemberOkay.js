import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import RetireMemberOkayCSS from './RetireMemberOkay.module.css';

import { 
  callGetRetiredMemberAPI,
  callMemberRetireAPI
} from '../../../apis/RetiredAPICalls';

function ListMemberSalary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const findRetiredMember = useSelector(state => state.retiredMemberReducer);
  const retiredMemberData = findRetiredMember && findRetiredMember.data;
  const retiredMemberSalary = retiredMemberData && retiredMemberData.memberSalary;
  console.log(retiredMemberData);

  /* 재직 일수 구하기 */
  const joinDay = retiredMemberData && retiredMemberData.memberJoin;
  let parseJoinDay = joinDay && joinDay.replace('/', '').replace('/', '');
  let joinDate = parseJoinDay && new Date((20 + parseJoinDay.slice(0,2)), (parseJoinDay.slice(2,4) - 1), parseJoinDay.slice(4,6));
  // console.log("joinDate_Date: ", joinDate); // 입사 일자

  /* 현재의 url 맨 뒤 memberId 위치 parsing 하기 */
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length - 1];
  // console.log("url 마지막 값: ", location);

  /* 퇴직금 지급 요청 등록 create form */
  const [form, setForm] = useState({
    memberCode: 0,
    memberRtStatus: ''
  });

  const onClickOkayHandler = (e) => {

    setForm({
        ...form,
        ['memberCode']: retiredMemberData && retiredMemberData.memberCode,
        ['memberEnt']: 'Y'
    });
  };
  
  const onChangeHandler = (e) => { 
    // console.log(callLeaveDate);

    setForm({
      ...form,
      [e.target.name]: (e.target.value).slice(0,2) + '/' +(e.target.value).slice(2,4) + '/' + (e.target.value).slice(4,6)
    })
  }

  const onClickRetirePaymentGiveHandler = () => {

      console.log('[RetiredPaymentRequest] onClickRequestRetiredPayment');

      dispatch(callMemberRetireAPI({
          form: form
      }));        
      
      alert('해당 사원의 퇴사 처리가 되었습니다.');  
      navigate('/management/member/retire', { replace: true});
      window.location.reload();
  }

  useEffect(
      () => {    
          console.log('token', token.sub);
          if(token !== null) {
            dispatch(callGetRetiredMemberAPI({
              memberId: location
            }));
          }
      }
      ,[]
  );

  return (
    <>
      <div 
            className={ RetireMemberOkayCSS.backgroundDiv}
            style={ { backgroundColor: 'white'} }>
        
        { retiredMemberData && <div className={ RetireMemberOkayCSS.registerForm }>
          <h2>{retiredMemberData.memberName}{retiredMemberData.memberGrade} 퇴사 처리</h2>
          
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"입사 일자 : " + joinDay}/>

            <input 
            type="text" 
            id='memberLeave'
            name='memberLeave'
            placeholder="퇴사 일자를 작성해주세요 : 220102"
            onChange={ onChangeHandler }
            style={{backgroundColor:'lightgrey', width:'280px'}} />

            { (retiredMemberData.memberRtStatus === "N" && 
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
              , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Ok
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  onClick={onClickOkayHandler}/>
              </span>)

              || 
              
              (retiredMemberData.memberRtStatus === "Y" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
                          , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Ok
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  onClick={onClickOkayHandler}
                  disabled/>
            </span>)}

            <span>
              <button
                onClick = { () => navigate(-1) }>
                  돌아가기
              </button>

              <button
                onClick = { onClickRetirePaymentGiveHandler }>
                  확인
              </button>
            </span>
        </div>}
      </div>
    </>
  );
}
export default ListMemberSalary;