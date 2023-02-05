import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_MANAGE_SALARY_LIST        = 'salary/GET_MANAGE_SALARY_LIST';
export const GET_ALL_MEMBER_MANAGE_SALARY  = 'salary/GET_ALL_MEMBER_MANAGE_SALARY';
export const POST_SALARY_REQUEST           = 'salary/POST_SALARY_REQUEST';
export const PUT_OKAY_GIVE_SALARY          = 'salary/PUT_OKAY_GIVE_SALARY';
export const PUT_REJECT_SALARY             = 'salary/PUT_REJECT_SALARY';
export const PUT_RE_REQUEST_SALARY         = 'salary/PUT_RE_REQUEST_SALARY';

const actions = createActions({
    [GET_MANAGE_SALARY_LIST]: () => {},
    [GET_ALL_MEMBER_MANAGE_SALARY]: () => {},
    [POST_SALARY_REQUEST]: () => {},
    [PUT_OKAY_GIVE_SALARY]: () => {},
    [PUT_REJECT_SALARY]: () => {},
    [PUT_RE_REQUEST_SALARY]: () => {}
});

const manageSalaryReducer = handleActions(
    {
        [GET_MANAGE_SALARY_LIST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ALL_MEMBER_MANAGE_SALARY]: (state, { payload }) => {
            
            return payload;
        },
        [POST_SALARY_REQUEST]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_OKAY_GIVE_SALARY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_REJECT_SALARY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_RE_REQUEST_SALARY]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default manageSalaryReducer;






