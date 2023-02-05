import ManagementCSS from './Management.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { decodeJwt } from '../../utils/tokenUtils';

import{
    callLeaveAppMemberCode2ListAPI,
} from '../../apis/LeaveAppAPICalls'

function ManagementCode2({member,leaveApps}) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaveAppList = leaveApps.data;

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
            setStart((currentPage - 1) * 5);            
            dispatch(callLeaveAppMemberCode2ListAPI({
                currentPage: currentPage,
                memberCode: memberDetail?.memberCode
            }));        
        }
        ,[currentPage]
    );

    const onClickTableTr = (leaveappNo) => {
        navigate(`/management/leaveApp-management/${leaveappNo}`, { replace: false });
    }

    return (
        <>
        <div className={ ManagementCSS.bodyDiv }>
            <table className={ ManagementCSS.productTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="25%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>신청날짜</th>
                        <th>기안서제목</th>
                        <th>종류</th>
                        <th>내용</th>
                        <th>기안자</th>
                        <th>승인자1</th>
                        <th>승인자2</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(leaveAppList) && leaveAppList.map((l) => (
                        <tr
                            key={ l.leaveappNo }
                            onClick={ () => onClickTableTr(l.leaveappNo) }
                        >
                            <td>{ l.leaveappNo }</td>
                            <td>{ l.leaveappDate }</td>
                            <td>{ l.leaveappTitle }</td>
                            <td>{ l.leavedocumentCat }</td>
                            <td>{ l.leaveappContent }</td>
                            <td>{ l.memberCode?.memberName }</td>
                            <td>{ l.memberCode1?.memberName }</td>
                            <td>{ l.memberCode2?.memberName }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(leaveAppList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ ManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'rgb(53,122,251)' } : null}
                    className={ ManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(leaveAppList) &&
            <button 
                className={ ManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default ManagementCode2;