import { GET_EMP_ALL_LIST,
         GET_EMP_ONE,
         PUT_EMP_ONE       } from "../modules/MemberManagementModule";

export const callGetEmpOneAPI = ({memberCode}) => {
console.log("callGetEmpOneAPI", memberCode);
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/list/${memberCode}`;

return async (dispatch,getState) => {
   
   const result = await fetch(requestURL, {
       method: "GET",
       headers: {
           "Content-Type": "application/json",
           "Accept": "*/*"
       }
   })
   .then(Response => Response.json());

   console.log('[MemberManageAPICalls] callGetEmpOneAPI REST : ', result);

   if(result.status === 200){
       console.log('[MemberManageAPICalls] callLeaveAppDetailAPI SUCCESS');
       dispatch({ type: GET_EMP_ONE,  payload: result.data });
   }
};
}

export const callPutEmpOneAPI = ({form}) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/list/update`;

return async (dispatch,getState) => {
   
   const result = await fetch(requestURL, {
       method: "PUT",
       headers: {
           "Accept": "*/*",
           "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
       },
       body: form
   })
   .then(response => response.json());

   console.log('[MemberManageAPICalls] callPutEmpOneAPI REST : ', result);

   dispatch({ type: PUT_EMP_ONE, payload: result});
   
};
}

export const callGetEmpAllListAPI = ({currentPage}) => {

let requestURL;

if(currentPage !== undefined || currentPage !== null) {
   requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/list/paging?offset=${currentPage}`;
}else {
   requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/management/list/paging`
}

console.log('[FreeAPICalls] requestURL : ', requestURL);

return async (dispatch, getState) => {

 const result = await fetch(requestURL, {
     method: "GET",
     headers: {
         "Content-Type": "application/json",
         "Accept": "*/*"
     }
 })
 .then(response => response.json());
 if(result.status === 200) {
     console.log('[MemberManageAPICalls] callGetEmpAllListAPI RESULT : ', result);
     dispatch({ type: GET_EMP_ALL_LIST,  payload: result.data });
 };
};
}