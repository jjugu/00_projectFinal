import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import RetiredPayOkayCSS from './RetiredPayOkay.module.css';

import { 
  callGetRetiredMemberAPI,
  callRetirePaymentOkayAPI,
  callMemberRetireCancelAPI
} from '../../../apis/RetiredAPICalls';

function ListMemberSalary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const findRetiredMember = useSelector(state => state.retiredMemberReducer);
  const retiredMemberData = findRetiredMember && findRetiredMember.data;
  const retiredMemberSalary = retiredMemberData && retiredMemberData.memberSalary;
  // console.log(retiredMemberData);

  /* 마지막 3개월 급여 내역 구하기 */
  const lastNum = retiredMemberSalary && retiredMemberSalary.map((salaries) => salaries.salaryCode);
  const lastThreeNum = lastNum && lastNum.slice(-3);
  // console.log("lastThreeNum: ", lastThreeNum);

  /* 퇴사자의 마지막 3개월 급여 평균 구하기 */
  let lastThreeSalary = [];
  let salaryAverage = 0;
  for(let i = 0; i < (lastNum && lastNum.length); i++) {
    if(lastThreeNum[i] != null) { 
      lastThreeSalary[i] = retiredMemberSalary && retiredMemberSalary.filter((findLastThree) => findLastThree.salaryCode == lastThreeNum[i]); 
      salaryAverage += lastThreeSalary && lastThreeSalary[i][0].salaryBasic;
    }
  }
  salaryAverage = salaryAverage / 3;    // 마지막 3 개월 평균 임금
  // console.log(salaryAverage + "원");        

  /* 재직 일수 구하기 */
  const joinDay = retiredMemberData && retiredMemberData.memberJoin;
  let parseJoinDay = joinDay && joinDay.replace('/', '').replace('/', '');
  let joinDate = parseJoinDay && new Date((20 + parseJoinDay.slice(0,2)), (parseJoinDay.slice(2,4) - 1), parseJoinDay.slice(4,6));
  // console.log("joinDate_Date: ", joinDate); // 입사 일자

  const leaveDay = retiredMemberData && retiredMemberData.memberLeave;
  let parseLeaveDay = leaveDay && leaveDay.replace('/', '').replace('/', '');
  let leaveDate = parseLeaveDay && new Date((20 + parseLeaveDay.slice(0,2)), parseLeaveDay.slice(2,4) - 1, parseLeaveDay.slice(4,6));
  // console.log("parseLeaveDay_Date: ", leaveDate); // 퇴사 일자

  let workingDays = (leaveDate - joinDate) / (1000 * 60 * 60 * 24);  // 근무 일수
  // console.log("workingDays: ", workingDays);

  /* 퇴직금 산정 */
  let retiredPayment = Math.floor((salaryAverage && workingDays) && salaryAverage * (workingDays / 365) / 1000) * 1000; // 천원 단위로 끊음
  // console.log(retiredPayment);

  /* 퇴직금 지급 연월 구하기 */
  const day = new Date();
  const findYear = day.getFullYear() + "년";
  const findMonth = (day.getMonth() + 1) + "월";

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

    retiredMemberData.memberRtStatus = "Y";

    setForm({
        ['memberCode']: retiredMemberData && retiredMemberData.memberCode,
        ['memberRtStatus']: "Y"
    });
  };

  const onClickRetirePaymentGiveHandler = () => {

      console.log('[RetiredPaymentRequest] onClickRequestRetiredPayment');

      dispatch(callRetirePaymentOkayAPI({
          form: form
      }));        
      
      alert('퇴직금 지급이 승인되었습니다.');  
      navigate('/management/manageSalary', { replace: true});
      window.location.reload();
  }

  /* 퇴사 취소 처리 form */
  const [cancel, setCancel] = useState({
    memberCode: 0,
    memberEnt: '',
    memberLeave: '',
    memberRtStatus: '',
    memberRtPayment: 0
  });

  const onChangeRetirementState = (e) => { 

    retiredMemberData.memberEnt = "N";

    setCancel({
      ['memberCode']: retiredMemberData && retiredMemberData.memberCode,
      ['memberEnt']: 'N',
      ['memberLeave']: '',
      ['memberRtStatus']: 'N',
      ['memberRtPayment']: 0
  });
  }

  const onClickRetireCancelHandler = () => {

      console.log('[RetiredPaymentRequest] onClickRetirePaymentGiveHandler');
      if(window.confirm("퇴사 처리를 취소하시겠습니까?")) { 
        alert("해당 사원의 퇴사를 취소합니다.")

        dispatch(callMemberRetireCancelAPI({  
            form: cancel
        }));        
      
      } else { 
        alert("해당 사원의 퇴사 처리가 유지됩니다.")
      }
      
      navigate('/management/manageSalary', { replace: true});
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
        className={ RetiredPayOkayCSS.backgroundDiv}
        style={ { backgroundColor: 'white'} }>

        { retiredMemberData && <div className={ RetiredPayOkayCSS.registerForm }>
          <h2>{findYear} {findMonth}</h2>
          <h2>{retiredMemberData.memberName}{retiredMemberData.memberGrade} 퇴직금 지급</h2>
          {(retiredMemberData && retiredMemberData.memberRtPayment == null) &&
          <span>
            
            <h3>퇴직금 요청이 되지 않았습니다.</h3>
          </span>}

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"입사 일자 : " + joinDay}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"퇴사 일자 : " + leaveDay}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"3개월 평균 임금 : " + salaryAverage + "원"}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"퇴직금 급여 산정액 : " + retiredPayment + "원"}/>

            { retiredMemberData.memberRtPayment !== null &&
            <input 
            type="text" 
            readOnly={true}
            value= {"요청된 퇴직금 : " + retiredMemberData.memberRtPayment}
            style={{width:'280px'}} />}

            <span style={{flexWrap:'wrap', display:'flex', alignItems:'center', 
                          justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
              { (retiredMemberData.memberRtStatus === "N" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center', 
                            justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  퇴사 취소
                </label>
                  <input
                    type="checkbox"
                    placeholder="퇴사 취소"
                    style={{width:'20px', marginRight:'30px'}}
                    onClick={onChangeRetirementState}/>
              </span>)}
              { retiredMemberData.memberEnt =="N" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center', 
                            justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  퇴사 취소 확인
                </label>
                  <input
                    type="checkbox"
                    style={{width:'20px', marginRight:'30px'}}
                    onClick={onClickRetireCancelHandler}/>
              </span>}
            </span>

            { (retiredMemberData.memberRtStatus === "N" && (retiredMemberData.memberRtPayment !== (null || 0)) &&
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

              { (retiredMemberData.memberRtPayment !== (null || 0)) &&
              <button
                onClick = { onClickRetirePaymentGiveHandler }>
                  확인
              </button>}
            </span>
        </div>}
      </div>
    </>
  );
}
export default ListMemberSalary;