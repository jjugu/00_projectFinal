import { useEffect } from 'react';
import CommentcpCSS from './Commentcp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callCommentUpdateAPI } from '../../apis/CommentAPICalls';
import {
  callGetMemberAPI
} from '../../apis/MemberAPICalls'
import{
  callCommentDeleteAPI
} from '../../apis/CommentAPICalls'
import { filterHash } from '@fullcalendar/core/internal';

function Commentcp({ commentList} ) {
    useEffect(
      () => {    
      }
    );
    // console.log("컴포넌트 commentList", commentList)
    // console.log("컴포", commentList[0].commentList.commentList)
    // console.log("컴포넌트 commentList.memeber.memberName", commentList.member.memberName);
    // console.log("컴포넌트 commentList.commentList", commentList.commentList)
    // console.log("컴포넌트 commentList.commentList[0].commentContent", commentList.commentList[0].commentContent)
    // console.log("컴포넌트 map", commentList.commentList.map(comment => comment.commentContent));

    // map 사용 상태
    const comList = commentList.data;
    // comment.commentContent
    // console.log(comment)


    // 수정
    const url = document.location.href;
    const splitUrl = url.split('/');
    const location = splitUrl[splitUrl.length -1];  
    /* 로그인한 회원정보 담기 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);   // 로그인 하고 이 페이지 오기 전에 memberReducer에 맞는 state값이 store에 담겨야 함
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberDetail = member.data;
    // const memberDetail = member.data;

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

    // /* 댓글 수정 */

    // const [modifyMode, setModifyMode] = useState(false);
    // const [form, setForm] = useState({});
    // const onChangeHandler = (e) => {
    //   setForm({
    //    ...form,
    //    [e.target.name]: e.target.value
    //   });
    // };

    // const onClickModifyModeHandler = () => {
    //  setModifyMode(true);
    //  setForm({
    //    ['boardNo']: location,
    //    ['commnetNo']:commentList.commentNo,
    //    ['commentContent']:commentList.commentContent
    //  })
    // }
    // // console.log("맵을돌려보자", comList.map(comment => comment.member.memberName))

    // const onClickCommentUpdateHandler = () => {
    // dispatch(callCommentUpdateAPI({
    //   form: form
    // }));

    // navigator(`/board/free/location`,{replace: true});
    // }


    /*댓글 삭제 */
    
    // console.log("00",comList[0].commentList)
    // const tt = comList[0].commentList.map(comment => comment.commentNo)
    // const [form, setForm] = useState({});
    const onClickCommentDeleteHandler = (e) => {
      // console.log("tt",e.target.previousSibling)
      console.log("tt",e.target.value)
      // eslint-disable-next-line no-restricted-globals
      // window.confirm을 붙이거나 위의 주석을 붙여줘서 이 파일에만 rule를 적용시키면 된다
      if(!window.confirm("삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까?")){
        return false;
      }
      // console.log("tt2",e.target.previousSibling)
      // setForm({
      //   ...form,
      //   [e.target.name]: e.target.value,
      // });
 
      dispatch(callCommentDeleteAPI({
        form:e.target.value
      }));
      window.location.reload();
    }

    return (
      <div>
        {/* {commentList.commentList[0].commentContent}
        {commentList.commentList[0].createdDate}
        {commentList.commentList[0].modifiedDate}
        {commentList.member.memberName}
        <br/> */}


        { commentList &&
          <div className={CommentcpCSS.comment}>
          {comList[0].commentList.map((c) => (
            <div key={ c.commentNo}>
              { c.commentContent }
              <br/>
              작성자 :&nbsp;
              { c.member.memberName } &nbsp;&nbsp;
              작성일 :&nbsp;
              { c.createdDate } &nbsp;&nbsp;
              수정일 :&nbsp;
              { c.modifiedDate }
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* {c.commentNo} */}
            

              {/* 수정 */}
              { commentList &&
                (memberDetail?.memberCode === c.member?.memberCode) ?
               
                //  <div>{!modifyMode && 
                //  <button       
                //  // className={ ReviewDetailCSS.backBtn }
                //  onClick={ onClickModifyModeHandler }
                //  >
                //   수정모드
                // </button>
                // }
                // {modifyMode &&
                // <div>
                // <textarea
                // defaultValue={ c.commentContent || '' }
                // rows={"5"}
                // type="text"
                // name="commentContent"
                // onChange={ onChangeHandler }
                // cols={"95"}
                // />
                // </div>
                // }
                // {modifyMode &&
                // <button       
                // // className={ ReviewDetailCSS.backBtn }
                // onClick={ onClickCommentUpdateHandler }             
                // >
                //   리뷰 수정 저장하기
                // </button>
                // }

                // 삭제
                <button
                  className={CommentcpCSS.btn}
                  name='commentNo'
                  value={c.commentNo}
                  onClick={ onClickCommentDeleteHandler }
                >
                  삭제
                </button>
                // </div>
                : null
              }
              <hr/>
            </div>
            ))}
          </div>
       }
      </div>
    )
}
export default Commentcp;