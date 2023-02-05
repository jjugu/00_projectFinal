import { stringify } from 'query-string';
import {
  GET_COMENT,
  POST_COMMENT,
  PUT_COMMENT,
  DELETE_COMMENT
} from '../modules/CommentModule.js';

export const callCommentListAPI = ({commentNo, currentPage}) => {
  
    let requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/${commentNo}/comment?offset=${currentPage}`;

    console.log('[CommentAPICalls] requestURL : ', requestURL);
    
    return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      }
    })
    .then(Response => Response.json());

    if(result.status ===200){
      console.log('CommentAPICalls] callCommentAPI RESULT', result);
      dispatch({ type: GET_COMENT, payload: result});
    }
  };
}

export const callCommentRegistAPI = ({form}) => {

    console.log('[CommentAPICalls] callCommentRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/comment/post`;

    return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          
      },
      body: JSON.stringify({
          boardNo: form.boardNo,
          commentContent: form.commentContent,
          memberCode: form.memberCode,
          memberName: form.memberName
      })
    })
    .then(response => response.json());

    console.log('[CommentAPICalls] callCommentRegistAPI RESULT : ', result);

    if(result.status === 201){
        dispatch({ type: POST_COMMENT, payload: result });
    }
  };
};

export const callCommentUpdateAPI = ({form}) => {

    console.log('[CommentAPICalls] callCommentUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/comment/update`;

    return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
          },
          body: JSON.stringify({
              boardNo: form.boardNo,
              commentNo: form.commentNo,
              commentContent: form.commentContent
          })
      })
      .then(response => response.json());

      console.log('[CommentAPICalls] callCommentUpdateAPI RESULT : ', result);

      dispatch({ type: PUT_COMMENT,  payload: result });
      
  };    
}

export const callCommentDeleteAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/board/free/comment/delete`;
    // console.log("APIIIIIIIIIIIIIIIIII", form)
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {

          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
          body: JSON.stringify({
              commentNo: form
          })
      })
          .then(response => response.json());
      if(result.status === 200){
          console.log('[CommentAPICalls] callCommentUpdateAPI RESULT : ', result);
          dispatch({ type: DELETE_COMMENT, payload: result.data });
      }
    };
}