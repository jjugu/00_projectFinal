import LeaveAppManagementCSS from './LeaveAppManagement.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { decodeJwt } from '../../utils/tokenUtils';
import ManagementCode1 from '../../components/leaveapp/ManagementCode1';
import ManagementCode2 from '../../components/leaveapp/ManagementCode2';

import{
    callLeaveAppMemberCode1ListAPI,
    callLeaveAppMemberCode2ListAPI
} from '../../apis/LeaveAppAPICalls'
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function LeaveAppManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const leaveAppsMemberCode1  = useSelector(state => state.leaveAppMemberCode1Reducer);      
    const leaveAppListMemberCode1 = leaveAppsMemberCode1.data;
    const leaveAppsMemberCode2  = useSelector(state => state.leaveAppMemberCode2Reducer);      
    const leaveAppListMemberCode2 = leaveAppsMemberCode2.data;

    console.log('aaleaveAppManagement11111', leaveAppListMemberCode1);
    console.log('aaleaveAppManagement2222', leaveAppListMemberCode2);
    
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

    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const pageInfo = leaveAppsMemberCode1.pageInfo;
    
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }
    
    useEffect(
        () => {    
            console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetMemberAPI({
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );
    useEffect(
        () => {     
            setStart((currentPage - 1) * 5);            
            dispatch(callLeaveAppMemberCode1ListAPI({
                currentPage: currentPage,
                memberCode: memberDetail?.memberCode
            }));   
            setStart((currentPage - 1) * 5);            
            dispatch(callLeaveAppMemberCode2ListAPI({
                currentPage: currentPage,
                memberCode: memberDetail?.memberCode
            }));   
        }
        ,[currentPage, memberDetail]
    );

    return (
        <>
            {leaveAppsMemberCode1.length !== 0 && decoded ==="ROLE_LEADER" &&
                <div className={ LeaveAppManagementCSS.bodyDiv } >
                    <h2>1차 승인</h2>
                    <ManagementCode1 member={member} leaveApps={leaveAppsMemberCode1}/>
                </div>
            }
                <div>
                    <br/>
                    <br/>
                </div>
            {leaveAppsMemberCode2.length !== 0 && decoded ==="ROLE_ADMIN" &&
                <div className={ LeaveAppManagementCSS.bodyDiv }>
                    <h2>2차 승인</h2>
                    <ManagementCode2 member={member} leaveApps={leaveAppsMemberCode2}/>
                </div>
            }
        </>
    );
}

export default LeaveAppManagement;