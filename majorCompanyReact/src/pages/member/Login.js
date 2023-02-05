import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from '../../modules/MemberModule';
import { decodeJwt } from '../../utils/tokenUtils';
import logo from '../../image/majorCompanyLogo.png';

import {
    callLoginAPI
} from '../../apis/MemberAPICalls'

function Login() {
        
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    /* 폼 데이터 한번에 변경 및 State에 저장 */   
    const [form, setForm] = useState({
        memberId: '',
        memberPw: ''
    });

    useEffect(() => {
        if(token !== null) {
            navigate("/main", { replace: true });  
        }
        
        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            alert('로그인이 완료되었습니다.');
            navigate("/main", { replace: true });
        }

        if(loginMember.status === 400){
            alert('아이디와 비밀번호를 확인해 주세요.');
        }

        /* 회원 가입 후 로그인 페이지로 안내 되었을 때 */
        if(loginMember.status === 201){

            loginMember.status = 100  // Continue
            dispatch({ type: POST_REGISTER,  payload: loginMember });
        }  
    }
    ,[loginMember]);
    
    /* 로그인 상태일 시 로그인페이지로 접근 방지 */
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/main"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/register", { replace: true })
    }

    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    return (
        <div className={ LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <div>
                    <img src={logo} width = "450px"></img>
                </div>
                <div className={LoginCSS.inputDiv}>
                    <input 
                        type="text" 
                        name='memberId'
                        placeholder="아이디" 
                        autoComplete='off'
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                onClickLoginHandler();
                            }
                        }}
                        onChange={ onChangeHandler }
                    />
                    <br/>
                    <input 
                        type="password"
                        name='memberPw' 
                        placeholder="패스워드" 
                        autoComplete='off'
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                onClickLoginHandler();
                            }
                        }}
                        onChange={ onChangeHandler }
                    />
                    <br/>
                    <div className={LoginCSS.buttonDiv}>
                        <button
                            onClick={ onClickLoginHandler }
                        >
                            로그인
                        </button>
                        <button
                            onClick={ onClickRegisterHandler }
                            style={ { backgroundColor: 'white', color: 'black', border: '1px solid'} }
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;