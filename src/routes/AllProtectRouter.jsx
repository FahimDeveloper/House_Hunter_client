import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AllProtectRouter = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>Loading</p>
    } else if (user) {
        return children
    } else {
        return <Navigate to={'/login'} replace={true} />
    }
};

export default AllProtectRouter;