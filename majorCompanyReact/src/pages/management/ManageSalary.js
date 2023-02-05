import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink, useNavigate } from 'react-router-dom';
import SalaryCSS from '../../components/memberSalaryList/mySalary/mySalary.module.css';
import MemberList from "../../components/memberSalaryList/MemberList";
import RejectedMemberList from "../../components/memberSalaryList/RejectedMemberList";

import {
    callGetAllMemberManageSalaryAPI
} from '../../apis/SalaryManageAPICalls';

function ManageSalary() { 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 

    const member = useSelector(state => state.manageSalaryReducer);
    const memberList = member && member.data || '';
    console.log(memberList);

    /* 급여 리스트 찾기 */
    let salaryListPerMember = [];
    for(let i = 0; i < (memberList && memberList.length); i++) { 
        salaryListPerMember[i] = memberList && memberList[i].memberSalary;
    }
    // console.log("salaryListPerMember: ", salaryListPerMember);

    /* 승인 반려된 급여 요청 찾기 */
    let rejectedRequest = [];
    for(let i = 0; i < salaryListPerMember.length; i++) {
        rejectedRequest[i] = salaryListPerMember[i].filter((last) => (last.salaryStatus == "R"));
    }
    console.log("rejectedRequest: ", rejectedRequest);

    /* 급여 지급 요청 이루어진 사원 memberCode 끄집어 내기 */
    const findRejectedMember = rejectedRequest && rejectedRequest.filter((one) => one[0]).map((findCode) => findCode[0].memberCode);
    // console.log("findRejectedMember: ", findRejectedMember);

    let rejectedList = [];
    for(let i = 0; i < memberList.length; i++) {
        rejectedList[i] = memberList.filter((memCode) => memCode.memberCode == findRejectedMember[i]);
    }
    console.log("rejectedList: ", rejectedList);

    /* 승인 안된 급여 요청 찾기 */
    let listPerMember = [];
    let findOne = [];
    for(let i = 0; i < salaryListPerMember.length; i++) {
        listPerMember[i] = salaryListPerMember[i].filter((last) => (last.salaryStatus == "N"));
        if(listPerMember[i] !== undefined && listPerMember[i] !== null ) {
            findOne[i] = listPerMember[i];
        }
    }
    console.log("listPerMember : ", listPerMember);
    console.log("findOne: ", findOne);

    /* 급여 지급 요청 이루어진 사원 memberCode 끄집어 내기 */
    const findCodes = findOne && findOne.filter((one) => one[0]).map((findCode) => findCode[0].memberCode);
    // console.log("findCodes: ", findCodes);

    let test = [];
    for(let i = 0; i < memberList.length; i++) {
        test[i] = memberList.filter((memCode) => memCode.memberCode == findCodes[i]);
    }
    // console.log("test: ", test.filter((memCode) => memCode.length > 0));

    /* 로그인한 사람 권한 찾기 */
    let decoded = '';
    if(token !== undefined && token !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }
    
    useEffect(
      () => {
        if(token !== null) {
            console.log('token', token.sub);
            dispatch(callGetAllMemberManageSalaryAPI());
        }
      }, []
    );

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    return (
        <>
            <div>
                {
                    decoded =="ROLE_LEADER" && 
                    <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white',
                                 display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
                        <h2>사원 급여 지급 신청</h2>
                    </div>
                }

                {
                    decoded =="ROLE_ADMIN" && 
                    <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white',
                                 display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
                        <h2>급여 지급 요청 목록</h2>
                    </div>
                }

                <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
                    {decoded == "ROLE_LEADER" && Array.isArray(memberList) &&
                        memberList.filter((find) => find.memberEnt == "N")
                            .map((member) => 
                        <MemberList key={member.memberCode} prop={member}></MemberList>)
                    }
                    {decoded == "ROLE_ADMIN" &&   // admin 권한은 급여 요청이 이루어진 항목만 보인다.
                        test?.filter((memCode) => memCode.length > 0).map(
                                          (member) => <MemberList key={member[0].memberCode} prop={member[0]}></MemberList>)
                        }
                        
                </div>

                <div>
                    {
                        rejectedRequest.map((reject) => reject.salaryStatus == "R") &&
                        <div style={{margin:'10px', backgroundColor:' rgb(53,122,251)', color:'white', display: 'flex', alignItems: 'center',
                                     justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
                            <h2>반려된 급여 요청</h2>
                        </div>
                    }

                    <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px'}}>
                        {Array.isArray(memberList) && 
                            rejectedList.filter((memCode) => memCode.length > 0).map(
                                (member) => <RejectedMemberList key={member[0].memberCode} prop={member[0]}></RejectedMemberList>)
                        }
                    </div>
                </div>
            </div>
                <button
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    className={ SalaryCSS.registerDiv2 }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
        </>
    );

}

export default ManageSalary;