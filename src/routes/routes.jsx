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
import AuthProtectRouter from "./AuthProtectRouter";
import AllProtectRouter from "./AllProtectRouter";
import UpdateHouseData from "../Dashboard/houseOwner/pages/UpdateHouseData/UpdateHouseData";

export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout />, children: [
            { path: "/", element: <Home /> },
            { path: "/housePage/:id", element: <AllProtectRouter><HousePage /></AllProtectRouter> },
            { path: "/searchHouse/search", element: <SearchHouses /> },
            { path: "/login", element: <AuthProtectRouter><Login /></AuthProtectRouter> },
            { path: "/register", element: <AuthProtectRouter><Register /></AuthProtectRouter> },
        ]
    },
    {
        path: "/dashboard", element: <DashboardLayout />, children: [
            { path: "/dashboard", element: <AllProtectRouter><Dashboard /></AllProtectRouter> },
            { path: "/dashboard/addNewHouse", element: <AllProtectRouter><AddNewHouse /></AllProtectRouter> },
            { path: "/dashboard/updateHouseData/:id", element: <AllProtectRouter><UpdateHouseData /></AllProtectRouter> },
            { path: "/dashboard/manageOwnHouses", element: <AllProtectRouter><OwnHouses /></AllProtectRouter> },
            { path: "/dashboard/manageHouseBookings", element: <AllProtectRouter><ManageHousesBookings /></AllProtectRouter> },
            { path: "/dashboard/myBookedHouses", element: <AllProtectRouter><BookedHouse /></AllProtectRouter> },
        ]
    }
])