import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import salaryReducer from './SalaryModule';
import noticeReducer from './NoticeModule';
import manageSalaryReducer from './SalaryManageModule';
import manageMemberSalaryReducer from './SalaryManageMemberModule';
import leaveAppReducer from './LeaveAppModule';
import attendanceReducer from './AttendanceModule';
import leaveAppMemberCode1Reducer from './LeaveAppModuleMemberCode1';
import leaveAppMemberCode2Reducer from './LeaveAppModuleMemberCode2';
import memberListReducer from './MemberListModule';
import memberManagementReducer from './MemberManagementModule';
import attendanceManageReducer from './AttendanceManageModule';
import freeReducer from './FreeModule';
import validReducer from './ValidModule';
import retiredMemberReducer from './RetiredPaymentModule';
import commentReducer from './CommentModule';

const rootReducer = combineReducers({
    memberReducer,
    salaryReducer,
    noticeReducer,
    freeReducer,
    commentReducer,
    manageSalaryReducer,
    manageMemberSalaryReducer,
    retiredMemberReducer,
    leaveAppReducer,
    attendanceReducer,
    leaveAppMemberCode1Reducer,
    leaveAppMemberCode2Reducer,
    memberListReducer,
    memberManagementReducer,
    attendanceManageReducer,
    validReducer
});

export default rootReducer;
