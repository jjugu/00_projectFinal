import { Outlet, useNavigate } from "react-router-dom";
import ManagementLayoutCSS from "./ManagementLayout.module.css";
import ManagementNavbar from "../pages/management/ManagementNavbar";
import { useEffect } from "react";
import { decodeJwt } from '../utils/tokenUtils';

function ManagementLayout() {
    const token = decodeJwt(window.localStorage.getItem("accessToken"));     
    const navigate = useNavigate();

    let decoded = null;
    let decoded1 = null;

    if(token !== undefined && token !== null) {
        decoded = token.auth[0];
        if(token.auth[1] != null) {
            decoded1 = token.auth[1];
        }
    }

    useEffect(() => {
        if(decoded == 'ROLE_USER') {
            navigate("/error", { replace: false });    
        } else {
            navigate("/management", { replace: false });
        }
    }, 
    []);


    return (
        <>
            <div className={ManagementLayoutCSS.myPageLayoutDiv }>
                <ManagementNavbar />
                <main className={ ManagementLayoutCSS.main }>
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default ManagementLayout;