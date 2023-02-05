
import { 
    GET_MEMBER
  , POST_LOGIN
  , POST_REGISTER
  , PUT_MEMBER
} from '../modules/MemberModule';

import { 
    GET_MEMBERLIST
} from '../modules/MemberListModule';

import {
    GET_MEMBERINFO
} from '../modules/ValidModule';

export const callGetMemberAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/${memberId}`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

        dispatch({ type: GET_MEMBER,  payload: result });
        
    };
}

export const callLoginAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;

    return async (dispatch, getState) => {

        /* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
        /* 서버에서 cors 허용을 해주어야 함 */
        /* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"      
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPw: form.memberPw
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if(result.status === 200){
            window.localStorage.setItem('accessToken', result.data.accessToken);            
        }
        dispatch({ type: POST_LOGIN,  payload: result });
        
    };
}


export const callLogoutAPI = () => {
    

    return async (dispatch, getState) => {            

        dispatch({ type: POST_LOGIN,  payload: '' });        
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}


export const callRegisterAPI = ({form}) => {
    console.log("callRegisterAPI", form);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/signup`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPw: form.memberPw,
                memberName: form.memberName,
                memberEmail: form.memberEmail,
                memberBirth: form.memberBirth,
                memberTel: form.memberTel,
                memberAddress: form.memberAddress,
                memberGrade: form.memberGrade,
                memberDep: form.memberDep,
                memberRtStatus: form.memberRtStatus,
                memberRtPayment:form.memberRtPayment,
                memberEnt: form.memberEnt,
                memberRemanet: form.memberRemanet,
                memberSalaryBonus: form.memberSalaryBonus,
                memberFile: form.memberFile
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }        
    };
}

export const callgetAllMemberListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callgetAllMemberListAPI RESULT : ', result);

        dispatch({ type: GET_MEMBERLIST, payload: result});

    };
}

export const ValidMemberIdAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/validId/${memberId}`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] ValidMemberIdAPI RESULT : ', result);

        dispatch({ type: GET_MEMBERINFO,  payload: result });
        
    };
}

export const callMemberUpdateAPI = ({form}) => {
    console.log('★★★★★[MemberAPICalls] callMemberUpdateAPI Call', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMemberUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER,  payload: result });
        
    };    
}