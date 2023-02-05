import AttendanceCSS from './Attendance.module.css';
import { NavLink } from 'react-router-dom';

function AttendanceList({prop : {id, title, attendanceDate, start, end, attendanceHour, attendanceOvertime}}) {

  return (
    <>
      <span style={{marginTop:'20px'}} className={AttendanceCSS.memberImageButton}>
        <NavLink to={"/management/manageAttendance/list/" + id}>
          <li className={ AttendanceCSS.registerDiv2 }>근무일자 : {attendanceDate} | 근무상태 : {title}</li> 
          <li className={ AttendanceCSS.registerDiv2 }>출근시각 : {start} | 퇴근시각 : {end}</li> 
          <li className={ AttendanceCSS.registerDiv2 }>근무시간 : {attendanceHour} | 초과 근무 시간 : {attendanceOvertime}</li> 
        </NavLink>
      </span>
    </>
  );
}
export default AttendanceList;