import { NavLink } from 'react-router-dom';
import MyPageNavbarCSS from './MyPageNavbar.module.css';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/error" />;
    }

    return (
        <div className={ MyPageNavbarCSS.MyPageNavbarDiv }>
            <ul className={ MyPageNavbarCSS.MyPageNavbarUl }>
                <li><NavLink to="profile">회원 정보</NavLink></li>
                <li><NavLink to="leaveApp-Profile">나의 휴가 관리</NavLink></li>
                <li><NavLink to="salary">나의 급여 조회</NavLink></li>
                <li><NavLink to="attendance">나의 근태 조회</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;