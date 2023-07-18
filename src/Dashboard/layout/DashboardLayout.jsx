import { NavLink, Outlet } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer";
import useAuth from "../../hooks/useAuth";
import { BsFillHouseCheckFill, BsFillHouseGearFill, BsBook } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { BiSolidContact } from 'react-icons/bi';


const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <DashboardContainer>
                    <Outlet />
                </DashboardContainer>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-lime-100 text-base-content space-y-5">
                    <h2 className="text-xl text-center">{user?.userRole === "house owner" ? "House Owner Dashboard" : "House Renter Dashboard"}</h2>
                    <div className="card card-compact bg-base-100 shadow">
                        <div className="card-body text-center">
                            <h2 className="card-title mx-auto">{user?.name}</h2>
                            <p>{user?.email}</p>
                            <p>Role : {user?.userRole}</p>
                            <div>
                                <button onClick={() => logOut(user?.email)} className="btn btn-sm btn-primary">Log out</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        {
                            user?.userRole === "house owner" ?
                                <>
                                    <NavLink to="manageOwnHouses" className="dashboardNavStyle"><BsFillHouseGearFill className="text-2xl" /> Manage Own Houses</NavLink>
                                    <NavLink to="manageHouseBookings" className="dashboardNavStyle"><BsFillHouseCheckFill className="text-2xl" /> Manage House Bookings</NavLink>
                                </>
                                :
                                <NavLink to="myBookedHouses" className="dashboardNavStyle"><BsFillHouseCheckFill className="text-2xl" /> Booked Houses</NavLink>

                        }
                        <div className="divider">OR</div>
                        <NavLink to="/" className="dashboardNavStyle"><FaHome className="text-2xl" /> Home</NavLink>
                        <NavLink to="/" className="dashboardNavStyle"><BsBook className="text-2xl" /> Blog</NavLink>
                        <NavLink to="/" className="dashboardNavStyle"><BiSolidContact className="text-2xl" /> Contact us</NavLink>
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;