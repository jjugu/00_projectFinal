import AttendanceCSS from './Attendance.module.css';
import { NavLink } from 'react-router-dom';

function AttendanceDate({prop : {start, end, attendanceHour, attendanceOvertime,
                                 member, attendanceDate, title}}) {

  return (
    <span style={{marginTop:'20px'}} className={AttendanceCSS.memberImageButton}>
        <NavLink to={"/management/manageAttendance/" + member.memberId}>
        <ul>
            <li className={ AttendanceCSS.registerDiv2 }>근무자 ID : {member.memberId} | 근무일자 : {attendanceDate} | 근무상태 : {title}</li> 
            <li className={ AttendanceCSS.registerDiv2 }>출근시각 : {start} | 퇴근시각 : {end}</li> 
            <li className={ AttendanceCSS.registerDiv2 }>근무시간 : {attendanceHour} | 초과 근무 시간 : {attendanceOvertime}</li> 
        </ul>
        </NavLink>
    </span>
  );
}
export default AttendanceDate;