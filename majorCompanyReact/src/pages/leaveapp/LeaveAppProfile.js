
import LeaveAppProfileCSS from './LeaveAppProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
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

    const onClickLeaveAppInsert = () => {
        console.log('[LeaveAppProfile] onClickLeaveAppInsert');
        navigate("/mypage/leaveApp-registration", { replace: false })
    }

    const onClickLeaveAppUser = () => {
        navigate("/mypage/leaveApp-User", { replace: false })
    }
    return (
        <div >

            { memberDetail &&
                <div className={ LeaveAppProfileCSS.registerDiv }>
                <div className={ LeaveAppProfileCSS.registerDivheader }><h3>나의 휴가 관리</h3></div>
                <div style={ {padding: '15px' } }></div>
                <div className={ LeaveAppProfileCSS.registerDivtitle }><h4>휴가 내역</h4></div>
                <div style={ {padding: '30px' } }></div>
                <div>
                <div>
                <div>이름 : {memberDetail.memberName}</div>
                </div>
                <div style={ {padding: '5px' } }></div>
                <div>
                <div>직급 : {memberDetail.memberGrade}</div>
                </div>
                <div style={ {padding: '5px' } }></div>
                <div>
                <div>남은 연차 : {memberDetail.memberRemanet}</div>
                </div>
                </div>
                <div style={ {padding: '10px' } }></div>
                <button
                    style={ { border: 'none', margin: 10, fontSize: '15px', height: '25px' } }
                    onClick = { onClickLeaveAppInsert }
                >
                    휴가 신청하기
                </button>
                <button
                    style={ { border: 'none', margin: 10, fontSize: '15px', height: '25px' } }
                    onClick = { onClickLeaveAppUser }
                >
                    휴가 신청 내역
                </button>
                <button
                    style={ { margin: 10, fontSize: '15px', height: '25px', backgroundColor:'white', color:'rgb(53,122,251)' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
            }
        </div>
    );
}

export default Profile;