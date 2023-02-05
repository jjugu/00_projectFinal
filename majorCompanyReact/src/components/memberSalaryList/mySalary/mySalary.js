
function MySalary({prop : {salaryYear, salaryMonth, salaryBasic, salaryBonus}}) {

  return (
    <table 
    style={{margin:'0px', width:'1400px'}}>
      <colgroup>
        <col width="207px" />
        <col width="200px" />
        <col width="198px" />
      </colgroup>
      <thead>
        <tr>
          <td style={{borderRadius:'40px', border:'solid 2px white', backgroundColor:'lightblue'}} align="center">{ salaryYear } { salaryMonth }</td>
          <td style={{borderRadius:'40px', border:'solid 2px white', backgroundColor:'lightblue'}} align="center">{ salaryBasic }원</td>
          <td style={{borderRadius:'40px', border:'solid 2px white', backgroundColor:'lightblue'}} align="center">{ salaryBonus || 0}원</td>
        </tr>
      </thead>                    
    </table>
  );
}
export default MySalary;