import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetEmpOneAPI,
         callPutEmpOneAPI } from '../../apis/MemberManageAPICalls';
import MemberOneCSS from './MemberOne.module.css';

function MemberOneManage() {

  const params = useParams();  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(state => state.memberManagementReducer);  
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  const [form, setForm] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imageInput = useRef();

  console.log("member : {} ", member && member);
 
  useEffect(        
    () => {
        console.log('memberCode : ', params.memberCode);

        dispatch(callGetEmpOneAPI({   
            memberCode: params.memberCode
        }));                     
    }
    ,[]
  );

  useEffect(() => {
        
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

  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      memberCode: member.memberCode,
      memberId: member.memberId,
      memberName: member.memberName,
      memberBirth: member.memberBirth,
      memberTel: member.memberTel,
      memberAddress: member.memberAddress,
      memberLeave: member.memberLeave,
      memberEnt: member.memberEnt,
      memberRemanet: member.memberRemanet,
      memberDep: member.memberDep,
      memberRtPayment: member.memberRtPayment,
      memberRtStatus: member.memberRtStatus,
      memberEmail: member.memberEmail,
      memberSalaryBonus: member.memberSalaryBonus,
      memberGrade: member.memberGrade
    });
  }

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
    formData.append("memberId", form.memberId);
    formData.append("memberName", form.memberName);
    formData.append("memberBirth", form.memberBirth);
    formData.append("memberTel", form.memberTel);
    formData.append("memberAddress", form.memberAddress);
    formData.append("memberLeave", form.memberLeave);
    formData.append("memberEnt", form.memberEnt);
    formData.append("memberRemanet", form.memberRemanet);
    formData.append("memberDep", form.memberDep);
    formData.append("memberRtPayment", form.memberRtPayment);
    formData.append("memberRtStatus", form.memberRtStatus);
    formData.append("memberEmail", form.memberEmail);
    formData.append("memberSalaryBonus", form.memberSalaryBonus);
    formData.append("memberGrade", form.memberGrade);

    if(image){
      formData.append("memberImage", image);
    }
    console.log("formData?", form);

    dispatch(callPutEmpOneAPI({	
        form: formData
    }));         
    alert('저장되었습니다..잠시만 기다려 주세요.');
    setTimeout(() => {
        alert('사원 정보를 수정했습니다.');
        navigate('/management/member/list', { replace: true });
        window.location.reload();
    }, 2000);
};

  const onClickAttendanceHandler = () => {
        
    navigate(`/management/manageAttendance/${member.memberId}`, {replace: true});
  }

  const onClickBackHandler = () => {
        
    navigate(-1);
  }

  return (
    <>
      {member &&
      <div 
        className={ MemberOneCSS.backgroundDiv}
        style={ { backgroundColor: 'white' } }
      >
      <div className={ MemberOneCSS.profileDiv }>
            {!modifyMode && <h1 className= {MemberOneCSS.profileheader}>사원 정보 조회</h1>}
              {modifyMode && <h1 className= {MemberOneCSS.profileheader}>사원 정보 수정</h1>}
                <div >
                      {!modifyMode &&
                          <img src={ member.memberFile } className={ MemberOneCSS.memberImage } style={{width:'150px'}} alt="사원 사진" />
                      }
                      { modifyMode && member && <img 
                          className={ MemberOneCSS.productImage } 
                          src={ (imageUrl == null) ? member.memberFile : imageUrl } 
                          style={{width:'150px'}}
                          alt="preview"
                      />}
                          <input                
                              style={ { display: 'none' }}
                              type="file"
                              name='memberImage' 
                              accept='image/jpg,image/png,image/jpeg,image/gif'
                              onChange={ onChangeImageUpload }
                              ref={ imageInput }                            
                          />
                          <button 
                              className={ MemberOneCSS.productImageButton }
                              onClick={ onClickImageUpload }   
                              style={ !modifyMode ? { backgroundColor: 'gray'} : null} 
                          >
                              이미지 업로드
                          </button>
                  </div>
                  <span>
                    <div>아이디</div>
                    <input 
                      name='memberId'
                      placeholder='아이디'
                      value={((!modifyMode ? member.memberId : form.memberId) || '')}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>이름</div>
                    <input 
                      name='memberName'
                      placeholder='이름'
                      value={ (!modifyMode ? member.memberName : form.memberName) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>직급</div>
                    <input 
                      name='memberGrade'
                      placeholder='직급'
                      value={ (!modifyMode ? member.memberGrade : form.memberGrade) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>부서</div>
                    <input 
                      name='memberDep'
                      placeholder='부서'
                      value={ (!modifyMode ? member.memberDep : form.memberDep) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>이메일</div>
                    <input 
                      name='memberEmail'
                      placeholder='이메일'
                      value={ (!modifyMode ? member.memberEmail : form.memberEmail) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>전화번호</div>
                    <input 
                      name='memberTel'
                      placeholder='전화번호'
                      value={ (!modifyMode ? member.memberTel : form.memberTel) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>주소</div>  
                    <input 
                      name='memberAddress'
                      placeholder='주소'
                      value={ (!modifyMode ? member.memberAddress : form.memberAddress) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>생년월일</div>
                    <input 
                      name='memberBirth'
                      placeholder='생년월일'
                      value={ (!modifyMode ? member.memberBirth : form.memberBirth) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>입사일자</div>
                    <input 
                      name='memberJoin'
                      value={member.memberJoin || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>퇴직 여부</div>
                    <input 
                      name='memberEnt'
                      placeholder='퇴직 여부'
                      value={ (!modifyMode ? member.memberEnt : form.memberEnt) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>퇴사 일자</div>
                    <input 
                      name='memberLeave'
                      placeholder='퇴사 일자'
                      value={ (!modifyMode ? member.memberLeave : form.memberLeave) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>휴가 잔여 일수</div>
                    <input 
                      name='memberRemanet'
                      placeholder='휴가 잔여 일수'
                      value={ (!modifyMode ? member.memberRemanet : form.memberRemanet) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>퇴직금 실지급액</div>
                    <input 
                      name='memberRtPayment'
                      placeholder='퇴직금 실지급액'
                      value={ (!modifyMode ? member.memberRtPayment : form.memberRtPayment) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>퇴직금 지급 여부</div>
                    <input 
                      name='memberRtStatu'
                      placeholder='퇴직금 지급 여부'
                      value={ (!modifyMode ? member.memberRtStatu : form.memberRtStatu) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>급여</div>
                    <input 
                      name='memberSalaryBonus'
                      placeholder='급여'
                      value={ (!modifyMode ? member.memberSalaryBonus : form.memberSalaryBonus) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  &nbsp;
        <div className={ MemberOneCSS.productButtonDiv }>
              {!modifyMode &&
                  <button       
                  onClick={ onClickModifyModeHandler }             
                  >
                  수정모드
                  </button>
              }
              {modifyMode &&
                  <button       
                  onClick={ onClickMemberUpdateHandler }             
                  >
                  수정 저장하기
                  </button>
              }
      </div>
      </div>
      &nbsp;
      <span>
          <button
          className={ MemberOneCSS.memberImageButton }
          onClick = { onClickAttendanceHandler }
          >
          사원 근태 조회
          </button>
          &nbsp;&nbsp;
          <button
              className={ MemberOneCSS.memberImageButton }
              onClick = { onClickBackHandler }
          >
          돌아가기
          </button>
        </span>
      </div>
      }
    </>
  );
}

export default MemberOneManage;