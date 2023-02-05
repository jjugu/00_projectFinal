import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import FreeDetailCSS from './FreeDetail.module.css';

import Commentcp from '../../components/comment/Commentcp';

import { decodeJwt } from '../../utils/tokenUtils';
/* 로그인한 회원정보 담기 */
import {
  callGetMemberAPI
} from '../../apis/MemberAPICalls'

import {
  callFreeDetailAPI
} from '../../apis/FreeAPICalls'

import {
  callFreeDeleteAPI
} from '../../apis/FreeAPICalls'

import {
  callCommentListAPI
} from '../../apis/CommentAPICalls'

import {
  callCommentRegistAPI
} from '../../apis/CommentAPICalls'

function FreeDetail() {
  
  const comment = useSelector(state => state.commentReducer);
  // console.log("-----comment", comment)
  
  const commentList = comment.data;
  // console.log("-----commentList", commentList)

  /* 로그인한 회원정보 담기 */
  const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
  const token = decodeJwt(window.localStorage.getItem("accessToken"));   
  const memberDetail = member.data;
  
  // console.log('form값: ', form)
  /* 로그인한 회원정보 담기 */
  useEffect(
    () => {    
      console.log('token', token.sub);
      if(token !== null) {
        dispatch(callGetMemberAPI({
          memberId: token.sub
        }));
      }
      
    }
    ,[]
    );
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const free = useSelector(state => state.freeReducer);
  
  
  const url = document.location.href;
  const splitUrl = url.split('/');
  const location = splitUrl[splitUrl.length -1];
  // console.log(location);
  
        /* 댓글 페이징 */
  const pageInfo = commentList?.pageInfo;       
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
        
        const pageNumber = [];
        if(pageInfo){
          for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
          }
        }
        useEffect(
          () => {
              setStart((currentPage - 1) * 5);
              dispatch(callCommentListAPI({
                  commentNo:params.boardNo,
                  currentPage: currentPage
              }));            
          }
          ,[currentPage]
        );

  
  const onClickBackHandler = () => {
    navigate("/board/free/list", { replace: true })
  }
  
  const [form, setForm] = useState({
    boardNo: location,
    boardTitle: '',
    boardContent:'',
    memberCode: ''
  });
  // console.log("----params", params)
  useEffect(
    () => {
      dispatch(callFreeDetailAPI({
        boardNo: params.boardNo
      }));
    }
    ,[]
    );

      const onClickFreeUpdateHandler = () => {
        navigate(`/board/free/update/${free.boardNo}`, {replace: false});
    }
    
    
    const onClickFreeDeleteHandler = () => {
      // eslint-disable-next-line no-restricted-globals
      // window.confirm을 붙이거나 위의 주석을 붙여줘서 이 파일에만 rule를 적용시키면 된다
      if(!window.confirm("삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까?")){
        return false;
      }
      setForm({
        ...form,
        ['boardNo']: location,
        ['memberCode']:memberDetail.memberCode
      },);
      
      dispatch(callFreeDeleteAPI({
        form: form
      }));
      navigate("/board/free/list", { replace: true })
      window.location.reload();
    }

    /* 댓글 작성 초기값 폼*/
    const [form2, setForm2] = useState({
      boardNo: location,
      commentContent:'',
      memberCode: '',
      memberName: ''
    });

    /* 댓글 입력 핸들러 */
    const onChangeHandler = (e) => {
      setForm2({
        
        ['boardNo']: location,
        ['memberCode']:memberDetail.memberCode,
        ['memberName']:memberDetail.memberName,
        [e.target.name]: e.target.value
      });
    };
    
    /* 댓글 작성 버튼 핸들러 */
    const onClickCommentRegistrationHandler = () => {
      dispatch(callCommentRegistAPI({
        form: form2,
      }));
      window.location.reload();
      
    }
    // console.log("=====",pageInfo)
    // console.log("폼폼폼", form2)
    return (
      <div>
        {free &&
        <div>
        <br></br>
        <textarea
          className={FreeDetailCSS.title}
          cols={"129"}
          rows={"2"}
          type="text"
          name="boardTitle"
          readOnly={true}
          value={ free && free.boardTitle || ''}
          >
        </textarea>
        <hr width= "795px"></hr>
        <textarea
          className={FreeDetailCSS.content}
          cols={"129"}
          rows={"30"}
          type="text"
          name="boardContent"
          readOnly={true}
          value={ free && free.boardContent || '' }
          >
        </textarea>
        <hr width= "795px"></hr>
        <div className={FreeDetailCSS.g}>
        <button
          className={FreeDetailCSS.btn}
          onClick = { onClickBackHandler }
        >
          돌아가기
        </button>
        </div>

        { free &&
          (memberDetail?.memberCode === free?.memberCode) 
            ?
        <div className={FreeDetailCSS.g}>
        <button
          className={FreeDetailCSS.btn}
          name='boardNo'
          onClick={ onClickFreeDeleteHandler }
        >
          글 삭제
        </button>
        <button
          className={FreeDetailCSS.btn2}
          onClick = { onClickFreeUpdateHandler }
        >
          수정하기
        </button>
        </div>
        : null
        }
        <hr width= "795px"></hr>

        {/* 댓글 시작 */}
        <div className={FreeDetailCSS.g}>
        <textarea
          className={FreeDetailCSS.commentContent}
          cols={"100"}
          rows={"5"}
          type="text"
          name='commentContent'
          placeholder="댓글을 입력해주세요"
          onChange={ onChangeHandler }
        />
        &nbsp;
        <button
          className={FreeDetailCSS.commentbtn2}
          onClick = {onClickCommentRegistrationHandler}
        >
          댓글등록
        </button>
        </div>
        <hr width= "795px"></hr>
        <div>
          {commentList &&
          <Commentcp commentList={commentList}/>
          }
        </div>
        
       {/* 댓글 페이징 */}
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
       
            { commentList &&
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              // className={FreeCSS.pagingBtn}
            >
              &lt;
            </button>
          }
          {pageNumber.map((num) =>(
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                  style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                  // className={ FreeCSS.pagingBtn }
              >
                {num}
              </button>
            </li>
          ))}
          { commentList &&
                <button 
                // className={ FreeCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </div>
      }
      </div>  
  )

}
export default FreeDetail;