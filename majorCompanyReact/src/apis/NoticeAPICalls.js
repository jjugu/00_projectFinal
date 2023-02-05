

import { stringify } from 'query-string';
import {
    GET_NOTICECP,
    POST_NOTICE,
    GET_NOTICEDT,
    PUT_NOTICE,
    DELETE_NOTICE

} from '../modules/NoticeModule.js';

export const callNoticeListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/list?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/list`
    }

    console.log('[NoticeAPICalls] requestURL : ', requestURL);

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
          console.log('[NoticeAPICalls] callNoticeAPI RESUTL : ', result);
          dispatch({ type: GET_NOTICECP,  payload: result.data });
      };
    };
}

export const callNoticeRegistAPI = ({form}) => {

    console.log('[NoticeAPICalls] callNoticeRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/post`;

    return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        body: JSON.stringify({
            noticeTitle: form.noticeTitle,
            noticeContent: form.noticeContent,
            memberCode: form.memberCode
        })
      })
      .then(response => response.json());

      console.log('[NoticeAPICalls] callNoticeRegistAPI RESULT : ', result);

      if(result.status === 201){
          dispatch({ type: POST_NOTICE, payload: result });
      }
    };
};

export const callNoticeDetailAPI = ({noticeNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/${noticeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[NoticeAPICalls] callNoticeDetailAPI RESULT : ', result);
            dispatch({ type: GET_NOTICEDT, payload: result.data });
        }
    };
}

export const callNoticeUpdateAPI = ({form}) => {
    console.log('[NoticeAPICalls] callNoticeUpdateAPI Call', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/update`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },

            body: JSON.stringify({
                noticeNo: form.noticeNo,
                noticeTitle: form.noticeTitle,
                noticeContent: form.noticeContent
            })
            
        })
        .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_NOTICE, payload: result });
    };
}  

export const callNoticeDeleteAPI = ({form, location}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/notice/${location}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                noticeNo: form.noticeNo,
                noticeTitle: form.noticeTitle,
                noticeContent: form.noticeContent
            })
        })
            .then(response => response.json());

        console.log('[NoticeAPICalls] callNoticeDeleteAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[NoticeAPICalls] callNoticeDeleteAPI RESULT : ', result);
            dispatch({ type: DELETE_NOTICE, payload: result.data });
        }
    };
}