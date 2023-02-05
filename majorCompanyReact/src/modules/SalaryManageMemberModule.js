import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_ALL_MEMBER_SALARY  = 'salary/GET_ALL_MEMBER_SALARY';
export const PUT_RE_REQUEST_SALARY  = 'salary/PUT_RE_REQUEST_SALARY';

const actions = createActions({
    [GET_ALL_MEMBER_SALARY]: () => {},
    [PUT_RE_REQUEST_SALARY]: () => {}
});

const manageMemberSalaryReducer = handleActions(
    {
        [GET_ALL_MEMBER_SALARY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_RE_REQUEST_SALARY]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default manageMemberSalaryReducer;






