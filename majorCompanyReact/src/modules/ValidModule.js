import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERINFO     = 'member/GET_MEMBERINFO';

const actions = createActions({
    [GET_MEMBERINFO]: () => {},

});

/* 리듀서 */
const validReducer = handleActions(
    {
        [GET_MEMBERINFO]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default validReducer;