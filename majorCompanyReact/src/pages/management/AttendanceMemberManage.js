import React from 'react';
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import { callGetAttendanceEmpListAPI } from '../../apis/AttendanceAPICalls';
import AttendanceList from '../../components/attendanceDate/AttendanceList';
import MemberManageCSS from './MemberManage.module.css';

function AttendanceMemberManage() {

    const dispatch = useDispatch();
    const member = useSelector(state => state.attendanceReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const attendanceList = member.data;
    console.log("member: {} ", member);
    console.log("attendanceList : {} ", attendanceList && attendanceList[0].attendance);
    const navigate = useNavigate();

    useEffect(
      () => {    
          console.log('token', token.sub);
          if(token !== null) {
              dispatch(callGetAttendanceEmpListAPI({
                  memberId: token.sub
              }));            
          }
        }
      ,[]
    );

    const onClickBackHandler = () => {
        
      navigate(-1);
    }

  return (
    <>
      <h1 className= {MemberManageCSS.profileheader}>{Array.isArray(member.data) && member.data[0].memberId} 사원 근태 목록</h1>
      <button
        className={MemberManageCSS.memberImageButton}
        onClick = { onClickBackHandler }
        >
        돌아가기
      </button>

      {Array.isArray(attendanceList) && attendanceList[0].attendance.map((empAttendance) => 
              <AttendanceList key={empAttendance.id} prop={empAttendance}></AttendanceList>)}
    </>
  );
}

export default AttendanceMemberManage;