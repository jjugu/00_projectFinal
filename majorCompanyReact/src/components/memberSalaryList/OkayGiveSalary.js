import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import OkayGiveSalaryCSS from './OkayGiveSalary.module.css';

import { callGetMemberManageSalaryAPI } from '../../apis/SalaryManageMemberAPICalls';

import {
  callOkayGiveSalaryAPI,
  callRejectSalaryRequestAPI
} from '../../apis/SalaryManageAPICalls';

import {
  callGetAttendanceEmpListAPI
} from '../../apis/AttendanceAPICalls';

function OkayGiveSalary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  /* 현재의 url 맨 뒤 memberId 위치 parsing 하기 */
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length - 1];
  // console.log("url 마지막 값: ", location);

  /* 사원의 마지막 급여 정보 */
  const who = useSelector(state => state.manageSalaryReducer);
  const findWho = who && who.data;
  const selectSalary = findWho && findWho.memberSalary || '';
  // console.log("selectSalary: " ,selectSalary);  
  
  const findLast = selectSalary && selectSalary.map((last) => last.salaryCode) || '';
  // console.log("findLast: ", findLast);
  const realMax = findLast && Math.max(...findLast);
  // console.log("realMax: " , realMax);
  const chooseOne = selectSalary && selectSalary.filter((findYou) => findYou.salaryCode === realMax) || '';
  
  const selectLastSalary = chooseOne && chooseOne[0] || '';
  // console.log("selectLastSalary: ", (selectLastSalary && selectLastSalary) || '');

  /* bonus : null 값 0으로 변경 */
  let bonusNullChange = 0;
  if(selectLastSalary && selectLastSalary.salaryBonus !== null) {
    bonusNullChange = selectLastSalary && selectLastSalary.salaryBonus;
  }

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
  const oneHourSalary = parseInt(findWho && findWho.memberSalaryBonus) / 160; // 초과 근무 수당을 위한 시급 계산

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
    basicHourSalary = Math.floor(basicHour * (parseInt(findWho && findWho.memberSalaryBonus) / 160));
  } else { 
    basicHourSalary = findWho && findWho.memberSalaryBonus;
  }
  // console.log("기본 근로 시간에 따른 급여: ",basicHourSalary);
  // console.log("총 초과 근무 시간에 따른 급여: ",overTimeSalary);
  overTimeSalary = Math.floor((totalOverTime * oneHourSalary) / 100) * 100; // 초과 근무 수당 (100원 단위로 끊음)


  /* 급여 지급 요청 승인하기 */
  const [form, setForm] = useState({
    salaryCode: 0,
    salaryStatus: '',
    salaryRejectReason: ''
  });
  
  /* 승인 -> ok 버튼 */
  const onClickOkayHandler = (e) => {

    selectLastSalary.salaryStatus = "Y";

    setForm({
      ...form,
      ['salaryCode']: selectLastSalary && selectLastSalary.salaryCode,
      ['salaryStatus']: "Y"
    });
  }

  /* 반려 -> reject 버튼 */
  const onClickRejectHandler = (e) => {

    selectLastSalary.salaryStatus = "R";

    setForm({
      ...form,
      ['salaryCode']: selectLastSalary && selectLastSalary.salaryCode,
      ['salaryStatus']: "R"
    });

  }

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onClickRejectCheckHandler = () => { 

    console.log('[SalaryReject] onClickRejectSalaryRequest');

    dispatch(callRejectSalaryRequestAPI({	// 사원 급여 지급 반려
        form: form
    }));        
    
    alert('급여 요청 목록으로 이동합니다.');
    navigate('/management/manageSalary', { replace: true});
    window.location.reload();
  }

  const onClickOkayGiveSalaryHandler = () => {

    console.log('[SalaryOkay] onClickOkayGiveSalary');

    dispatch(callOkayGiveSalaryAPI({	// 사원 급여 지급 승인
        form: form
    }));        
    
    alert('급여 요청 목록으로 이동합니다.');
    navigate('/management/manageSalary', { replace: true});
    window.location.reload();
  }

  useEffect(
    () => {    
        console.log('token', token.sub);
        if(token !== null) {
          dispatch(callGetAttendanceEmpListAPI({
            memberId: location
          }))
          dispatch(callGetMemberManageSalaryAPI({
            memberId: location
          }));
        }
    }
    ,[]
  );

  return (
    <>
       <div 
            className={ OkayGiveSalaryCSS.backgroundDiv}
            style={ { backgroundColor: 'white'} }>

        {
          selectLastSalary && <div className={ OkayGiveSalaryCSS.registerForm }>
            { selectLastSalary.salaryStatus &&
              <h2>{selectLastSalary.salaryYear}{selectLastSalary.salaryMonth}</h2>
            }

            <h2>{findWho.memberName} {findWho.memberGrade}님 급여</h2>
            
            {/* 급여 지급 승인 전 */}
            { selectLastSalary.salaryStatus == "N" &&
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px'}}
            value={"휴가 잔여 일수: " + findWho.memberRemanet || ''}/>
            }

            { selectLastSalary.salaryStatus == "N" &&
              <input 
              type="text" 
              readOnly={true}
              style={{width:'280px'}}
              value={"기본 급여 지급 : " + basicHourSalary + "원" || ''}/>
            }

            { selectLastSalary.salaryStatus == "N" &&
              <input 
              type="text" 
              readOnly={true}
              style={{width:'280px'}}
              value={"초과 근무 수당 : " + overTimeSalary + "원" || ''}/>
            }

            { selectLastSalary.salaryStatus == "N" &&
              <input 
              type="text" 
              readOnly={true}
              style={{width:'280px'}}
              value={"급여 보너스: " + bonusNullChange + "원" || ''}/>
            }
            { selectLastSalary.salaryStatus == "N" &&
              <input 
              type="text" 
              readOnly={true}
              style={{backgroundColor:'lightGrey', width:'280px'}}
              value={"총 지급 급여 : " + (basicHourSalary + overTimeSalary) + "원" || ''}/>
            }

            {/* 급여 지급 승인 후 - setForm까지 됨, form을 API를 통해 넘기기 전 단계 */}
            { selectLastSalary.salaryStatus == "Y" &&
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px', backgroundColor: 'lightGrey'}}
            value={"휴가 잔여 일수: " + findWho.memberRemanet || ''}/>
            }

            { selectLastSalary.salaryStatus == "Y" &&
              <input 
              type="text" 
              readOnly={true}
              style={{backgroundColor:'lightGrey', width:'280px'}}
              value={"총 지급 급여 : " + (basicHourSalary + overTimeSalary) + "원" || ''}/>
            }

            { selectLastSalary.salaryStatus == "Y" &&
              <input 
              type="text" 
              readOnly={true}
              style={{backgroundColor:'lightGrey', width:'280px'}}
              value={"급여 보너스: " + bonusNullChange  || ''}/>
            }

            { selectLastSalary.salaryStatus == "Y" && 
              <label>
                <input style={{width:'280px'}} type="text" readOnly={true} value="급여 지급 요청이 확인되었습니다."/>
                <input style={{width:'280px'}} type="text" readOnly={true} value="승인하시려면 <승인> 버튼을 눌러주세요."/>
              </label>
            }

            {/* 급여 지급 반려 후 - setForm까지 됨, form을 API를 통해 넘기기 전 단계 */}
            { selectLastSalary.salaryStatus == "R" &&
            <input 
            type="text" 
            readOnly={true}
            style={{width:'280px', backgroundColor: 'lightGrey'}}
            value={"휴가 잔여 일수: " + findWho.memberRemanet || ''}/>
            }

            { selectLastSalary.salaryStatus == "R" &&
              <input 
              type="text" 
              readOnly={true}
              style={{backgroundColor:'lightGrey', width:'280px'}}
              value={"총 지급 급여 : " + (basicHourSalary + overTimeSalary) + "원" || ''}/>
            }

            { selectLastSalary.salaryStatus == "R" &&
              <input 
              type="text" 
              readOnly={true}
              style={{backgroundColor:'lightGrey', width:'280px'}}
              value={"급여 보너스: " + bonusNullChange  || ''}/>
            }

            { selectLastSalary.salaryStatus == "R" && 
              <>
                <input style={{width:'280px'}} type="text" readOnly={true} value="급여 지급 요청이 반려되었습니다."/>
                <input style={{width:'280px'}} type="text" readOnly={true} value="계속 진행하시려면 <확인>버튼을 눌러주세요."/>
                <input style={{width:'280px'}} type="text" readOnly={true} value="변경하시려면 <Ok> 박스를 눌러주세요."/>
              </>
            }

            {selectLastSalary.salaryStatus == "R" && selectLastSalary.salaryRejectReason == null &&
              <input  
                type="text" 
                name='salaryRejectReason'
                placeholder="반려 사유를 작성해주세요."
                style={{backgroundColor:'lightGrey', width:'280px'}}
                onChange={onChangeHandler}
                readOnly={false}/>
            }

            {/* okay or reject 체크 버튼 */}
            { (selectLastSalary.salaryStatus === "N" &&
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
              
              (selectLastSalary.salaryStatus == "Y" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
                          , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Ok
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  value="check"
                  onClick={onClickOkayHandler}
                  disabled/>
              </span>)

              || 
                            
              (selectLastSalary.salaryStatus == "R" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
                          , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Ok
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  value="check"
                  onClick={onClickOkayHandler}/>
              </span>)

            }

            { (selectLastSalary.salaryStatus === "N" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
              , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Reject
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  onClick={onClickRejectHandler}/>
              </span>)

              ||

              (selectLastSalary.salaryStatus == "R" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
                          , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Reject
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  onClick={onClickRejectHandler}
                  disabled/>
              </span>)

              ||

              (selectLastSalary.salaryStatus === "Y" &&
              <span style={{flexWrap:'wrap', display:'flex', alignItems:'center'
              , justifyContent:'flex-end', flexDirection:'center', width:'300px'}}>
                <label>
                  Reject
                  </label>
                <input
                  type="checkbox"
                  style={{width:'20px', marginRight:'30px'}}
                  onClick={onClickRejectHandler}/>
              </span>)
            }

              <span>
                <button
                  onClick = { () => navigate(-1) }>
                    돌아가기
                </button>
                { (selectLastSalary.salaryStatus == ("Y") || selectLastSalary.salaryStatus == ("N")) &&
                <button
                  onClick = { onClickOkayGiveSalaryHandler }>
                    승인
                </button>
                }
                { selectLastSalary.salaryStatus == "R" &&
                <button
                  onClick = { onClickRejectCheckHandler }>
                    확인
                </button>
                }
              </span>
          </div>
        }
      </div>
    </>
  );
}
export default OkayGiveSalary;