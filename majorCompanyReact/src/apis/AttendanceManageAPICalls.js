import { GET_ATTENDANCE_DATE,
    GET_ATTENDANCE_ONE,
    PUT_ATTENDANCE_UPDATE } from "../modules/AttendanceManageModule";

export const callGetAttendanceDateAPI = ({attendanceDate}) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/attendance/${attendanceDate}`;

return async (dispatch,getState) => {

const result = await fetch(requestURL, {
  method: "GET",
  headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
  }
})
.then(Response => Response.json());

console.log('[AttendanceManageAPICalls] callGetAttendanceDateAPI REST : ', result);

dispatch({ type: GET_ATTENDANCE_DATE, payload: result});

};
}

export const callPutAttendanceManageAPI = ({form}) => {
console.log('[AttendanceManageAPICalls] callPutAttendanceManageAPI Call');

const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/attendance/update`;

return async (dispatch, getState) => {

const result = await fetch(requestURL, {
  method: "PUT",
  headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
  },
  body: JSON.stringify({
      id : form.id,
      title : form.title
  })
})
.then(response => response.json());

console.log('[AttendanceManageAPICalls] callPutAttendanceManageAPI RESULT : ', result);

dispatch({ type: PUT_ATTENDANCE_UPDATE,  payload: result });

};    
}

export const callGetAttendanceOneAPI = ({id}) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/attendance/list/${id}`;
console.log("오시나용?");
return async (dispatch,getState) => {

   const result = await fetch(requestURL, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
      }
  })
  .then(Response => Response.json());

  console.log('[AttendanceManageAPICalls] callGetAttendanceOneAPI REST : ', result);

  dispatch({ type: GET_ATTENDANCE_ONE, payload: result});
  
};
}