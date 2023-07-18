import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/"
})
const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        });
        axiosSecure.interceptors.response.use(res => res, async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut(user?.email);
                navigate('/login')
            }
            return Promise.reject(error)
        })
    }, [user, navigate, logOut]);
    return [axiosSecure]
};

export default useAxiosSecure;