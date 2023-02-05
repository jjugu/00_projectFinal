
import {
    GET_SALARY_LIST,
    GET_ALL_MEMBER_SALARY,
    GET_ALL_SALARY_REQUEST
} from '../modules/SalaryModule';

export const callGetSalaryAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/list/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[SalaryAPICalls] callGetSalaryAPI RESULT : ', result);

        dispatch({ type: GET_SALARY_LIST, payload: result});

    };
}

export const callGetAllMemberSalaryAPI = () => {
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

        console.log('[SalaryAPICalls] callGetAllMemberSalaryAPI RESULT : ', result);

        dispatch({ type: GET_ALL_MEMBER_SALARY, payload: result});

    };
}

export const callGetAllSalaryRequestAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/salary/list`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[SalaryAPICalls] callGetAllSalaryRequestAPI RESULT : ', result);

        dispatch({ type: GET_ALL_SALARY_REQUEST, payload: result});

    };
}




