
import { 
    GET_LEAVEAPP,
    POST_LEAVEAPP,
    PUT_LEAVEAPP,
    GET_LEAVEAPPMEMBERCODE
} from '../modules/LeaveAppModule.js';

import { 
    GET_LEAVEAPPMEMBERCODE1
} from '../modules/LeaveAppModuleMemberCode1';

import { 
    GET_LEAVEAPPMEMBERCODE2
} from '../modules/LeaveAppModuleMemberCode2';

export const callLeaveAppDetailForAdminAPI = ({leaveappNo}) => {
    console.log("callLeaveAppDetailForAdminAPI", leaveappNo);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-management/${leaveappNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[LeaveAppAPICalls] callLeaveAppDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[LeaveAppAPICalls] callLeaveAppDetailAPI SUCCESS');
            dispatch({ type: GET_LEAVEAPP,  payload: result.data });
        }

        
    };
}

export const callLeaveAppWriteAPI = ({form}) => {
    console.log('[LeaveAppAPICalls] callLeaveAppWriteAPI Call {}', form);

    const requestURL = `http://localhost:8080/api/v1/leaveApp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                leaveappTitle: form.leaveappTitle,
                leaveappContent: form.leaveappContent,
                leaveappStart: form.leaveappStart,
                leaveappEnd: form.leaveappEnd,
                leaveappStatus: form.leaveappStatus,
                reportlineDate: form.reportlineDate,
                leavedocumentCat: form.leavedocumentCat,
                memberCode: form.memberCode,
                memberCode1: form.memberCode1,
                memberCode2: form.memberCode2
            })
        })
        .then(response => response.json());

        console.log('[LeaveAppAPICalls] callLeaveAppWriteAPI RESULT : ', result);

        dispatch({ type: POST_LEAVEAPP,  payload: result });
        
    };    
}

export const callLeaveAppUpdateAPI = ({form}) => {
    console.log('[LeaveAppAPICalls] callLeaveAppUpdateAPI Call {}', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                leaveappNo: form.leaveappNo,
                leaveappTitle: form.leaveappTitle,
                leaveappContent: form.leaveappContent,
                leaveappStart: form.leaveappStart,
                leaveappEnd: form.leaveappEnd,
                leaveappStatus: form.leaveappStatus,
                reportlineDate: form.reportlineDate,
                leavedocumentCat: form.leavedocumentCat,
                memberCode: form.memberCode,
                holiday: form.holiday
            })
        })
        .then(response => response.json());

        console.log('[LeaveAppAPICalls] callLeaveAppUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_LEAVEAPP,  payload: result });
        
    };    
}

// 기안자 == 로그인 한 멤버코드 일 경우
export const callLeaveAppMemberCodeListAPI = ({currentPage, memberCode}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode?offset=${currentPage}&code=${memberCode}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode`;
    }
    
    console.log('[LeaveAppAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[LeaveAppAPICalls] callLeaveAppListAPI RESULT : ', result);
            dispatch({ type: GET_LEAVEAPPMEMBERCODE,  payload: result.data });
        }
        
    };

    
}

// 결재자1 == 로그인 한 멤버코드 일 경우
export const callLeaveAppMemberCode1ListAPI = ({currentPage, memberCode}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode1?offset=${currentPage}&code=${memberCode}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode1`;
    }
    
    console.log('[LeaveAppAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[LeaveAppAPICalls] callLeaveAppListAPI1 RESULT : ', result);
            dispatch({ type: GET_LEAVEAPPMEMBERCODE1,  payload: result.data });
        }
        
    };

    
}
// 결재자2 == 로그인 한 멤버코드 일 경우
export const callLeaveAppMemberCode2ListAPI = ({currentPage, memberCode}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode2?offset=${currentPage}&code=${memberCode}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/leaveApp-memberCode2`;
    }
    
    console.log('[LeaveAppAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[LeaveAppAPICalls] callLeaveAppListAPI2 RESULT : ', result);
            dispatch({ type: GET_LEAVEAPPMEMBERCODE2,  payload: result.data });
        }
        
    };

    
}