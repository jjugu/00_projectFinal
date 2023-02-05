import { useNavigate } from "react-router-dom";
import MemberListCSS from './MemberList.module.css';

function MemberList({ prop : {memberCode, memberName, memberBirth, memberTel, memberAddress, memberJoin, memberLeave, memberEnt, memberRemanet,
    memberGrade, memberDep, memberRtPayment, memberRtStatus, memberId, memberEmail, memberSalaryBonus}}) {
  
  const navigate = useNavigate();

  const onClickFreeHandler = (memberCode) => {
    navigate(`/management/member/list/${memberCode}`, { replace: true });
  }

  return (
    <div style={ memberEnt == "Y" ? { backgroundColor: '#d3d3d3'} : null}>
      <div onClick={ () => onClickFreeHandler(memberCode) }>
        <span style={{marginTop:'20px'}} className={MemberListCSS.memberImageButton}>
          <ul>
            <div className={ MemberListCSS.name}>{memberName}</div>
            <li className={ MemberListCSS.registerDiv2 }>아이디 : {memberId} | 직급 :{ memberGrade } | 부서 : {memberDep} | 전화번호 : {memberTel} 
                                                      | 이메일: {memberEmail} | 주소 : {memberAddress} | 생일 :&nbsp;{ memberBirth }</li>
            <li className={ MemberListCSS.registerDiv2 }>입사일자 : {memberJoin} | 퇴직여부 : {memberEnt} | 퇴사일자: {memberLeave} | 급여 : { memberSalaryBonus }만원   
                                                       | 휴가잔여일수 : { memberRemanet } | 퇴직금실지급액 : { memberRtPayment } | 퇴직금실지급액 : { memberRtStatus }</li> 
          </ul>
          <hr width= "1300px"></hr>
      </span>
      </div>
    </div>
  );
}
export default MemberList;