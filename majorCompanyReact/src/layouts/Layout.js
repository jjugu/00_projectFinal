import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import LayoutCSS from "./Layout.module.css";

function Layout() {

    return (
        <>
            <Header/>
            <Navbar/>
            <main className={ LayoutCSS.main }>
                <Outlet/>
            </main>
            
        </>
    );
}

export default Layout;