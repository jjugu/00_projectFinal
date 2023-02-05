import MemberCSS from './MemberList.module.css';
import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MemberList({prop : { memberId, memberName, memberGrade, memberDep, memberTel}}) {

  const isLogin = window.localStorage.getItem('accessToken');
  let decoded = '';

  if(isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }

  return (
    <>
      { decoded == "ROLE_ADMIN" && 
        <span className={ MemberCSS.registerDiv } style={{marginTop:'10px'}}>
          <NavLink to={"/management/manageSalary/okay/" + memberId}>
            <span style={{display:'flex', alignItems:'center', flexDirection: 'column' , height:'36px'
                        , borderBottom:'solid 1px grey', paddingBottom:'10px'}}>
              <h3>급여 요청</h3>
            </span>
            <ul>
              <li className={ MemberCSS.registerDiv2 }>부서 : { memberDep}</li>
              <li className={ MemberCSS.registerDiv2 }>사원 : { memberName} {memberGrade}</li> 
            </ul>
          </NavLink>
        </span>
      }
      
      { decoded == "ROLE_LEADER" && 
        <span className={ MemberCSS.registerDiv } style={{marginTop:'10px'}}>
          <NavLink to={"/management/manageSalary/" + memberId}>
            <ul>
              <li className={ MemberCSS.registerDiv2 }>부서 : { memberDep}</li>
              <li className={ MemberCSS.registerDiv2 }>사원 : { memberName} {memberGrade}</li> 
              <li className={ MemberCSS.registerDiv2 }>전화번호 : { memberTel}</li>
            </ul>
          </NavLink>
        </span>
      }
    </>
  );
}
export default MemberList;