import React, { createContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import './Calendar.css';
import { callGetAttendanceEmpListAPI } from '../../apis/AttendanceAPICalls';
import EmpAttendance from '../../components/empAttendance/EmpAttendance';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {

    const dispatch = useDispatch();
    const member = useSelector(state => state.attendanceReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const attendanceList = member.data;
    console.log("attendanceList : {} ", attendanceList && attendanceList[0].attendance);

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

  return (
    <div style={{width:'950px'}}>
      <FullCalendar 
          initialView='dayGridMonth'
          locale='ko'
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          contentHeight={600}
          expandRows={true}
          slotMinTime='00:00'
          slotMaxTime='24:00'
          fixedWeekCount={false}
          showNonCurrentDates={true}
          navLinks={true}
          nowIndicator={true}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth dayGridWeek timeGridDay",
          }}
          views={["dayGridMonth", "dayGridWeek", "timeGridPlugin"]}
          eventTextColor='black'
          events= {
            Array.isArray(attendanceList) && attendanceList[0].attendance.filter(
              (empAttendance) => <EmpAttendance key={empAttendance.id} prop={empAttendance}></EmpAttendance>
            )
          }
      />
    </div>
  );
}

export default Calendar;