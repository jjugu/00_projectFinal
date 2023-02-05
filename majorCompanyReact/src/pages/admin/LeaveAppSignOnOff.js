import LeaveAppSignOnOffCSS from './LeaveAppSignOnOff.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import LeaveAppInfo from '../../components/leaveapp/LeaveAppInfo';

import {
    callLeaveAppDetailForAdminAPI,
    callLeaveAppUpdateAPI
} from '../../apis/LeaveAppAPICalls';
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function LeaveAppSignOnOff() {
    
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    const dispatch = useDispatch();
    const params = useParams();
    const leaveAppList  = useSelector(state => state.leaveAppReducer);  
    
    const navigate = useNavigate();
    const [modifyMode, setModifyMode] = useState(false);
    const [signOff, setSignOff] = useState(false);
    const [form, setForm] = useState({});
    console.log("LeaveAppUpdateform", form);
    console.log("LeaveAppUpdateleaveAppList", leaveAppList);
    console.log("LeaveAppUpdateparams", params);

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

    useEffect(        
        () => {
            console.log('[LeaveAppUpdate] leaveAppNo : ', params.leaveappNo);

            dispatch(callLeaveAppDetailForAdminAPI({	
                leaveappNo: params.leaveappNo
            }));                     
        }
    ,[]);

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
    const onClickSignOn1Handler = () => {    // 1차 승인 시점
        setForm({
            leaveappNo: leaveAppList.leaveappNo,
            leaveappDate: leaveAppList.leaveappDate,
            leaveappTitle: leaveAppList.leaveappTitle,
            leaveappContent: leaveAppList.leaveappContent,
            leaveappStart: leaveAppList.leaveappStart,
            leaveappEnd: leaveAppList.leaveappEnd,
            leaveappStatus: "O",
            reportlineDate: leaveAppList.reportlineDate,
            leavedocumentCat: leaveAppList.leavedocumentCat
        });
        setModifyMode(true);
        if(form.leaveappStatus == "O") {
            dispatch(callLeaveAppUpdateAPI({	// 기안 정보 업데이트
                form: form
            }));         

            alert('기안을 승인했습니다.');
            navigate(`/management/leaveApp-management/`, { replace: true});
        }
    }

    // 휴가 기간 일자계산 방법
    const start = leaveAppList.leaveappStart;
    const end = leaveAppList.leaveappEnd;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const holiday = (endDate - startDate)/1000/60/60/24;
    console.log("★★★★★★★★", holiday);

    const onClickSignOn2Handler = () => {    // 2차 승인 시점
        setForm({
            leaveappNo: leaveAppList.leaveappNo,
            leaveappDate: leaveAppList.leaveappDate,
            leaveappTitle: leaveAppList.leaveappTitle,
            leaveappContent: leaveAppList.leaveappContent,
            leaveappStart: leaveAppList.leaveappStart,
            leaveappEnd: leaveAppList.leaveappEnd,
            leaveappStatus: "Y",
            reportlineDate: leaveAppList.reportlineDate,
            leavedocumentCat: leaveAppList.leavedocumentCat,
            memberCode: leaveAppList.memberCode?.memberCode,
            holiday: holiday
        });
        setModifyMode(true);
        if(form.leaveappStatus == "Y") {
            dispatch(callLeaveAppUpdateAPI({	// 기안 정보 업데이트
                form: form
            }));         

            alert('기안을 승인했습니다.');
            navigate(`/management/leaveApp-management/`, { replace: true});
        }
    }

    const onClickSignOffHandler = () => {    // 반려 시점
        setForm({
            leaveappNo: leaveAppList.leaveappNo,
            leaveappDate: leaveAppList.leaveappDate,
            leaveappTitle: leaveAppList.leaveappTitle,
            leaveappContent: leaveAppList.leaveappContent,
            leaveappStart: leaveAppList.leaveappStart,
            leaveappEnd: leaveAppList.leaveappEnd,
            leaveappStatus: "X",
            reportlineDate: leaveAppList.reportlineDate,
            leavedocumentCat: leaveAppList.leavedocumentCat
        });
        setSignOff(true);
        if(form.leaveappStatus == "X") {
            dispatch(callLeaveAppUpdateAPI({	// 기안 정보 업데이트
                form: form
            }));         

            alert('기안을 반려했습니다.');
            navigate(`/management/leaveApp-management/`, { replace: true});
        }
    }

    
    
    return (
        <div>

            <div className={ LeaveAppSignOnOffCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                </div>
                <div style={ {padding: '10px' } }></div>
                <div className={ LeaveAppSignOnOffCSS.productButtonDiv }>
                {!modifyMode && decoded ==="ROLE_LEADER" &&
                    <button       
                        onClick={ onClickSignOn1Handler }             
                    >
                        승인하기
                    </button>
                }
                {modifyMode && decoded ==="ROLE_LEADER" &&
                    <button       
                        onClick={ onClickSignOn1Handler }             
                    >
                        승인 확인!!!!!!!
                    </button>
                }

                {!modifyMode && decoded ==="ROLE_ADMIN" &&
                    <button       
                        onClick={ onClickSignOn2Handler }             
                    >
                        승인하기
                    </button>
                }
                {modifyMode && decoded ==="ROLE_ADMIN" &&
                    <button       
                        onClick={ onClickSignOn2Handler }             
                    >
                        승인 확인!!!!!!!
                    </button>
                }

                {!signOff &&
                    <button       
                        onClick={ onClickSignOffHandler }             
                    >
                        반려하기
                    </button>
                }
                {signOff &&
                    <button       
                        onClick={ onClickSignOffHandler }             
                    >
                        반려 확인!!!!!!!
                    </button>
                }
            </div>        
            {leaveAppList &&

            <div className={ LeaveAppSignOnOffCSS.productSection }>
                <div className={ LeaveAppSignOnOffCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>기안서 이름</label></td>
                                <td>
                                    <input 
                                        name='leaveappTitle'
                                        placeholder='기안서 이름'
                                        value={ leaveAppList.leaveappTitle }
                                        className={ LeaveAppSignOnOffCSS.productInfoInput }
                                        readOnly={ true }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>내용</label></td>
                                <td>
                                    <input 
                                        name='leaveappContent'
                                        placeholder='내용'
                                        value={ leaveAppList.leaveappContent }
                                        type='text'
                                        className={ LeaveAppSignOnOffCSS.productInfoInput }
                                        readOnly={ true }
                                    />
                                </td>
                            </tr>      
                        </tbody>                        
                    </table>
                </div>
            </div>
            
        }
            

            { leaveAppList &&
        <div>
                <LeaveAppInfo form={form} leaveAppList={leaveAppList}/>
        </div>
        }
        </div>
    );
}

export default LeaveAppSignOnOff;