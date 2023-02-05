import LeaveAppCSS from './LeaveApp.module.css';
import { useEffect } from 'react';

export default function LeaveApp({form, memberDetail}){

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
    <th className="tg-0pky" colSpan="2" rowSpan="2"></th>
    <th className="tg-0pky" colSpan="2" rowSpan="2"></th>
    <th className="tg-0pky" colSpan="2" rowSpan="2">
    <div>{memberDetail.memberName}</div>
    </th>
  </tr>
  <tr>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="tg-0pky" colSpan="3">소속</td>
    <td className="tg-0pky" colSpan="13">
    <div>{memberDetail.memberDep}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">성 명</td>
    <td className="tg-0pky" colSpan="7">
    <div>{memberDetail.memberName}</div>
    </td>
    <td className="tg-0pky" colSpan="3">직 위</td>
    <td className="tg-0pky" colSpan="7">
    <div>{memberDetail.memberGrade}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3" rowSpan="3">종류</td>
    <td className="tg-0pky" colSpan="13" rowSpan="3">
    <div>{form.leavedocumentCat}</div>
    </td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3" rowSpan="3">사유</td>
    <td className="tg-0pky" colSpan="13" rowSpan="3">
    <div>{form.leaveappContent}</div>
    </td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">기간</td>
    <td className="tg-0pky" colSpan="13">
    <div>{form.leaveappStart} ~ {form.leaveappEnd}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="3">연락처</td>
    <td className="tg-0pky" colSpan="13">
    <div>{memberDetail.memberTel}</div>
    </td>
  </tr>
  <tr>
    <td className="tg-0pky" colSpan="16" rowSpan="7">
      <br></br>
      <br></br>
      <h4>　　　위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.　　　</h4>
      <br></br>
      <div align="center">{form.leaveappDate}</div>
      <br></br>
      <div align="right">소 속 : {memberDetail.memberDep}　</div>
      <div align="right">성 명 : {memberDetail.memberName}　</div>
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