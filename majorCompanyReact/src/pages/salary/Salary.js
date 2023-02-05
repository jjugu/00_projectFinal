import SalaryCSS from '../../components/memberSalaryList/mySalary/mySalary.module.css';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';


import {
    callGetSalaryAPI
} from '../../apis/SalaryAPICalls';
import MySalary from '../../components/memberSalaryList/mySalary/mySalary';

function Salary() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectMember = useSelector(state => state.salaryReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const arrMemberSalary = selectMember.data;

    console.log(selectMember);
    console.log("arrMemberSalary", arrMemberSalary && arrMemberSalary.memberSalary[1]);

    /* 배열 안의 특정 값 뽑아내기 ? map을 통한. */
    const arr = arrMemberSalary && arrMemberSalary.memberSalary.map(member => member.memberCode);
    console.log(arr);

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }
  
    useEffect(
        () => {    
            console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetSalaryAPI({
                    memberId: token.sub
                }));
            }
            // console.log(selectMember.memberSalary);
        }
        ,[]
    );

    return ( 
        <>
            <div style={{display: 'flex', alignItems: 'center',justifyContent:'center', flexWrap:'wrap', width:'1300px',
                         backgroundColor:'rgb(53,122,251)', color:'white', width:'1400px', marginTop:'10px'}}>
                <h2>급여 내역</h2>
                        </div>
                <table style={{borderTop:'solid 1px grey', marginBottom:'0', margin:'10px', width:'1400px'}}>
                    <colgroup>
                        <col width="207px" />
                        <col width="200px" />
                        <col width="198px" />
                    </colgroup>
                    <thead>
                    <tr
                        style={{backgroundColor: 'white' }}
                    >
                        <th align="center">연/월</th>
                        <th align="center">급여</th>
                        <th align="center">보너스</th>
                    </tr>
                    </thead>
                </table>
                {arrMemberSalary && arrMemberSalary.memberSalary.map((mySalary) => 
                                <MySalary key={mySalary.salaryCode} prop={mySalary}></MySalary>)}
            <div>
                <button
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                className={ SalaryCSS.registerDiv2 }
                onClick = { onClickBackHandler }
                >
                돌아가기
            </button>
            </div>
        </>
    );


}

export default Salary;








