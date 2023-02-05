import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetAttendanceDateAPI } from '../../apis/AttendanceManageAPICalls';
import AttendanceDate from '../../components/attendanceDate/AttendanceDate';
import MemberManageCSS from './MemberManage.module.css';

function AttendanceDateManage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(state => state.attendanceManageReducer);  
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  const attendance = member.data;
  const [day, setDay] = useState(Date);
  const [pageTitleY, setPageTitleY] = useState('');
  const [pageTitleM, setPageTitleM] = useState('');
  const [pageTitleD, setPageTitleD] = useState('');

  console.log("attendance", attendance);

  useEffect(
    () => {if(token !== null) {
      var now = new Date()

      {setDay(now)}

      var year = now.getFullYear();
      {setPageTitleY(year)}

      var month = ('0' + (now.getMonth() + 1)).slice(-2);
      {setPageTitleM(month)}

      var day = ('0' + now.getDate()).slice(-2);
      {setPageTitleD(day)}

      var today = year + month + day;
      console.log("today : ", today);
      console.log("today type : ", typeof(today));

      dispatch(callGetAttendanceDateAPI({
        attendanceDate : today
      })); 
    }
    }
  ,[]
  );

  const onClickYesterdayHandler = () => {
    console.log("yester?");
    day.setDate(day.getDate() - 1);
    {setDay(day)}
    
    console.log("day : ", day);
    var year2 = day.getFullYear();
    {setPageTitleY(year2)}

    var month2 = ('0' + (day.getMonth() + 1)).slice(-2);
    {setPageTitleM(month2)}

    var day2 = ('0' + day.getDate()).slice(-2);
    {setPageTitleD(day2)}

    var today2 = year2 + month2 + day2;
    console.log(today2);

    dispatch(callGetAttendanceDateAPI({
      attendanceDate : today2
    })); 
  }

  const onClickNextdayHandler = () => {
    console.log("next?");
    day.setDate(day.getDate() + 1);
    {setDay(day)}
    
    console.log("day : ", day);
    var year2 = day.getFullYear();
    {setPageTitleY(year2)}

    var month2 = ('0' + (day.getMonth() + 1)).slice(-2);
    {setPageTitleM(month2)}

    var day2 = ('0' + day.getDate()).slice(-2);
    {setPageTitleD(day2)}

    var today2 = year2 + month2 + day2;
    console.log(today2);

    dispatch(callGetAttendanceDateAPI({
      attendanceDate : today2
    })); 
  }

  const onClickTodayHandler = () => {
    console.log("today?");
    var now = new Date() 
    {setDay(now)}
    
    console.log("day : ", now);
    var year2 = now.getFullYear();
    {setPageTitleY(year2)}

    var month2 = ('0' + (now.getMonth() + 1)).slice(-2);
    {setPageTitleM(month2)}

    var day2 = ('0' + now.getDate()).slice(-2);
    {setPageTitleD(day2)}

    var today2 = year2 + month2 + day2;
    console.log(today2);

    dispatch(callGetAttendanceDateAPI({
      attendanceDate : today2
    })); 
  }

  const onClickBackHandler = () => {
        
    navigate(-1);
  }

  console.log("day type : ", typeof(day));
  console.log("day 이거 : ", day);

  return (
    <>
      <h1 className= {MemberManageCSS.profileheader}>{`${pageTitleY}년 ${pageTitleM}월 ${pageTitleD}일 사원 근태 현황`}</h1>
      <span>
        <button
          className={MemberManageCSS.memberImageButton2}
          onClick = { onClickYesterdayHandler }
          >
          어제
        </button>
        &nbsp;&nbsp;
        <button
          className={MemberManageCSS.memberImageButton2}
          onClick = { onClickTodayHandler }
          >
          오늘
        </button>
        &nbsp;&nbsp;
        <button
          className={MemberManageCSS.memberImageButton2}
          onClick = { onClickNextdayHandler }
          >
          내일
        </button>
        &nbsp;&nbsp;
        <button
          className={MemberManageCSS.memberImageButton}
          onClick = { onClickBackHandler }
          >
          돌아가기
        </button>
      </span>
      &nbsp;
      {Array.isArray(attendance) && attendance.map((att) => 
                                <AttendanceDate key={att.id} prop={att}></AttendanceDate>)}
    </>
  );
}

export default AttendanceDateManage;