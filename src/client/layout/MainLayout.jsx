import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import ClinetContainer from "../../components/ClinetContainer";


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <ClinetContainer>
                <Outlet />
            </ClinetContainer>
            <Footer />
        </>
    );
};

export default MainLayout;