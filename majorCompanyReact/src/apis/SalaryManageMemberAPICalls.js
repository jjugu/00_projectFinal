
import {
    GET_ALL_MEMBER_MANAGE_SALARY
} from '../modules/SalaryManageModule';

import { 
    PUT_RE_REQUEST_SALARY
} from '../modules/SalaryManageMemberModule';

export const callGetMemberManageSalaryAPI = ({memberId}) => {
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

        console.log('[SalaryManageMemberAPICalls] callGetAllMemberManageSalaryAPI RESULT : ', result);

        dispatch({ type: GET_ALL_MEMBER_MANAGE_SALARY, payload: result});

    };
}

export const callReRequestSalaryAPI = ({form}) => {
    console.log('[SalaryManageAPICalls] callReRequestSalaryAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/rejectedOne`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                salaryCode: form.salaryCode,
                salaryStatus: form.salaryStatus,
                salaryBasic: form.salaryBasic,
                salaryBonus: form.salaryBonus
            })
        })
        .then(response => response.json());

        console.log('[SalaryManageAPICalls] callReRequestSalaryAPI RESULT : ', result);

        dispatch({ type: PUT_RE_REQUEST_SALARY,  payload: result });
        
    };    
}
