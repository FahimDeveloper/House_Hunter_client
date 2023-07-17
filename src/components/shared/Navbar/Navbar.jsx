import { NavLink } from "react-router-dom";
import ClinetContainer from "../../ClientContainer";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { user, logOut } = useAuth();
    return (
        <ClinetContainer>
            <div className="navbar bg-base-100 py-4 items-center">
                <div className="flex-1">
                    <a href="/" className="text-3xl font-semibold italic">House Hunter</a>
                </div>
                <div className="flex-1 space-x-5">
                    <NavLink to="/">Home</NavLink>
                    {
                        user ?
                            <button onClick={() => logOut(user.email)} className="btn btn-sm btn-primary">Log out</button>
                            : <NavLink to="/login">Login</NavLink>

                    }
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search house" className="input input-bordered w-96" />
                            <button className="btn btn-square btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                    {/* <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Logout</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </ClinetContainer>
    );
};

export default Navbar;