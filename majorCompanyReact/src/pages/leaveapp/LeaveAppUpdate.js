import LeaveAppUpdateCSS from './LeaveAppUpdate.module.css';
import { useEffect, useRef, useState } from 'react';
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

function LeaveAppUpdate() {
    
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    const dispatch = useDispatch();
    const params = useParams();
    const leaveAppList  = useSelector(state => state.leaveAppReducer);  
    
    // const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    // const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({});
    console.log("LeaveAppUpdateform", form);
    console.log("LeaveAppUpdateleaveAppList", leaveAppList);
    console.log("LeaveAppUpdateparams", params);

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
    const onClickModifyModeHandler = () => {    // 수정모드
        setModifyMode(true);
        setForm({
            leaveappNo: leaveAppList.leaveappNo,
            leaveappDate: leaveAppList.leaveappDate,
            leaveappTitle: leaveAppList.leaveappTitle,
            leaveappContent: leaveAppList.leaveappContent,
            leaveappStart: leaveAppList.leaveappStart,
            leaveappEnd: leaveAppList.leaveappEnd,
            leaveappStatus: leaveAppList.leaveappStatus,
            reportlineDate: leaveAppList.reportlineDate,
            leavedocumentCat: leaveAppList.leavedocumentCat
        });
    }

    /* form 데이터 세팅 */  
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickLeaveAppUpdateHandler = () => {

        console.log('[LeaveAppUpdate] onClickLeaveAppUpdateHandler');

        dispatch(callLeaveAppUpdateAPI({	// 기안 정보 업데이트
            form: form
        }));         

        alert('기안을 수정했습니다.');
        navigate(`/mypage/leaveApp-User/`, { replace: true});
        console.log("★★★★★★",form);
    };

    
    
    return (
        <div>

            <div className={ LeaveAppUpdateCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                {!modifyMode && leaveAppList.leaveappStatus == 'N' &&
                    <button       
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정모드
                    </button>
                }
                {modifyMode &&
                    <button       
                        onClick={ onClickLeaveAppUpdateHandler }             
                    >
                        기안서 수정 저장하기
                    </button>
                }
            </div>        
            {leaveAppList &&

            <div className={ LeaveAppUpdateCSS.productSection }>
                <div className={ LeaveAppUpdateCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>기안서 이름</label></td>
                                <td>
                                    <input 
                                        name='leaveappTitle'
                                        placeholder='기안서 이름'
                                        value={ leaveAppList.leaveappTitle }
                                        className={ LeaveAppUpdateCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ true }
                                        style={ { backgroundColor: 'gray'} }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>내용</label></td>
                                <td>
                                    <input 
                                        name='leaveappContent'
                                        placeholder='내용'
                                        value={(!modifyMode ? leaveAppList.leaveappContent : form.leaveappContent) }
                                        type='text'
                                        className={ LeaveAppUpdateCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
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

export default LeaveAppUpdate;