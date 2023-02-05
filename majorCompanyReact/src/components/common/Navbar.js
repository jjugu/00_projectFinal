import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import NavCSS from './Navbar.module.css';
function Navbar() {
    
    
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let decoded1 = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
        if(temp.auth[1] != null) {
            decoded1 = temp.auth[1];
        }
    }

    const activeStyle = {
        color: "rgb(53,122,251)"     
      }
      
    console.log('decoded ', decoded);
    return (
        <div className={ NavCSS.NavbarDiv }>
            <ul className={ NavCSS.NavlistUl }>
                <li><NavLink to="/notice/list" style= {({isActive}) => isActive? activeStyle: undefined} className={NavCSS.link}>공지사항</NavLink></li>
                <li><NavLink to="/board/free/list" style= {({isActive}) => isActive? activeStyle: undefined} className={NavCSS.link}>사내게시판</NavLink></li>
                {(decoded ==="ROLE_ADMIN" || decoded ==="ROLE_LEADER" || decoded1 ==="ROLE_LEADER") 
                    && <li><NavLink to="/management" style= {({isActive}) => isActive? activeStyle: undefined} className={NavCSS.link}>Management</NavLink></li>}
            </ul>
        </div>
    );
}

export default Navbar;