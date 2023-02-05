import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom"; 
import { decodeJwt } from "../../utils/tokenUtils";
import navStyle  from './BoardNavbar.module.css';

function BoardNavbar() {

  const token = decodeJwt(window.localStorage.getItem("accessToken"));     

  if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
      return <Navigate to="/error" />;
  }

  const activeStyle = {
    color: "rgb(53,122,251)"
  }

  return (
      <div className={navStyle.wrap}>
        <div className={navStyle.NavBox}>
          <div className={navStyle.menuBox}><NavLink to="/board/free/list" style= {({isActive}) => isActive? activeStyle: undefined} className={navStyle.link}>자유 게시판</NavLink></div>
          <div className={navStyle.menuBox}><NavLink to="/board/event/list" style= {({isActive}) => isActive? activeStyle: undefined} className={navStyle.link}>경조사 게시판</NavLink></div>
        </div>
      </div>
  );
}

export default BoardNavbar;