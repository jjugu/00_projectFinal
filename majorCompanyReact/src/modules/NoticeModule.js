import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_NOTICECP     = 'noticecp/GET_NOTICECP';
export const POST_NOTICE      = 'notice/POST_NOTICE';
export const GET_NOTICEDT     = 'noticedt/GET_NOTICEDT';
export const PUT_NOTICE       = 'notice/PUT_NOTICE';
export const DELETE_NOTICE    = 'notice/DELETE_NOTICE';

const actions = createActions({
    [GET_NOTICECP]: () => {},
    [POST_NOTICE]: () => {},
    [GET_NOTICEDT]: () => {},
    [PUT_NOTICE]: () => {},
    [DELETE_NOTICE]: () => {}
});

/* 리듀서 */
const noticeReducer = handleActions(
  {
    [GET_NOTICECP]: (state, { payload }) => {
      return payload;
    },
    [POST_NOTICE]: (state, { payload }) => {
      return payload;
    },
    [GET_NOTICEDT]: (state, { payload}) => {
      return payload;
    },
    [PUT_NOTICE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_NOTICE]: (state, { payload }) => {
      return payload;
    }
  },
  initialState

);

export default noticeReducer;