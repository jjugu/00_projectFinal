import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberAPI,
    callMemberUpdateAPI
} from '../../apis/MemberAPICalls'

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const [form, setForm] = useState({});

    const onClickBackHandler = () => {
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/main", { replace: true })
    }

    useEffect(
        () => {    
            // console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetMemberAPI({
                    memberId: token.sub
                }));            
            }
            if(token === null) {
                navigate("/error", { replace: true });            
            }
        }
        ,[]
    );

    useEffect(() => {
        
        /* 이미지 업로드시 미리보기 세팅 */
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);


    const onChangeImageUpload = (e) => {
        console.log(e.target.files[0]);
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        if(modifyMode){
            imageInput.current.click();
        }
    }

    const onClickModifyModeHandler = () => {    // 수정모드
        setModifyMode(true);
        setForm({
            memberCode: memberDetail.memberCode,
            memberEmail: memberDetail.memberEmail,
            memberTel: memberDetail.memberTel,
        });
    }

    // form 데이터 세팅
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickMemberUpdateHandler = () => {

        console.log('[MemberUpdate] onClickMemberUpdateHandler');

        const formData = new FormData();
        formData.append("memberCode", form.memberCode);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberTel", form.memberTel);

        if(image){
            formData.append("memberImage", image);
        }

        dispatch(callMemberUpdateAPI({	// 프로필 정보 업데이트
            form: formData
        }));         

        alert('저장되었습니다..잠시만 기다려 주세요.');
        
        setTimeout(() => {
            alert('내 정보를 수정했습니다.');
            navigate('/mypage/profile', { replace: true});
            window.location.reload();
        }, 2000);
    };

    return (
        <div 
            className={ RegisterCSS.backgroundDiv}
            style={ { backgroundColor: 'white' } }
        >
            { memberDetail &&
            <div className={ RegisterCSS.profileDiv }>
                <div className= {RegisterCSS.profileheader}><h2>My page</h2></div>
                <div className={RegisterCSS.profileTitle}><h3>내 정보</h3></div>
                <div style={ {padding: '15px' } }></div>
                {!modifyMode &&
                    <img src={ memberDetail.memberFile } className={ RegisterCSS.memberImage } style={{width:'150px'}} alt="사원 사진" />
                }
                { modifyMode && memberDetail && <img 
                    className={ RegisterCSS.memberImage } 
                    src={ (imageUrl == null) ? memberDetail.memberFile : imageUrl } 
                    alt="preview"
                />}

                <input 
                    type="text" 
                    placeholder="아이디" 
                    readOnly={true}
                    value={memberDetail.memberId || ''}
                    style={{ backgroundColor: 'rgb(183, 219, 255)'}}
                />

                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly={true}
                    value={memberDetail.memberName || ''}
                    style={{ backgroundColor: 'rgb(183, 219, 255)'}}
                />

                <input 
                    type="text" 
                    placeholder="이메일" 
                    name='memberEmail'
                    onChange={ onChangeHandler }
                    readOnly={ modifyMode ? false : true }
                    value={ (!modifyMode ? memberDetail.memberEmail : form.memberEmail) || '' }
                    style={ !modifyMode ? { backgroundColor: 'rgb(183, 219, 255)'} : null}
                />

                <input 
                    type="text" 
                    placeholder="전화번호" 
                    name='memberTel'
                    onChange={ onChangeHandler }
                    readOnly={ modifyMode ? false : true }
                    value={ (!modifyMode ? memberDetail.memberTel : form.memberTel) || '' }
                    style={ !modifyMode ? { backgroundColor: 'rgb(183, 219, 255)'} : null}
                />

                <input 
                    type="text" 
                    placeholder="직급" 
                    readOnly={true}
                    value={memberDetail.memberGrade || ''}
                    style={{ backgroundColor: 'rgb(183, 219, 255)'}}
                />

                <input 
                    type="text" 
                    placeholder="부서" 
                    readOnly={true}
                    value={memberDetail.memberDep || ''}
                    style={{ backgroundColor: 'rgb(183, 219, 255)'}}
                />
                
                <div className={ RegisterCSS.modifyDiv }>
                {!modifyMode &&
                    <button       
                        className={ RegisterCSS.memberImageButton }
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정모드
                    </button>
                }
                {modifyMode &&
                    <button       
                        className={ RegisterCSS.memberImageButton }
                        onClick={ onClickMemberUpdateHandler }             
                    >
                        내 정보 수정 저장
                    </button>
                }
                    <input                
                        style={ { display: 'none' }}
                        type="file"
                        name='memberImage' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ imageInput }                            
                    />

                &nbsp;&nbsp;
                
                {modifyMode &&
                    <button 
                        className={ RegisterCSS.memberImageButton }
                        onClick={ onClickImageUpload }    
                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                    >
                        이미지 업로드
                    </button>
                }
                
                <button
                    style={ { margin: 10, fontSize: '15px', height: '25px', backgroundColor:'white', color:'rgb(53,122,251)' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
                </div>
            </div>
            }
        </div>
    );
}

export default Profile;