import { NavLink } from 'react-router-dom';
import ManagementNavbarCSS from './ManagementNavbar.module.css';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function ManagementNavbar() {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/error" />;
    }

    return (
        <div className={ ManagementNavbarCSS.ManagementNavbarDiv }>
            <ul className={ ManagementNavbarCSS.ManagementNavbarUl }>
                <li><NavLink to="member/list">전체 사원 조회</NavLink></li>
                <li><NavLink to="/management/manageAttendance">사원 근태 관리</NavLink></li>
                <li><NavLink to="manageSalary">사원 급여 관리</NavLink></li>
                <li><NavLink to="leaveApp-management">기안 관리</NavLink></li>
                <li><NavLink to="member/retire">퇴사자 관리</NavLink></li>
            </ul>
        </div>
    );
}

export default ManagementNavbar;