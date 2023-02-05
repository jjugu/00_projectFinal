import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { decodeJwt } from '../../utils/tokenUtils';
import ManagementCode from '../../components/leaveapp/ManagementCode';

import{
    callLeaveAppMemberCodeListAPI,
} from '../../apis/LeaveAppAPICalls'
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function LeaveAppUser() {
    
    const dispatch = useDispatch();

    const leaveApps  = useSelector(state => state.leaveAppReducer);      
    const leaveAppList = leaveApps.data;

    console.log('leaveAppManagement', leaveAppList);

    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const pageInfo = leaveApps.pageInfo;
    
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
            dispatch(callLeaveAppMemberCodeListAPI({
                currentPage: currentPage,
                memberCode: memberDetail?.memberCode
            }));      
        }
        ,[currentPage]
    );

    return (
        <>
            {leaveApps !== null ?
            <div>
                <ManagementCode member={member} leaveApps={leaveApps}/>
            </div> 
            : null}
        </>
    );
}

export default LeaveAppUser;