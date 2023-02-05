
import {
    GET_MANAGE_SALARY_LIST,
    GET_ALL_MEMBER_MANAGE_SALARY,
    POST_SALARY_REQUEST,
    PUT_OKAY_GIVE_SALARY,
    PUT_REJECT_SALARY
} from '../modules/SalaryManageModule';

export const callGetSalaryManageAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/memberList/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callGetSalaryManageAPI RESULT : ', result);

        dispatch({ type: GET_MANAGE_SALARY_LIST, payload: result});

    };
}

export const callGetAllMemberManageSalaryAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/memberList`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callGetAllMemberManageSalaryAPI RESULT : ', result);

        dispatch({ type: GET_ALL_MEMBER_MANAGE_SALARY, payload: result});

    };
}

export const callSalaryRequestAPI = ({form}) => {
    console.log('[SalaryManageAPICalls] callSalaryRequestAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/give`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                salaryBasic: form.salaryBasic,
                salaryBonus: form.salaryBonus
            })
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callSalaryRequestAPI RESULT : ', result);

        dispatch({ type: POST_SALARY_REQUEST,  payload: result });
        
    };    
}

export const callOkayGiveSalaryAPI = ({form}) => {
    console.log('[SalaryManageAPICalls] callOkayGiveSalaryAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/okay`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                salaryCode: form.salaryCode,
                salaryStatus: form.salaryStatus
            })
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callOkayGiveSalaryAPI RESULT : ', result);

        dispatch({ type: PUT_OKAY_GIVE_SALARY,  payload: result });
        
    };    
}

export const callRejectSalaryRequestAPI = ({form}) => {
    console.log('[SalaryManageAPICalls] callRejectSalaryRequestAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/reject`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                salaryCode: form.salaryCode,
                salaryStatus: form.salaryStatus,
                salaryRejectReason: form.salaryRejectReason
            })
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callRejectSalaryRequestAPI RESULT : ', result);

        dispatch({ type: PUT_REJECT_SALARY,  payload: result });
        
    };    
}

