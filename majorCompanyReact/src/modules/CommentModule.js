import { createActions, handleActions  } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_COMENT       ='commentcp/GET_COMMENT';
export const POST_COMMENT     ='comment/POST_COMMENT';
export const PUT_COMMENT      ='comment/PUT_COMMENT';
export const DELETE_COMMENT   ='comment/DELETE_COMMENT';

const actions = createActions({
  [GET_COMENT]:     () => {},
  [POST_COMMENT]:   () => {},
  [PUT_COMMENT]:    () => {},
  [DELETE_COMMENT]: () => {}
})

/* 리듀서 */
const commentReducer = handleActions(
  {
    [GET_COMENT]:      (state, { payload }) => {
      return payload;
    },
    [POST_COMMENT]:    (state, { payload }) => {
      return payload;
    },
    [PUT_COMMENT]:     (state, { payload }) => {
      return payload;
    },
    [DELETE_COMMENT]:  (state, { payload }) => {
      return payload;
    }
  },
  initialState
);
export default commentReducer;