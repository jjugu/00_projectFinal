import { GET_ATTENDANCE_EMP,
    POST_ATTENDANCE,
    PUT_ATTENDANCE     } from "../modules/AttendanceModule";

export const callGetAttendanceEmpListAPI = ({memberId}) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/attendance/${memberId}`;

return async (dispatch,getState) => {
   
   const result = await fetch(requestURL, {
       method: "GET",
       headers: {
           "Content-Type": "application/json",
           "Accept": "*/*"
       }
   })
   .then(Response => Response.json());

   console.log('[AttendanceAPICalls] callGetAttendanceEmpListAPI REST : ', result);
   
   dispatch({ type: GET_ATTENDANCE_EMP, payload: result});
};
}

export const callPostAttendanceAPI = ({form}) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/attendance`;

return async (dispatch, getState) => {

   const result = await fetch(requestURL, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           "Accept": "*/*",
           "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
       },
       body: JSON.stringify({          
           memberId : form.memberId
       })
   })
   .then(response => response.json());

   console.log('[AttendanceAPICalls] callPostAttendanceAPI RESULT : ', result);

   if(result.data === "출근 등록 실패"){
      alert('오늘은 이미 출근 등록이 완료되었습니다.');
   } else if(result.data === "퇴사자 출근 등록 불가") {
      alert('퇴사자는 출근 등록이 불가능 합니다.'); 
   } else {
     alert('출근 등록이 완료되었습니다.'); 
   }

   dispatch({ type: POST_ATTENDANCE,  payload: result });
   
};
}

export const callPutAttendanceAPI = ({form}) => {
console.log('[AttendanceAPICalls] callPutAttendanceAPI Call');

const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/attendance`;

return async (dispatch, getState) => {

   const result = await fetch(requestURL, {
       method: "PUT",
       headers: {
           "Content-Type": "application/json",
           "Accept": "*/*",
           "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
       },
       body: JSON.stringify({
           memberId : form.memberId
       })
   })
   .then(response => response.json());

   console.log('[AttendanceAPICalls] callPutAttendanceAPI RESULT : ', result);

   if(result.data === "퇴근 시간 등록 실패"){
    alert('오늘은 이미 퇴근 등록이 완료되었습니다.');
    } else if(result.data === "퇴사자 퇴근 등록 불가") {
    alert('퇴사자는 퇴근 등록이 불가능 합니다.'); 
    } else {
   alert('퇴근 등록이 완료되었습니다.'); 
    }

   dispatch({ type: PUT_ATTENDANCE,  payload: result });
   
};    
}