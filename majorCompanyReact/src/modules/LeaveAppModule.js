import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_LEAVEAPP            = 'leaveapp/GET_LEAVEAPP';
export const POST_LEAVEAPP           = 'leaveapp/POST_LEAVEAPP';
export const PUT_LEAVEAPP            = 'leaveapp/PUT_LEAVEAPP';
export const GET_LEAVEAPPMEMBERCODE  = 'leaveapp/GET_LEAVEAPPMEMBERCODE';

const actions = createActions({
    [GET_LEAVEAPP]: () => {},
    [POST_LEAVEAPP]: () => {},
    [PUT_LEAVEAPP]: () => {},
    [GET_LEAVEAPPMEMBERCODE]: () => {}

});

/* 리듀서 */
const leaveAppReducer = handleActions(
    {
        [GET_LEAVEAPP]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LEAVEAPP]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_LEAVEAPP]: (state, { payload }) => {
            
            return payload;
        },
        [GET_LEAVEAPPMEMBERCODE]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default leaveAppReducer;