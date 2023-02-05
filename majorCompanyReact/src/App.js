import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Notice from './pages/notice/Notice';
import NoticeRegistration from './pages/notice/NoticeRegistration';
import NoticeDetail from './pages/notice/NoticeDetail';
import NoticeUpdate from './pages/notice/NoticeUpdate';
import BoardLayout from './layouts/BoardLayout';
import Free from './pages/board/Free';
import Event from './pages/board/Event';
import FreeRegistration from './pages/board/FreeRegistration';
import FreeDetail from './pages/board/FreeDetail';
import FreeUpdate from './pages/board/FreeUpdate';
import Profile from './pages/member/Profile';
import Register from './pages/member/Register';
import MyPageLayout from './layouts/MyPageLayout';
import Salary from './pages/salary/Salary';
import MemberRetireList from './pages/management/MemberRetireList';
import RetireMemberOkay from './components/memberSalaryList/retiredPay/RetireMemberOkay';
import CancelRetirement from './components/memberSalaryList/retiredPay/CancelRetirement';
import RetiredPayment from './components/memberSalaryList/retiredPay/RetiredPayment';
import RetiredPayRequest from './components/memberSalaryList/retiredPay/RetiredPayRequest';
import RetiredPayOkay from './components/memberSalaryList/retiredPay/RetiredPayOkay';
import OkayGiveSalary from './components/memberSalaryList/OkayGiveSalary';
import RejectedSalary from './components/memberSalaryList/RejectedSalary';
import ManagementLayout from './layouts/ManagementLayout';
import ManageSalary from './pages/management/ManageSalary';
import ListMemberSalary from './components/memberSalaryList/ListMemberSalary';
import LeaveAppManagement from './pages/admin/LeaveAppManagement';
import LeaveAppRegistration from './pages/leaveapp/LeaveAppRegistration';
import LeaveAppProfile from './pages/leaveapp/LeaveAppProfile'
import LeaveAppUpdate from './pages/leaveapp/LeaveAppUpdate';
import LeaveAppSingOnOff from './pages/admin/LeaveAppSignOnOff';
import LeaveAppUser from './pages/admin/LeaveAppUser';
import Attendance from './pages/attendance/Attendance';
import MemberListManage from './pages/management/MemberListManage';
import MemberOneManage from './pages/management/MemberOneManage';
import AttendanceDateManage from './pages/management/AttendanceDateManage';
import AttendanceMemberManage from './pages/management/AttendanceMemberManage';
import AttendanceOneManage from './pages/management/AttendanceOneManage';
import Error from './components/common/Error';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Login/> } />
        <Route path="/Login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/*" element={ <Error/> } />
          <Route path="/" element={ <Layout/> }>
            <Route path="main" element={ <Main/> }/>    
            <Route path="notice/list" element={ <Notice/> } />
            <Route path="notice/post" element={ <NoticeRegistration/> } />
            <Route path="notice/:noticeNo" element={ <NoticeDetail/> } />
            <Route path="notice/update/:noticeNo" element={ <NoticeUpdate/> } />
            <Route path="board" element={ <BoardLayout/>} >
              <Route index element={ <Free/> } />
              <Route path="free/list" element={ <Free/> } />
              <Route path="event/list" element={ <Event/>} />
            </Route>
            <Route path="board/free/post" element={ <FreeRegistration/> } />
            <Route path="board/free/:boardNo" element={ <FreeDetail/> } />
            <Route path="board/free/update/:boardNo" element={ <FreeUpdate/> } />
            <Route path="management" element={ <ManagementLayout/> } >
              <Route index element={ <MemberListManage /> } />
              <Route path="retired" element={ <RetiredPayment /> }/>
              <Route path="retired/:memberId" element={ <RetiredPayRequest /> }/>
              <Route path="retired/okay/:memberId" element={ <RetiredPayOkay /> }/>
              <Route path="retired/cancel/:memberId" element={ <CancelRetirement /> }/>
              <Route path="member/retire" element={ <MemberRetireList /> }/>
              <Route path="member/retire/:memberId" element={ <RetireMemberOkay /> }/>
              <Route path="manageSalary" element={ <ManageSalary /> }/>
              <Route path="manageSalary/:memberId" element={ <ListMemberSalary /> }/>
              <Route path="manageSalary/okay/:memberId" element={ <OkayGiveSalary /> }/>
              <Route path="manageSalary/rejectedOne/:memberId" element={ <RejectedSalary /> }/>
              <Route path="member/list" element={ <MemberListManage /> }/>
              <Route path="member/list/:memberCode" element={ <MemberOneManage /> }/>
              <Route path="leaveApp-management" element={ <LeaveAppManagement/> } />
              <Route path="leaveApp-management/:leaveappNo" element={ <LeaveAppSingOnOff/> } />
              <Route path="manageAttendance" element={ <AttendanceDateManage/> }/>
              <Route path="manageAttendance/:memberId" element={ <AttendanceMemberManage/> }/>
              <Route path="manageAttendance/list/:id" element={ <AttendanceOneManage/> } />
            </Route>
            <Route path="mypage" element={ <MyPageLayout/> } >
              <Route index element={ <Profile /> } />
              <Route path="profile" element={ <Profile /> } />
              <Route path="leaveApp-Profile" element={ <LeaveAppProfile/> } />
              <Route path="leaveApp-registration" element={ <LeaveAppRegistration/> } />
              <Route path="leaveApp-User" element={ <LeaveAppUser/> } />
              <Route path="leaveApp-User/:leaveappNo" element={ <LeaveAppUpdate/> } />
              <Route path="salary" element={ <Salary /> } />
              <Route path="attendance" element={ <Attendance /> } />
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
