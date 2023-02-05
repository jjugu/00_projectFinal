import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_LEAVEAPPMEMBERCODE2  = 'leaveapp/GET_LEAVEAPPMEMBERCODE2';

const actions = createActions({
    [GET_LEAVEAPPMEMBERCODE2]: () => {},
});

/* 리듀서 */
const leaveAppMemberCode2Reducer = handleActions(
    {
        [GET_LEAVEAPPMEMBERCODE2]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);


export default leaveAppMemberCode2Reducer;