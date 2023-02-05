import { createActions,handleActions } from "redux-actions";

const initialState = [];

export const GET_ATTENDANCE_DATE     = "attendanceManage/GET_ATTENDANCE_EMP";
export const PUT_ATTENDANCE_UPDATE   = "attendanceManage/PUT_ATTENDANCE";
export const GET_ATTENDANCE_ONE      = "attendanceManage/GET_ATTENDANCE_ONE";

const actions = createActions({
    [GET_ATTENDANCE_DATE]: () => {},
    [PUT_ATTENDANCE_UPDATE]: () => {},
    [GET_ATTENDANCE_ONE]: () => {}
});

const attendanceManageReducer = handleActions(
    {
        [GET_ATTENDANCE_DATE]: (state, { payload }) => {

            return payload;
        },
        [PUT_ATTENDANCE_UPDATE]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ATTENDANCE_ONE]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default attendanceManageReducer;