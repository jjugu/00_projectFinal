import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import RetiringMember from "../../components/memberSalaryList/retiredPay/RetiringMember";
import MemberRetireListCSS from './MemberRetireList.module.css';

import {
  callGetAllMemberManageSalaryAPI
} from '../../apis/SalaryManageAPICalls';
import RetiredPayment from "../../components/memberSalaryList/retiredPay/RetiredPayment";

function MemberRetireList() {

  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const members = useSelector(state => state.manageSalaryReducer);
  const memberList = members && members.data;
  console.log(memberList && memberList);

  useEffect(
    () => {    
        console.log('token', token.sub);
        if(token !== null) {
          dispatch(callGetAllMemberManageSalaryAPI());
        }
    }
    ,[]
  );

  return (
    <>
      <div> 
          {
            <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white', display: 'flex', alignItems: 'center',
                         justifyContent:'center', flexWrap:'wrap', width:'1400px'}}>
              <h2>사원 목록 : 퇴사 처리</h2>
            </div>
          }

          <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
            {Array.isArray(memberList) && memberList.filter((statusN) => statusN.memberEnt == "N").map(
              (member) => <RetiringMember key={member.memberCode} prop={member}></RetiringMember>)
            }
          </div>
          <RetiredPayment/>
      </div>
    </>
  );
}
export default MemberRetireList;