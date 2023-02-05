
import {
    GET_ALL_RETIRED_MEMBERS,
    POST_RETIRED_PAYMENT,
    GET_RETIRED_MEMBER,
    POST_RETIRED_PAYMENT_OKAY,
    PUT_MEMBER_ENT,
    PUT_MEMBER_ENT_BACK
} from '../modules/RetiredPaymentModule';

export const callGetAllRetiredMembersAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callGetAllRetiredMembersAPI RESULT : ', result);

        dispatch({ type: GET_ALL_RETIRED_MEMBERS, payload: result});

    };
}

export const callGetRetiredMemberAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callGetRetiredMemberAPI RESULT : ', result);

        dispatch({ type: GET_RETIRED_MEMBER, payload: result});

    };
}

export const callRetirePaymentRequestAPI = ({form}) => {
    console.log('[RetiredAPICalls] callRetirePaymentRequestAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired/request`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                memberRtPayment: form.memberRtPayment
            })
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callRetirePaymentRequestAPI RESULT : ', result);

        dispatch({ type: POST_RETIRED_PAYMENT,  payload: result });
        
    };    
}

export const callRetirePaymentOkayAPI = ({form}) => {
    console.log('[RetiredAPICalls] callRetirePaymentOkayAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired/payOkay`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                memberRtStatus: form.memberRtStatus
            })
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callRetirePaymentOkayAPI RESULT : ', result);

        dispatch({ type: POST_RETIRED_PAYMENT_OKAY,  payload: result });
        
    };    
}

export const callMemberRetireAPI = ({form}) => {
    console.log('[RetiredAPICalls] callMemberRetireAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired/member`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                memberEnt: form.memberEnt,
                memberLeave: form.memberLeave
            })
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callMemberRetireAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER_ENT,  payload: result });
        
    };    
}

export const callMemberRetireCancelAPI = ({form}) => {
    console.log('[RetiredAPICalls] callMemberRetireCancelAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/retired/cancel`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                memberEnt: form.memberEnt,
                memberLeave: form.memberLeave,
                memberRtStatus: form.memberRtStatus,
                memberRtPayment: form.memberRtPayment
            })
        })
        .then(response => response.json());

        console.log('[RetiredAPICalls] callMemberRetireCancelAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER_ENT_BACK,  payload: result });
        
    };    
}