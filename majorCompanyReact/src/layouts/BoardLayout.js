import { Outlet, useNavigate } from "react-router-dom";
// import { Navigate } from "rect-router-dom";
import { useEffect } from "react";
import BoardNavbar from "../components/common/BoardNavbar";

function BoardLayout() {
  
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/board/free/list", { replace: false });
  },
  []);
  
  return (
    <>
        <BoardNavbar/>
        <Outlet/>
    </>
  )

}
export default BoardLayout;