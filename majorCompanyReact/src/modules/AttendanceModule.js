import { createActions,handleActions } from "redux-actions";

const initialState = [];

export const GET_ATTENDANCE_EMP     = "attendance/GET_ATTENDANCE_EMP";
export const POST_ATTENDANCE        = "attendance/POST_ATTENDANCE";
export const PUT_ATTENDANCE         = "attendance/PUT_ATTENDANCE";

const actions = createActions({
    [GET_ATTENDANCE_EMP]: () => {},
    [POST_ATTENDANCE]: () => {},
    [PUT_ATTENDANCE]: () => {}
});

const attendanceReducer = handleActions(
    {
        [GET_ATTENDANCE_EMP]: (state, { payload }) => {

            return payload;
        },
        [POST_ATTENDANCE]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_ATTENDANCE]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default attendanceReducer;