import ReportlineCSS from './Reportline.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import{
    callgetAllMemberListAPI,
} from '../../apis/MemberAPICalls'
function Reportline({form, setForm, setModalOpen}) {

    const dispatch = useDispatch();
    const members = useSelector(state => state.memberListReducer);  
    const memberList = members.data;
    console.log("리포트라인멤버", memberList)
    console.log("리포트라인", form)

    const membersName = memberList && memberList.map(member => (<option value = {member.memberCode}>{member.memberName}</option>));
    const membersName1 = memberList && memberList.map(member => member.memberRole[0].authorityCode==2 ? (<option value = {member.memberCode}>{member.memberName}</option>):null);
    const membersName2 = memberList && memberList.map(member => member.memberRole[0].authorityCode==1 ? (<option value = {member.memberCode}>{member.memberName}</option>):null);

    useEffect(
        () => {    
            dispatch(callgetAllMemberListAPI({
            }));
        }
        ,[]
    );
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={ReportlineCSS.modal}>
            <div >
                <div className={ ReportlineCSS.loginModalDiv }>
                    <p>결재자 선택</p>
                    <div style={ {padding: '20px' } }></div>
                        <label>(검토)성함 　
                            <select name='memberCode1' onChange={onChangeHandler}>
                                <option>선택해주세요</option>
                                {membersName1}
                            </select>
                        </label>
                        <br></br>
                        <label>(결재)성함 　
                            <select name='memberCode2' onChange={onChangeHandler}>
                                <option>선택해주세요</option>
                                {membersName2}
                            </select>
                        </label>
                        <div style={ {padding: '20px' } }></div>
                        <button className={ReportlineCSS.close} onClick={closeModal}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reportline;


