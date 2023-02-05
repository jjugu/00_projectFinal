import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetAttendanceOneAPI,
         callPutAttendanceManageAPI } from '../../apis/AttendanceManageAPICalls';
import AttendanceOneManageCSS from './AttendanceOneManage.module.css';

function AttendanceOneManage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(state => state.attendanceManageReducer);  
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  const [form, setForm] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const params = useParams();
  const attendance = member.data;
  
  console.log("member : {} ", member);
  console.log("id", params);
  console.log("attendance : {} ", attendance && attendance);
 
  useEffect(
    () => {    
        console.log('token', token.sub);
            dispatch(callGetAttendanceOneAPI({
                id: params.id
            }));            
      }
    ,[]
  );

  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      id: attendance.id,
      title: attendance.title
    });
  }

  const onChangeHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  };

  const onClickAttendanceOneUpdateHandler = () => {

    dispatch(callPutAttendanceManageAPI({
        form: form
    }));         

    alert('사원의 근태 정보를 수정하였습니다.');
    navigate(`/management/manageAttendance/${ attendance.member && Array.isArray(attendance.member) && attendance.member.memberId }`, {replace: true});
  }

  const onClickBackHandler = () => {
        
    navigate(-1);
  }

  return (
    <>
      <div 
        className={ AttendanceOneManageCSS.backgroundDiv}
        style={ { backgroundColor: 'white' } }
        >
      <div className={ AttendanceOneManageCSS.profileDiv }>
        {!modifyMode && <h1 className= {AttendanceOneManageCSS.profileheader}>{ attendance?.member?.memberId }
        사원 { attendance?.attendanceDate } 일자 근태 조회</h1>}
        {modifyMode && <h1 className= {AttendanceOneManageCSS.profileheader}>{ attendance?.member?.memberId }
        사원 { attendance?.attendanceDate } 일자 근태 수정</h1>}
                  <span>
                    <div>근무 일자 : </div>
                    <input 
                      name='attendanceDate'
                      value={ attendance && attendance.attendanceDate || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>근무 상태 : </div>
                    <input 
                      name='title'
                      placeholder='근무 상태'
                      value={ (!modifyMode ? attendance && attendance.title : form.title) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>출근 시각 : </div>
                    <input 
                      name='start'
                      value={ attendance && attendance.start || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>퇴근 시각 : </div>
                    <input 
                      name='end'
                      value={ attendance && attendance.end || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>근무 시간 : </div>
                    <input 
                      name='attendanceHour'
                      value={ attendance && attendance.attendanceHour || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>초과 근무 시간 : </div>
                    <input 
                      name='attendanceOvertime'
                      value={ attendance && attendance.attendanceOvertime || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
            {!modifyMode &&
                <button       
                onClick={ onClickModifyModeHandler }             
                >
                수정모드
                </button>
            }
            {modifyMode &&
                <button       
                onClick={ onClickAttendanceOneUpdateHandler }             
                >
                수정 저장하기
                </button>
            }
          </div>
          <button
              className={ AttendanceOneManageCSS.memberImageButton }
              onClick = { onClickBackHandler }
          >
          돌아가기
          </button>
      </div>
      </>
  );
}

export default AttendanceOneManage;