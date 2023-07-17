import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../client/layout/MainLayout";
import Home from "../client/pages/Home/Home";
import HousePage from "../client/pages/HousePage/HousePage";
import SearchHouses from "../client/pages/SearchHouses/SearchHouses";
import Login from "../client/pages/Authentication/Login/Login";
import Register from "../client/pages/Authentication/Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/layout/DashboardLayout";
import AddNewHouse from "../Dashboard/houseOwner/pages/AddNewHouse/AddNewHouse";
import OwnHouses from "../Dashboard/houseOwner/pages/OwnHouses/OwnHouses";
import ManageHousesBookings from "../Dashboard/houseOwner/pages/ManageHousesBookings/ManageHousesBookings";
import BookedHouse from "../Dashboard/houseRenter/Pages/BookedHouse/BookedHouse";

export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout />, children: [
            { path: "/", element: <Home /> },
            { path: "/housePage/:id", element: <HousePage /> },
            { path: "/searchHouse/search/:searchText", element: <SearchHouses /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ]
    },
    {
        path: "/dashboard", element: <DashboardLayout />, children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/dashboard/addNewHouse", element: <AddNewHouse /> },
            { path: "/dashboard/ownHouses", element: <OwnHouses /> },
            { path: "/dashboard/manageHousesBookings", element: <ManageHousesBookings /> },
            { path: "/dashboard/myBookedHouses", element: <BookedHouse /> },
        ]
    }
])