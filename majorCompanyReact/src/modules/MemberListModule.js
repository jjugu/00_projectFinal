import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERLIST     = 'member/GET_MEMBERLIST';

const actions = createActions({
    [GET_MEMBERLIST]: () => {},

});

/* 리듀서 */
const memberListReducer = handleActions(
    {
        [GET_MEMBERLIST]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default memberListReducer;