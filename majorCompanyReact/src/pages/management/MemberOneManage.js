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
    alert('?????????????????????..????????? ????????? ?????????.');
    setTimeout(() => {
        alert('?????? ????????? ??????????????????.');
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
            {!modifyMode && <h1 className= {MemberOneCSS.profileheader}>?????? ?????? ??????</h1>}
              {modifyMode && <h1 className= {MemberOneCSS.profileheader}>?????? ?????? ??????</h1>}
                <div >
                      {!modifyMode &&
                          <img src={ member.memberFile } className={ MemberOneCSS.memberImage } style={{width:'150px'}} alt="?????? ??????" />
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
                              ????????? ?????????
                          </button>
                  </div>
                  <span>
                    <div>?????????</div>
                    <input 
                      name='memberId'
                      placeholder='?????????'
                      value={((!modifyMode ? member.memberId : form.memberId) || '')}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>??????</div>
                    <input 
                      name='memberName'
                      placeholder='??????'
                      value={ (!modifyMode ? member.memberName : form.memberName) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>??????</div>
                    <input 
                      name='memberGrade'
                      placeholder='??????'
                      value={ (!modifyMode ? member.memberGrade : form.memberGrade) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>??????</div>
                    <input 
                      name='memberDep'
                      placeholder='??????'
                      value={ (!modifyMode ? member.memberDep : form.memberDep) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>?????????</div>
                    <input 
                      name='memberEmail'
                      placeholder='?????????'
                      value={ (!modifyMode ? member.memberEmail : form.memberEmail) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>????????????</div>
                    <input 
                      name='memberTel'
                      placeholder='????????????'
                      value={ (!modifyMode ? member.memberTel : form.memberTel) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>??????</div>  
                    <input 
                      name='memberAddress'
                      placeholder='??????'
                      value={ (!modifyMode ? member.memberAddress : form.memberAddress) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>????????????</div>
                    <input 
                      name='memberBirth'
                      placeholder='????????????'
                      value={ (!modifyMode ? member.memberBirth : form.memberBirth) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>????????????</div>
                    <input 
                      name='memberJoin'
                      value={member.memberJoin || ''}
                      style={ modifyMode ? { backgroundColor: '#d3d3d3'} : null}
                      readOnly={ true }
                    />
                  </span>
                  <span>
                    <div>?????? ??????</div>
                    <input 
                      name='memberEnt'
                      placeholder='?????? ??????'
                      value={ (!modifyMode ? member.memberEnt : form.memberEnt) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>?????? ??????</div>
                    <input 
                      name='memberLeave'
                      placeholder='?????? ??????'
                      value={ (!modifyMode ? member.memberLeave : form.memberLeave) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>?????? ?????? ??????</div>
                    <input 
                      name='memberRemanet'
                      placeholder='?????? ?????? ??????'
                      value={ (!modifyMode ? member.memberRemanet : form.memberRemanet) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>????????? ????????????</div>
                    <input 
                      name='memberRtPayment'
                      placeholder='????????? ????????????'
                      value={ (!modifyMode ? member.memberRtPayment : form.memberRtPayment) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>????????? ?????? ??????</div>
                    <input 
                      name='memberRtStatu'
                      placeholder='????????? ?????? ??????'
                      value={ (!modifyMode ? member.memberRtStatu : form.memberRtStatu) || ''}
                      onChange={ onChangeHandler }
                      readOnly={ modifyMode ? false : true }
                    />
                  </span>
                  <span>
                    <div>??????</div>
                    <input 
                      name='memberSalaryBonus'
                      placeholder='??????'
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
                  ????????????
                  </button>
              }
              {modifyMode &&
                  <button       
                  onClick={ onClickMemberUpdateHandler }             
                  >
                  ?????? ????????????
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
          ?????? ?????? ??????
          </button>
          &nbsp;&nbsp;
          <button
              className={ MemberOneCSS.memberImageButton }
              onClick = { onClickBackHandler }
          >
          ????????????
          </button>
        </span>
      </div>
      }
    </>
  );
}

export default MemberOneManage;