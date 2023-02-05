import Calendar from './Calendar';
import { callPostAttendanceAPI, callPutAttendanceAPI } from '../../apis/AttendanceAPICalls';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import AttendanceCSS from './Attendance.module.css';

function Attendance() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  
  const [form, setForm] = useState({
    memberId: token.sub
  });

  const onClickPostAttendanceHandler = () => {
    console.log('[Attendance] Post Attendance event Started!!');

    dispatch(callPostAttendanceAPI({	
      form: form
    }));      
    
    navigate(`/mypage/profile`, { replace: true });        
  };

  const onClickPutAttendanceHandler = () => {
    console.log('[Attendance] Put Attendance event Started!!');

    dispatch(callPutAttendanceAPI({	
      form: form
    }));      
    
    navigate(`/mypage/profile`, { replace: true });        
  };

  const onClickBackHandler = () => {
        
    navigate(-1);
  }

  return (
    <div className="App">
      <div className= {AttendanceCSS.profileheader}><h2>나의 근태 조회</h2></div>
      <button
            className={ AttendanceCSS.memberImageButton }
            style={ {border: 'none', margin: 0, fontSize: '20px', height: '20px' } }
            onClick = { onClickPostAttendanceHandler }
            >
            출근
            </button>
      <button
            className={ AttendanceCSS.memberImageButton }
            style={ {border: 'none', margin: 0, fontSize: '20px', height: '20px' } }
            onClick = { onClickPutAttendanceHandler }
            >
            퇴근
            </button>
      <button
            className={ AttendanceCSS.memberImageButton }
            style={ {border: 'none', margin: 0, fontSize: '20px', height: '20px' } }
            onClick = { onClickBackHandler }
            >
            돌아가기
      </button>
      <div style={{border: 'none', margin: 2}}>
      <hr/>
      <Calendar/>
      </div>
    </div>
  );
}

export default Attendance;