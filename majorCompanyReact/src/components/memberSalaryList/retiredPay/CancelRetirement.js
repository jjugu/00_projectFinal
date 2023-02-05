import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import CancelRetirementCSS from './CancelRetirement.module.css';

import { 
  callGetRetiredMemberAPI,
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

  const joinDay = retiredMemberData && retiredMemberData.memberJoin;
  const leaveDay = retiredMemberData && retiredMemberData.memberLeave;

  /* 퇴직금 지급 연월 구하기 */
  const day = new Date();
  const findYear = day.getFullYear() + "년";
  const findMonth = (day.getMonth() + 1) + "월";

  /* 현재의 url 맨 뒤 memberId 위치 parsing 하기 */
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length - 1];
  // console.log("url 마지막 값: ", location);

  /* 퇴사 취소 처리 form */
  const [form, setForm] = useState({
    memberCode: 0,
    memberEnt: '',
    memberLeave: '',
    memberRtStatus: '',
    memberRtPayment: 0
  });

  const onClickOkayHandler = (e) => {

    retiredMemberData.memberRtStatus = "N";

    setForm({
        ['memberCode']: retiredMemberData && retiredMemberData.memberCode,
        ['memberEnt']: 'N',
        ['memberLeave']: '',
        ['memberRtStatus']: 'N',
        ['memberRtPayment']: 0
    });
  };

  const onClickRetirePaymentGiveHandler = () => {

      console.log('[RetiredPaymentRequest] onClickRequestRetiredPayment');
      if(window.confirm("퇴사 처리를 취소하시겠습니까?")) { 
        alert("해당 사원의 퇴사를 취소합니다.")

        dispatch(callMemberRetireCancelAPI({  
            form: form
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
        className={ CancelRetirementCSS.backgroundDiv}
        style={ { backgroundColor: 'white'} }>

        { retiredMemberData && <div className={ CancelRetirementCSS.registerForm }>
          <h2>{findYear} {findMonth}</h2>
          <h2>{retiredMemberData.memberName}{retiredMemberData.memberGrade} 퇴사 취소</h2>

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
            value={"지급된 퇴직금 : " + retiredMemberData.memberRtPayment}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value="해당 사원의 퇴사를 취소하시려면 Ok 버튼을"/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value="누르신 후 확인 버튼을 눌러주세요."/>
            

            { (retiredMemberData.memberRtStatus === "Y" &&
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
              
              (retiredMemberData.memberRtStatus === "N" &&
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

              { (retiredMemberData.memberRtPayment !== null) &&
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