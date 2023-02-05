import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FREECP     = 'freecp/GET_FREECP';
export const POST_FREE      = 'free/POST_FREE';
export const GET_FREEDT     = 'freedt/GET_FREEDT';
export const PUT_FREE       = 'free/PUT_FREE';
export const DELETE_FREE    = 'free/DELETE_FREE'

const actions = createActions({
    [GET_FREECP]: () => {},
    [POST_FREE]: () => {},
    [GET_FREEDT]: () => {},
    [PUT_FREE]: () => {},
    [DELETE_FREE]: () => {}
});

/* 리듀서 */
const freeReducer = handleActions(
  {
    [GET_FREECP]: (state, { payload }) => {
        return payload;
    },
    [POST_FREE]: (state, { payload }) => {
        return payload;
    },
    [GET_FREEDT]: (state, { payload }) => {
        return payload;
    },
    [PUT_FREE]: (state, { payload }) => {
        return payload;
    },
    [DELETE_FREE]: (state, { payload }) => {
        return payload;
    }
  },
  initialState

);

export default freeReducer;