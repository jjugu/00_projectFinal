

import { stringify } from 'query-string';
import {
    GET_FREECP,
    POST_FREE,
    GET_FREEDT,
    PUT_FREE,
    DELETE_FREE
} from '../modules/FreeModule.js';


export const callFreeListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/list?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/list`
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
          console.log('[FreeAPICalls] callFreeAPI RESULT : ', result);
          dispatch({ type: GET_FREECP,  payload: result.data });
      };
    };
}

export const callFreeRegistAPI = ({form}) => {


    console.log('[FreeAPICalls] callFreeRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/post`;

    return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            
        },
        body: JSON.stringify({
            boardTitle: form.boardTitle,
            boardContent: form.boardContent,
            memberCode: form.memberCode
        })
      })
      .then(response => response.json());

      console.log('[FreeAPICalls] callFreeRegistAPI RESULT : ', result);

      if(result.status === 201){
          dispatch({ type: POST_FREE, payload: result });
      }
    };
};

export const callFreeDetailAPI = ({boardNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/${boardNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        
        if(result.status === 200){
            console.log('[FreeAPICalls] callFreeDetailAPI RESULT : ', result);
            dispatch({ type: GET_FREEDT, payload: result.data });
        }
    };
}

export const callFreeUpdateAPI = ({form}) => {
    console.log('[FreeAPICalls] callFreeUpdateAPI Call', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/update`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },

            body: JSON.stringify({
                boardNo: form.boardNo,
                boardTitle: form.boardTitle,
                boardContent: form.boardContent
            })
            
        })
        .then(response => response.json());

        console.log('[FreeAPICalls] callFreeUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_FREE, payload: result });
    };
}

export const callFreeDeleteAPI = ({form, location}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/${location}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                boardNo: form.boardNo,
                boardTitle: form.boardTitle,
                boardContent: form.boardContent
            })
        })
            .then(response => response.json());

        console.log('[FreeAPICalls] callFreeDeleteAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[FreeAPICalls] callFreeDeleteAPI RESULT : ', result);
            dispatch({ type: DELETE_FREE, payload: result.data });
        }
    };
}