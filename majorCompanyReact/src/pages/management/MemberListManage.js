import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetEmpAllListAPI } from '../../apis/MemberManageAPICalls';
import MemberList from '../../components/manage/MemberList';
import MemberManageCSS from './MemberManage.module.css';

function MemberListManage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(state => state.memberManagementReducer);  
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  const memberList = member.data;
  const pageInfo = member.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
    if(pageInfo){
      for(let i = 1; i <= pageInfo.pageEnd ; i++){
          pageNumber.push(i);
      }
  }

  console.log("member : {} ", member && member);
  console.log("memberList : {} ", memberList && memberList);
 
  useEffect(
    () => {
      if(token !== null) {
      dispatch(callGetEmpAllListAPI({
        currentPage: currentPage
      }));
    }
    }
    ,[currentPage]
  );


  return (
    <>
    <div>
    <h1 className= {MemberManageCSS.profileheader}>전체 사원 조회</h1>
    </div>
    <span style={{display:'flex',  width:'90%', justifyContent:'end', marginTop:'10px'}}>
      { memberList && <NavLink to={"/management/member/retire"}>
        <button
          className={MemberManageCSS.memberImageButton}
        >
          사원 퇴사 처리
        </button>
      </NavLink>}
    </span>
    <div>
          {Array.isArray(memberList) && memberList.map((member) => <MemberList key={member.memberCode} prop={member}></MemberList>)}
        </div>
        <div style={{ listStyleType: "none", display: "flex" }}>
            { Array.isArray(memberList) &&
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          }
          {pageNumber.map((num) =>(
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                  style={ currentPage === num ? {backgroundColor : 'rgb(53,122,251)'} : null}
              >
                {num}
              </button>
            </li>
          ))}
          { Array.isArray(memberList) &&
                <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
  );
}

export default MemberListManage;