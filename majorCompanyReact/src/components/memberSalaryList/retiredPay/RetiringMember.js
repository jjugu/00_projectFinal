import RetiringMemberCSS from './RetiringMember.module.css';
import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';

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
        <span className={ RetiringMemberCSS.registerDiv } style={{marginTop:'10px'}}>
          <NavLink to={"/management/member/retire/" + memberId}>
            <span style={{display:'flex', alignItems:'center', flexDirection: 'column' , height:'36px'
                        , borderBottom:'solid 1px grey', paddingBottom:'10px'}}>
              <h3>퇴사 처리 하기</h3>
            </span>
            <ul>
              <li className={ RetiringMemberCSS.registerDiv2 }>부서 : { memberDep}</li>
              <li className={ RetiringMemberCSS.registerDiv2 }>사원 : { memberName} {memberGrade}</li> 
              <li className={ RetiringMemberCSS.registerDiv2 }>전화번호 : { memberTel}</li>
            </ul>
          </NavLink>
        </span>
      }
      
      { decoded == "ROLE_LEADER" && 
        <span className={ RetiringMemberCSS.registerDiv } style={{marginTop:'10px'}}>
          <NavLink to={"/management/member/retire/" + memberId}>
            <span style={{display:'flex', alignItems:'center', flexDirection: 'column' , height:'36px'
                        , borderBottom:'solid 1px grey', paddingBottom:'10px'}}>
              <h3>퇴사 처리 하기</h3>
            </span>
            <ul>
              <li className={ RetiringMemberCSS.registerDiv2 }>부서 : { memberDep}</li>
              <li className={ RetiringMemberCSS.registerDiv2 }>사원 : { memberName} {memberGrade}</li> 
              <li className={ RetiringMemberCSS.registerDiv2 }>전화번호 : { memberTel}</li>
            </ul>
          </NavLink>
        </span>
      }
    </>
  );
}
export default MemberList;