import { createActions,handleActions } from "redux-actions";

const initialState = [];

export const GET_EMP_ALL_LIST       = "management/GET_EMP_LIST";
export const GET_EMP_ONE            = "management/GET_EMP_ONE";
export const PUT_EMP_ONE            = "management/PUT_EMP";

const actions = createActions({
    [GET_EMP_ALL_LIST]: () => {},
    [GET_EMP_ONE]: () => {},
    [PUT_EMP_ONE]: () => {}
});

const memberManagementReducer = handleActions(
    {
        [GET_EMP_ALL_LIST]: (state, { payload }) => {

            return payload;
        },
        [GET_EMP_ONE]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_EMP_ONE]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default memberManagementReducer;