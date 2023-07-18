import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import ClinetContainer from "../../components/ClientContainer";


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <ClinetContainer>
                <Outlet />
            </ClinetContainer>
            <Footer />
            <ScrollRestoration />
        </>
    );
};

export default MainLayout;