import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPost = (props) => {

    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.setPopup(false)
        props.setForm({
            ...props.form,
            memberAddress:fullAddress
        })
    }
    const modalStyle = {
        display: 'block',
        position: 'fixed',
        left: '39.5%',
        top: '30%',
        width: '400px',
        height: '480px',
    };
    const buttonStyle = {
        display: 'block',
        position: 'fixed',
        left: '39.5%',
        top: '26.5%',
        width: '400px',
        height: '30px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px'
    };
      
    

    const closeModal = () => {
        props.setPopup(false);
    };
    return (
        <div>
            <button
                style={buttonStyle}
                onClick={closeModal}>우편번호 닫기
            </button>
            <DaumPostcode
                style={modalStyle}
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default DaumPost;