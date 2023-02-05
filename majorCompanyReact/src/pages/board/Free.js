import Freecp from "../../components/free/Freecp";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import FreeCSS from './Free.module.css';

import {
    callFreeListAPI
} from '../../apis/FreeAPICalls'
import { GET_FREECP } from '../../modules/FreeModule';

function Free() {    
     
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const free = useSelector(state => state.freeReducer);
    const freeList = free.data; 
    const pageInfo = free.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
      for(let i = 1; i <= pageInfo.pageEnd ; i++){
          pageNumber.push(i);
      }
  }

    useEffect(
      () => {
        dispatch(callFreeListAPI({
          currentPage: currentPage
        }));
      }
      ,[currentPage]
    );

    const onClickFreeInsert = () => {
      console.log('[Free] onClickFreeInsert');
      navigate("/board/free/post", { replace: false});
    }

    return (
      <>
        <div>
          <button className={ FreeCSS.btn } onClick={ onClickFreeInsert }>글쓰기</button></div>

        <div>
          {Array.isArray(freeList) && freeList.map((freecp) => <Freecp key={freecp.boardNo} prop={freecp}></Freecp>)}
        </div>
        <div style={{ listStyleType: "none", display: "flex" }}>
            { Array.isArray(freeList) &&
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={FreeCSS.pagingBtn}
            >
              &lt;
            </button>
          }
          {pageNumber.map((num) =>(
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                  style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                  className={ FreeCSS.pagingBtn }
              >
                {num}
              </button>
            </li>
          ))}
          { Array.isArray(freeList) &&
                <button 
                className={ FreeCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
      </>
    );
  }


export default Free;