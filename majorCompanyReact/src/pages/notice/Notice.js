import Noticecp from "../../components/notice/Noticecp";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import NoticeCSS from './Notice.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callNoticeListAPI
} from '../../apis/NoticeAPICalls'
import { GET_NOTICECP } from '../../modules/NoticeModule';

function Notice() {
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notice = useSelector(state => state.noticeReducer);
    const noticeList = notice.data; 
    const pageInfo = notice.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
      for(let i = 1; i <= pageInfo.pageEnd ; i++){
          pageNumber.push(i);
      }
  }


    useEffect(
      () => {
        dispatch(callNoticeListAPI({
          currentPage: currentPage
        }));
      }
      ,[currentPage]
    );


    // 글쓰기버튼
    const onClickNoticeNoticeInsert = () => {
      console.log('[Notice] onClickNoticeNoticeInsert');
      navigate("/notice/post", { replace: false});
    }
    // console.log("adsfasdfasdf", noticecpList && noticecpList)

    // 공지사항 글쓰기 버튼에 권한을 부여하기 위한 코드
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let decoded1 = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
        if(temp.auth[1] != null) {
            decoded1 = temp.auth[1];
        }
    }

    return (
      <>
        <div>
        {(decoded ==="ROLE_ADMIN" || decoded ==="ROLE_LEADER" || decoded1 ==="ROLE_LEADER") 
          && <button className={ NoticeCSS.btn } onClick={ onClickNoticeNoticeInsert }>글쓰기</button>}</div>
        <div>
          {Array.isArray(noticeList) && noticeList.map((noticecp) => <Noticecp key={noticecp.noticeNo} prop={noticecp}></Noticecp>)}
        </div>
        <div style={{ listStyleType: "none", display: "flex" }}>
            { Array.isArray(noticeList) &&
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={NoticeCSS.pagingBtn}
            >
              &lt;
            </button>
          }
          {pageNumber.map((num) =>(
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                  style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                  className={ NoticeCSS.pagingBtn }
              >
                {num}
              </button>
            </li>
          ))}
          { Array.isArray(noticeList) &&
                <button 
                className={ NoticeCSS.pagingBtn }
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


export default Notice;