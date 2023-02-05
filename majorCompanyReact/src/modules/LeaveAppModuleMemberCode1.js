import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_LEAVEAPPMEMBERCODE1  = 'leaveapp/GET_LEAVEAPPMEMBERCODE1';

const actions = createActions({
    [GET_LEAVEAPPMEMBERCODE1]: () => {},
});

/* 리듀서 */
const leaveAppMemberCode1Reducer = handleActions(
    {
        [GET_LEAVEAPPMEMBERCODE1]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);


export default leaveAppMemberCode1Reducer;