import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthProtectRouter = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>loading</p>
    }
    else if (user) {
        return <Navigate to={"/"} replace={true} />
    } else {
        return children
    }
};

export default AuthProtectRouter;