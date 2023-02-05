import LoginModalCSS from './LoginModal.module.css';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../image/majorCompanyLogo.png';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function LoginModal({setLoginModal}) {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberId: '',
        memberPw: ''
    });
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickLoginHandler = () => {
        console.log('[LoginModal] Login Process Start!!');        
        window.localStorage.removeItem('accessToken');
        
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));

        setLoginModal(false);
        console.log('[LoginModal] Login Process End!!');
        alert('로그인이 완료되었습니다.');
        window.location.reload();
    }
    
    return (        
        <div className={LoginModalCSS.modal}>
                <div className={ LoginModalCSS.loginModalDiv }>
                <div>
                    <img src={logo} width = "450px"></img>
                </div>
                <div className={LoginModalCSS.inputDiv}>
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
                    <div className={LoginModalCSS.buttonDiv}>
                        <button
                            onClick={ onClickLoginHandler }
                        >
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;