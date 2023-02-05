import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';

function RetiredMemberList({prop : { memberId, memberLeave, memberName, memberGrade, memberDep, memberTel, memberRtPayment}}) {

  const isLogin = window.localStorage.getItem('accessToken');
  let decoded = '';

  if(isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }

  return (
    <>
    { decoded == "ROLE_ADMIN" &&
        <span style={{marginLeft:'120px'}}>
          <NavLink to={"/management/retired/cancel/" + memberId}>
            <table style={{margin:'0px', width:'1400px'}}>
            <colgroup>
              <col width="207px" />
              <col width="200px" />
              <col width="198px" />
              <col width="387px" />
            </colgroup>
            <thead>
              <tr
                style={{backgroundColor:'lightGrey'}}
                >
                <td align="center">{ memberName }</td>
                <td align="center">{ memberGrade }</td>
                <td align="center">{ memberDep }</td>
                <td align="center">{ memberTel }</td>
                <td align="center">{ memberLeave }</td>
              </tr>
            </thead>                    
          </table>
          </NavLink>
        </span>}
      
        { decoded == "ROLE_LEADER" &&
        <span style={{marginLeft:'120px'}}>
          <NavLink to={"/management/retired/cancel/" + memberId}>
          <table style={{margin:'0px', width:'1400px'}}>
            <colgroup>
              <col width="207px" />
              <col width="200px" />
              <col width="198px" />
              <col width="387px" />
            </colgroup>
            <thead>
              <tr
                style={{backgroundColor:'lightGrey'}}
                >
                <td align="center">{ memberName }</td>
                <td align="center">{ memberGrade }</td>
                <td align="center">{ memberDep }</td>
                <td align="center">{ memberTel }</td>
                <td align="center">{ memberLeave }</td>
              </tr>
            </thead>                    
          </table>     
        </NavLink>
        </span>}
    </>
  );
}
export default RetiredMemberList;