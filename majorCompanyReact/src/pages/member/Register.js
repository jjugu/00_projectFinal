import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DaumPost from './DaumPost';
import {
    ValidMemberIdAPI
} from '../../apis/MemberAPICalls'

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'

function Register() {
    const navigate = useNavigate();
    const inputRef = useRef([]);

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    const valid = useSelector(state => state.validReducer);     // ID 중복 비교를 위해 가져온 member 정보

    const memberLogo = 'majorCompanyLogo.png';
    // console.log("asdfasdF", member)
    const [effectUse, setEffectUse] = useState(false);
    const [form, setForm] = useState({
        memberId: '',
        memberPw: '',
        memberName: '',
        memberEmail: '',
        memberBirth: '',
        memberTel: '',
        memberAddress: '',
        memberGrade: 'staff',
        memberDep: '개발팀',
        memberRtStatus: 'N',
        memberRtPayment:'0',
        memberEnt: 'N',
        memberRemanet: '15',
        memberSalaryBonus: '',
        memberFile:memberLogo
    });

    const [memberInput, setMemberInput] = useState({
        memberPwCheck: ''
    })

    const {memberId, memberName, memberPw, memberEmail, memberBirth, memberTel} = form;

    // 아이디 형식 정규표현식 (숫자와 알파벳만)
    const idRegexp = /[a-z]{5,15}|[a-z0-9]{5,15}/g;
    // 비밀번호 형식 정규표현식 (최소 6 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자)
    const pwRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g; 
    // 이름 형식 정규표현식 (한글만 입력)
    const nameRegexp = /^[가-힣]+$/g;
    // 생년월일 형식 정규표현식
    const birthRegexp = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/g;
    // 핸드폰 번호 형식 정규표현식
    const telRegexp = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    // email 형식 정규표현식 
    const emailRegexp = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 

    const validId = memberId.match(idRegexp);
    const validPw = memberPw.match(pwRegexp);
    const validName = memberName.match(nameRegexp);
    const validBirth = memberBirth.match(birthRegexp);
    const validTel = memberTel.match(telRegexp);
    const validEmail = memberEmail.match(emailRegexp);

    // 전화번호 입력 시 자동 하이픈
    useEffect(() => {
        if (memberTel.length === 10) {
            setForm({
                ...form,
                ['memberTel']: memberTel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
            });
        }
        if (memberTel.length === 13) {
            setForm({
                ...form,
                ['memberTel']: memberTel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            });
        }
    }, [memberTel]);

    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validationPwHandler = (e) => {
        setMemberInput({
            ...memberInput,
            // 'tagName' : [e.target.name].toString(),
            [e.target.name] : e.target.value
        });
        console.log("memberInput", memberInput);
    }

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 로그인으로 이동 */
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        if (!validId) {
            alert("아이디를 다시 확인 해 주세요."); 
            setForm({ 
              ...form,
              memberId: "", 
            });
            inputRef.current[0].focus(); 
            } else if (!validPw) {
                alert("비밀번호를 다시 확인 해 주세요.");
                inputRef.current[1].focus();
                setForm({
                ...form,
                MemberPw: "",
                });
            } else if (!validName) {
                alert("이름을 다시 확인 해 주세요.");
                inputRef.current[2].focus();
                setForm({
                ...form,
                memberName: "",
                });
            } else if (!validBirth) {
                alert("생년월일을 다시 확인 해 주세요.");
                inputRef.current[3].focus();
                setForm({
                ...form,
                memberBirth: "",
                });
            } else if (!validTel) {
                alert("전화번호를 다시 확인 해 주세요.");
                inputRef.current[4].focus();
                setForm({
                ...form,
                memberTel: "",
                });
            } else if (!validEmail) {
                alert("email을 다시 확인 해 주세요.");
                inputRef.current[5].focus();
                setForm({
                ...form,
                memberEmail: "",
                });
          } else {
            dispatch(callRegisterAPI({
            form: form
        }));
            return alert("˗ˋˏ회원가입 성공!ˎˊ˗");
          }
        
    }
    const [popup, setPopup] = useState(false);
    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleComplete = (data) => {
        setPopup(!popup);
    }

    const validationIdHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setEffectUse(!effectUse);
    }

    // 아이디 중복확인을 위한 API 호출
    useEffect(
        () => {
            if(form.memberId != '') {
                dispatch(ValidMemberIdAPI({
                    memberId: form.memberId
                }));
            }
        },
        [effectUse]
    )

    return (
        <div className={ RegisterCSS.backgroundDiv}>
        <table>
            <thead>
                <tr><h3>회원가입</h3></tr>
            </thead>
            <tbody>
                <tr><th>아이디</th></tr>
                <tr><td>
                    <input 
                        type="text"
                        name="memberId"
                        value={memberId}
                        placeholder="5글자 이상 15글자 이하"
                        autoComplete='off'
                        ref={(el) => (inputRef.current[0] = el)} 
                        onChange={ validationIdHandler }
                    />    
                    { validId ? <span style={ {color : '#357AFB', fontSize: '13px' }  }> ◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 아이디입니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span>}
                    <br></br>
                    {validId && valid.status == 500 ? <span style={ {color : '#357AFB', fontSize: '13px' }  }> ◟₍ᵔ·͈༝·͈ᵔ₎◞사용 가능한 아이디입니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : validId && valid.status == 200 ? <span style={ {color : '#EF5252', fontSize : '13px'} }>중복 된 아이디입니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>٩( ᐛ )و아이디를 입력해 주세요٩( ᐛ )و</span>}
                </td></tr>

                <tr><th>비밀번호</th></tr>
                <tr><td>
                    <input 
                        type="password"
                        name="memberPw"
                        value={memberPw}
                        placeholder="문자, 숫자, 특수 문자를 1개 이상 조합해 8자 이상"
                        autoComplete='off'
                        ref={(el) => (inputRef.current[1] = el)}
                        onChange={ onChangeHandler }
                    />
                    { validPw ? <span style={ {color : '#357AFB', fontSize: '13px' }  }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 비밀번호 입니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span>}
                </td></tr>

                <tr><th>비밀번호확인</th></tr>
                <tr><td>
                    <input 
                        type="password"
                        name="memberPwCheck"
                        placeholder="비밀번호 확인"
                        autoComplete='off'
                        onChange={ validationPwHandler }
                    />
                    { memberPw.length == 0 && memberPw == memberInput.memberPwCheck ? <span style={ {color : '#EF5252', fontSize : '13px'} }>٩( ᐛ )و비밀번호를 입력해 주세요.٩( ᐛ )و</span> : memberPw.length != 0 && memberPw == memberInput.memberPwCheck ? <span style={ {color : '#357AFB', fontSize: '13px' }  }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>입력한 비밀번호와 다릅니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span> }
                </td></tr>

                <tr><th>이름</th></tr>
                <tr><td>
                    <input 
                        type="text"
                        name="memberName"
                        placeholder="이름을 입력해 주세요"
                        autoComplete='off'
                        ref={(el) => (inputRef.current[2] = el)}
                        onChange={ onChangeHandler }
                    />{ validName ? <span style={ {color : '#357AFB', fontSize: '13px'  } }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px' , fontSize : '13px'} }>٩( ᐛ )و이름을 한글로 입력해 주세요.٩( ᐛ )و</span>}    
                </td></tr>

                <tr><th>생년월일</th></tr>
                <tr><td>
                    <input type="text" 
                            placeholder="ex : 960704" 
                            name="memberBirth"
                            maxLength="6" 
                            autoComplete='off'
                            ref={(el) => (inputRef.current[3] = el)} 
                            onChange={ onChangeHandler}
                    />{ validBirth ? <span style={ {color : '#357AFB', fontSize: '13px' }  }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>٩( ᐛ )و생년월일을 숫자 6자리로 입력해 주세요.٩( ᐛ )و</span>}
                </td></tr>

                <tr><th>전화번호</th></tr>
                <tr><td>
                    <input 
                        type="text" 
                        name="memberTel"
                        placeholder="ex : 010-1234-1234"
                        value={memberTel}
                        autoComplete='off'
                        maxLength="13"
                        onChange={ onChangeHandler }
                        ref={(el) => (inputRef.current[4] = el)} 
                    />{ validTel ? <span style={ {color : '#357AFB', fontSize: '13px' }  }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 전화번호 입니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span>}    
                </td></tr>

                <tr><th>이메일</th></tr>
                <tr><td>
                    <input 
                        type="text"
                        name="memberEmail"
                        placeholder="이메일을 입력해 주세요."
                        autoComplete='off'
                        ref={(el) => (inputRef.current[5] = el)}
                        onChange={ onChangeHandler}
                    />
                    { validEmail ? <span style={ {color : '#357AFB', fontSize: '13px' }  }>◟₍ᵔ·͈༝·͈ᵔ₎◞맞게 입력하셨습니다!◟₍ᵔ·͈༝·͈ᵔ₎◞</span> : <span style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 e-mail입니다. ˃̣̣̥᷄⌓˂̣̣̥᷅ </span>}    
                </td></tr>

                <tr><th>부서</th></tr>
                <tr><td>
                    <select name='memberDep' onChange={onChangeHandler}>
                        <option value="개발팀">개발팀</option>
                        <option value="영업팀">영업팀</option>
                        <option value="인사팀">인사팀</option>
                    </select>
                </td></tr>

                <tr><th>직급</th></tr>
                <tr><td>
                    <select name='memberGrade' onChange={onChangeHandler}>
                        <option value="staff">사원(권한:3)</option>
                        <option value="assistantManager">대리(권한:3)</option>
                        <option value="manager">과장(권한:2)</option>
                        <option value="deputyGeneralManager">차장(권한:2)</option>
                        <option value="generalManager">부장(권한:2)</option>
                        <option value="managingDirector">상무(권한:1)</option>
                        <option value="seniorManagingDirector">전무(권한:1)</option>
                    </select>
                </td></tr>

                <tr><th>기본 급여</th></tr>
                <tr><td>
                    <input 
                        type="text"
                        name="memberSalaryBonus"
                        placeholder="기본 급여를 입력해 주세요."
                        autoComplete='off'
                        onChange={ onChangeHandler}
                    />
                </td></tr>

                <tr><th>주소</th></tr>
                <tr><td>
                    <input 
                        disabled
                        placeholder="주소"  
                        type="text" 
                        name="memberAddress" 
                        onChange={handleInput} 
                        value={form.memberAddress}/>
                </td></tr>

                <tr><td>
                    <button onClick={handleComplete}>우편번호 찾기</button>
                    {popup && <DaumPost form={form} setForm={setForm} popup={popup} setPopup={setPopup} ></DaumPost>}
                </td></tr>
                
                <tr><td>
                    <button onClick = { onClickRegisterHandler }>회원가입</button>    
                </td></tr>

                <tr><td>
                    <button
                        style={ { backgroundColor: 'white', color: 'black', border: '1px solid'} }
                        onClick = { onClickBackHandler }
                    >돌아가기</button>
                </td></tr>
            </tbody>
        </table>
        </div>
    );
}

export default Register;