import LeaveAppManagementCSS from './LeaveAppRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import LeaveApp from '../../components/leaveapp/LeaveApp';
import Reportline from '../../components/leaveapp/Reportline';
import {
    callLeaveAppWriteAPI
} from '../../apis/LeaveAppAPICalls';
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function LeaveAppRegistration() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const [form, setForm] = useState({
        leaveappDate: '',
        leaveappTitle: "휴가신청서",
        leaveappContent: null,
        leaveappStart: null,
        leaveappEnd: null,
        leaveappStatus: "N",
        reportlineDate: '',
        leavedocumentCat: "연차",
        memberCode: '',
        memberCode1: null,
        memberCode2: null
    });

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
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            ['memberCode']: memberDetail.memberCode,
            [e.target.name]: e.target.value
        });
    };
    const start = form.leaveappStart;
    const end = form.leaveappEnd;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const date = (endDate - startDate)/1000/60/60/24;
    
    const onClickLeaveAppRegistrationHandler = () => {
        if (form.memberCode1 == null || form.memberCode2 == null) {
            alert('결재선 지정 후 기안신청이 가능합니다.')
        } else if (form.leaveappContent == null) {
            alert('내용을 입력해 주세요.')
        } else if (form.leaveappStart == null || form.leaveappEnd == null) {
            alert('날짜를 입력해 주세요.')
            console.log('date', date);
        } else if (date <= '0' ) {
            alert('휴가 시작일과 종료일을 확인해 주세요.')
        } else {
            dispatch(callLeaveAppWriteAPI({
                form: form
            }));        
        
            alert('기안이 등록되었습니다.');
            navigate('/mypage/leaveApp-User', { replace: true});
            window.location.reload();
        }
    }

    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    
    return (
        <div>
            <div className={ LeaveAppManagementCSS.productButtonDiv }>
            <button onClick={ showModal }>결재선 지정</button>
             { modalOpen && <Reportline form = {form} setForm = {setForm} setModalOpen = {setModalOpen}/>}
            </div>
            <div style={ {padding: '10px' } }></div>
            <div className={ LeaveAppManagementCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickLeaveAppRegistrationHandler }             
                >
                    기안 등록
                </button>
            </div>        
            <div className={ LeaveAppManagementCSS.productSection }>
                <div className={ LeaveAppManagementCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>휴가 종류 : </label></td>
                                <td>
                                <select name='leavedocumentCat' onChange={onChangeHandler}>
                                <option value="연차">연차</option>
                                <option value="예비군/민방위">예비군/민방위</option>
                                <option value="출산">출산</option>
                                <option value="경조사">경조사</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>기안서 제목 : </label></td>
                                <td>
                                    <input 
                                        name='leaveappTitle'
                                        value='휴가 신청서'
                                        readOnly={true}
                                        className={ LeaveAppManagementCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>기안 사유 : </label></td>
                                <td>
                                    <input 
                                        name='leaveappContent'
                                        placeholder='내용'
                                        className={ LeaveAppManagementCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>휴가 시작일</label></td>
                                <td>
                                    <input 
                                        type="date"
                                        name='leaveappStart'
                                        placeholder='시작일'
                                        className={ LeaveAppManagementCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>휴가 종료일</label></td>
                                <td>
                                    <input 
                                        type="date"
                                        name='leaveappEnd'
                                        placeholder='종료일'
                                        className={ LeaveAppManagementCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>   
                        </tbody>                        
                    </table>
                </div>
            </div>
            {memberDetail &&
            <div>
                    <LeaveApp form={form} memberDetail={memberDetail}/>
            </div>
            }
        </div>
    );
}

export default LeaveAppRegistration;