import LeaveAppCSS from './LeaveApp.module.css';
import { useEffect } from 'react';

export default function LeaveAppInfo({form, leaveAppList}){
  
    useEffect(
        () => {    
            console.log("useEffect", form)
        }
    );

    console.log("컴포넌트 form", form)
    return (<>
<table className={LeaveAppCSS.tg}>
<thead>
  <tr>
    <th className="tg-0pky" colSpan="8" rowSpan="3">휴가 신청서</th>
    <th className="tg-0pky" colSpan="2" rowSpan="3">결재</th>
    <th className="tg-0pky" colSpan="2">담당　</th>
    <th className="tg-0pky" colSpan="2">부서장</th>
    <th className="tg-0pky" colSpan="2">기안자</th>
  </tr>
  <tr>
     <th className="tg-0pky" colSpan="2" rowSpan="2">
    <div>{leaveAppList.memberCode2?.memberName}</div>
    </th>
    <th className="tg-0pky" colSpan="2" rowSpan="2">
    <div>{leaveAppList.memberCode1?.memberName}</div>
    </th>
    <th className="tg-0pky" colSpan="2" rowSpan="2">
    <div>{leaveAppList.memberCode?.memberName}</div>
    </th>
  </tr>
  <tr>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="tg-0pky" colSpan="3">소속</td>
    <td className="tg-0pky" colSpan="13">
    <div>{leaveAppList.memberCode?.memberDep}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">성 명</td>
    <td className="tg-0pky" colSpan="7">
    <div>{leaveAppList.memberCode?.memberName}</div>
    </td>
    <td className="tg-0pky" colSpan="3">직 위</td>
    <td className="tg-0pky" colSpan="7">
    <div>{leaveAppList.memberCode?.memberGrade}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3" rowSpan="3">종류</td>
    <td className="tg-0pky" colSpan="13" rowSpan="3">
    <div>{leaveAppList.leavedocumentCat}</div>
    </td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3" rowSpan="3">사유</td>
    <td className="tg-0pky" colSpan="13" rowSpan="3">
    <div>{leaveAppList.leaveappContent}</div>
    </td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">기간</td>
    <td className="tg-0pky" colSpan="13">
    <div>{leaveAppList.leaveappStart}  ~  {leaveAppList.leaveappEnd}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">연락처</td>
    <td className="tg-0pky" colSpan="13">
    <div>{leaveAppList.memberCode?.memberTel}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="16" rowSpan="7">
      <br></br>
      <br></br>
      <h4>　　　위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.　　　</h4>
      <br></br>
      <div align="center">신청일 : {leaveAppList.leaveappDate}</div>
      <div align="center">승인일 : {leaveAppList.reportlineDate}</div>
      <br></br>
      <div align="right">소 속 : {leaveAppList.memberCode?.memberDep}　</div>
      <div align="right">성 명 : {leaveAppList.memberCode?.memberName}　</div>
    </td>
 </tr>
  <tr>
  </tr>
  <tr> 
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
</tbody>
</table>
</>
);
}