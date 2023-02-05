import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_SALARY_LIST        = 'salary/GET_SALARY_LIST';
export const GET_ALL_MEMBER_SALARY  = 'salary/GET_ALL_MEMBER_SALARY';
export const GET_ALL_SALARY_REQUEST  = 'salary/GET_ALL_SALARY_REQUEST';

const actions = createActions({
    [GET_SALARY_LIST]: () => {},
    [GET_ALL_MEMBER_SALARY]: () => {},
    [GET_ALL_SALARY_REQUEST]: () => {}
});

const salaryReducer = handleActions(
    {
        [GET_SALARY_LIST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ALL_MEMBER_SALARY]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ALL_SALARY_REQUEST]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default salaryReducer;






