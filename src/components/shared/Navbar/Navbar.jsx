import { NavLink } from "react-router-dom";
import ClinetContainer from "../../ClientContainer";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { user, logOut } = useAuth();
    return (
        <ClinetContainer>
            <div className="navbar bg-base-100 py-5 justify-between">
                <a href="/" className="text-3xl font-semibold italic">House Hunter</a>
                <div className="space-x-5 text-lg font-medium">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Contact us</NavLink>
                    <NavLink to="/">Blog</NavLink>
                    {
                        user ?
                            <>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <button onClick={() => logOut(user.email)} className="btn btn-sm btn-primary">Log out</button>
                            </>
                            : <NavLink to="/login">Login</NavLink>

                    }
                </div>
            </div>
        </ClinetContainer>
    );
};

export default Navbar;