import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';
import RetiredMemberList from "../../memberSalaryList/retiredPay/RetiredMemberList";
import CancelRetirementList from './CancelRetirementList';

import {
  callGetAllRetiredMembersAPI
} from '../../../apis/RetiredAPICalls';

function RetiredPayment() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const members = useSelector(state => state.retiredMemberReducer);
  const memberList = members && members.data;
  console.log(memberList && memberList);

  useEffect(
    () => {    
        console.log('token', token.sub);
        if(token !== null) {
          dispatch(callGetAllRetiredMembersAPI());
        }
    }
    ,[]
  );

  return (
    <>
      <div className={ RetiredPayment.registerDiv } > 
          {
            <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white', display: 'flex', alignItems: 'center',
            justifyContent:'center', flexWrap:'wrap', width:'1400px'}}>
              <h2>퇴직금 지급 이전</h2>
            <span style={{display:'flex', flexDirection:'column'}}>
              <input readOnly={true} value="요청 전" style={{width:'45px', backgroundColor:'grey'}} />
              <input readOnly={true} value="요청 후" style={{width:'45px', backgroundColor:'lightGrey'}} />
            </span>
              <table style={{color: 'black', borderTop:'solid 1px grey', marginBottom:'0', margin:'10px', width:'1400px'}}>
                <thead>
                  <tr
                    style={{backgroundColor: 'white' }}
                  >
                    <th>이름</th>
                    <th>직급</th>
                    <th>부서</th>
                    <th>전화번호</th>
                    <th>퇴사일자</th>
                  </tr>
                </thead>
              </table>
            </div>
          }

          <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
            {Array.isArray(memberList) && memberList.filter((statusN) => statusN.memberRtStatus == "N").map(
              (member) => <RetiredMemberList key={member.memberCode} prop={member}></RetiredMemberList>)
            }
          </div>

          {
            <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white', display: 'flex', alignItems: 'center',
                         justifyContent:'center', flexWrap:'wrap', width:'1400px'}}>
              <h2>퇴직금 지급 이후 퇴사자 목록</h2>
              <table style={{color: 'black', borderTop:'solid 1px grey', marginBottom:'0', margin:'10px', width:'1400px'}}>
                <thead>
                  <tr
                    style={{backgroundColor: 'white' }}
                  >
                    <th>이름</th>
                    <th>직급</th>
                    <th>부서</th>
                    <th>전화번호</th>
                    <th>퇴사일자</th>
                  </tr>
                </thead>
              </table>
            </div>
          }

          <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
            {Array.isArray(memberList) && memberList.filter((statusN) => statusN.memberRtStatus == "Y").map(
              (member) => <CancelRetirementList key={member.memberCode} prop={member}></CancelRetirementList>)
            }
          </div>
      </div>
    </>
  );
}
export default RetiredPayment;