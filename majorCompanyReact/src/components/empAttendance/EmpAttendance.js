import { redirect } from 'react-router-dom';

function EmpAttendance({prop : {id, title, start, end}}) {

  return (
    <>
      {
       `id: ${id}, title: '${title}',
          start: '${start}', end: '${end}'` 
      }
    </>
  );
}

export default EmpAttendance;