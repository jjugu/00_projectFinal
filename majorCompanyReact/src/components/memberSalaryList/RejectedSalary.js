import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import RejectedSalaryCSS from './RejectedSalary.module.css';

import {
  callReRequestSalaryAPI
} from '../../apis/SalaryManageMemberAPICalls';

import {
  callGetSalaryManageAPI
} from '../../apis/SalaryManageAPICalls';

import {
  callGetAttendanceEmpListAPI
} from '../../apis/AttendanceAPICalls';

function RejectedSalary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  /* 급여 지급 연월 구하기 */
  const day = new Date();
  const findYear = day.getFullYear() + "년";
  const findMonth = (day.getMonth() + 1) + "월";

  /* 사원 급여 내역 구하기 */
  const selectMember = useSelector(state => state.manageSalaryReducer);  
  const theMember = selectMember && selectMember.data;
  // console.log(selectMember);

  /* 사원의 마지막 급여 정보 */
  const selectLastSalaryList = theMember && theMember.memberSalary;
  const findLastOne = selectLastSalaryList && selectLastSalaryList.map((maxOne) => maxOne.salaryCode);
  const selectLastSalary = findLastOne && Math.max(...findLastOne);
  let findTheThing = [];
  for(let i = 0; i < (selectLastSalaryList && selectLastSalaryList.length); i++) {
    if(selectLastSalaryList[i].salaryCode == selectLastSalary) { 
      findTheThing = selectLastSalaryList[i];
    }
  }
  console.log("사원의 마지막 급여 정보 : ", findTheThing && findTheThing);

  /* 사원 출퇴근 별 급여 구하기 */
  const memberAttArr = useSelector(state1 => state1.attendanceReducer);
  const attData = memberAttArr && memberAttArr.data;
  const attList = attData && attData[0].attendance;
  
  let totalHour       = [];   // 총 근무 시간
  let overTime        = [];   // 초과 근무 시간
  let basicHour       = 0;    // 160 시간 기준
  let totalOverTime   = 0;    // 초과 근무 시간 -> 기본 근로 시간과 합쳐서 총 209시간까지 가능
  let basicHourSalary;        // 기본 급여 수당
  let overTimeSalary;         // 초과 근무 수당
  const oneHourSalary = parseInt(theMember && theMember.memberSalaryBonus) / 160; // 초과 근무 수당을 위한 시급 계산

  for(let i = 0; i < (attList && attList.length); i++){
    totalHour[i] =(attList && parseInt(attList[i].attendanceHour));

    if(attList && attList[i].attendanceOvertime === null) { 
      overTime[i] = 0;
    } else { 
      overTime[i] = (attList && parseInt(attList[i].attendanceOvertime));
    }

    basicHour += totalHour[i] - overTime[i];
    totalOverTime += overTime[i];
  }
  
  if(basicHour < 160) {
    basicHourSalary = Math.floor(basicHour * (parseInt(theMember && theMember.memberSalaryBonus) / 160));
  } else { 
    basicHourSalary = theMember && theMember.memberSalaryBonus;
  }
  // console.log("기본 근로 시간에 따른 급여: ",basicHourSalary);
  // console.log("총 초과 근무 시간에 따른 급여: ",overTimeSalary);
  overTimeSalary = Math.floor((totalOverTime * oneHourSalary) / 100) * 100; // 초과 근무 수당 (100원 단위로 끊음)

  /* 현재의 url 맨 뒤 memberId 위치 parsing 하기 */
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length - 1];
  // console.log("url 마지막 값: ", location);

  /* 급여 요청 등록 create form */
  const [form, setForm] = useState({
    memberCode: 0,
    salaryCode: 0,
    salaryStatus: '',
    salaryBasic: 0,
    salaryBonus: ''
  });

  const onChangeHandler = (e) => {
    setForm({
        ...form,
        ['memberCode']: theMember && theMember.memberCode,
        ['salaryCode']: findTheThing && findTheThing.salaryCode,
        ['salaryStatus']: "N",
        [e.target.name]: e.target.value
    });
  };

  const onClickRequestSalaryHandler = () => {

      console.log('[SalaryRe-Registration] callReRequestSalaryAPI');

      dispatch(callReRequestSalaryAPI({	
          form: form
      }));        
      
      alert('급여 지급 재요청이 완료되었습니다.');  // 지급 여부 N인 salary 목록 페이지 만들기!
      navigate('/management/manageSalary', { replace: true});
      window.location.reload();
  }

  useEffect(
      () => {    
          console.log('token', token.sub);
          if(token !== null) {
            dispatch(callGetAttendanceEmpListAPI({
              memberId: location
            }));
            dispatch(callGetSalaryManageAPI({
              memberId: location
            }));
          }
      }
      ,[]
  );

  return (
    <>
      <div 
            className={ RejectedSalaryCSS.backgroundDiv}
            style={ { backgroundColor: 'white'} }>
        
        {theMember && <div className={ RejectedSalaryCSS.registerForm }>
          <h2>{findYear} {findMonth} 급여</h2>
          <h2>{theMember.memberName}{theMember.memberGrade}님</h2>
          
          <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"휴가 잔여 일수: " + (theMember.memberRemanet || '')+ "일"}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"기본 급여 : " + (theMember && theMember.memberSalaryBonus || 0) + "원"}/>
            
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"초과 수당 : " + overTimeSalary + "원"}/>
            
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"지난 달 보너스 : " + (selectLastSalary && selectLastSalary.salaryBonus || 0) + "원"}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"총 급여 : " + (basicHourSalary + overTimeSalary) + "원"}/>

            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"반려 사유 : " + ((findTheThing && findTheThing.salaryRejectReason) || '')}/>

            <input 
            type="text" 
            name='salaryBasic'
            placeholder="지급 요청할 급여를 입력해주세요.     (￦)"
            onChange={ onChangeHandler }
            style={{backgroundColor:'lightgrey', width:'280px'}} />

            <input 
            type="text" 
            name='salaryBonus'
            placeholder="지급 요청할 보너스를 입력해주세요. (￦)"
            onChange={ onChangeHandler }
            style={{backgroundColor:'lightgrey', width:'280px'}} />

            <input 
            type="hidden" 
            name='memberCode'
            value={(theMember && theMember.memberCode || '')}
            readOnly={true}/>

            <span>
              <button
                onClick = { () => navigate(-1) }>
                  돌아가기
              </button>

              <button
                onClick = { onClickRequestSalaryHandler }>
                  재요청하기
              </button>
            </span>
        </div>}
      </div>
    </>
  );
}
export default RejectedSalary;