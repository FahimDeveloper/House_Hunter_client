import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../../../assets/AuthAnimation.json"
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";


const Login = () => {
    const { register, handleSubmit } = useForm();
    const { setCheckUser, checkUser } = useAuth();
    const onSubmit = (data) => {
        axios.post("http://localhost:5000/loginUser", data).then(data => {
            if (data.data.user) {
                localStorage.setItem("userId", data.data.user._id);
                setCheckUser(!checkUser)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.data}`,
                })
            }
        })
    }
    return (
        <div className="perfect-screen flex items-center justify-center">
            <div className="bg-white shadow-xl border w-full grid grid-cols-2 items-center gap-10 p-20 rounded-xl">
                <Lottie animationData={animation} loop={true} />
                <div className="space-y-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <h3 className="text-center text-3xl font-medium">Sign In</h3>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email')} placeholder="Enter your email" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password')} placeholder="Enter your password" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <button className="btn btn-primary w-full mt-2">sign in</button>
                        </div>
                    </form>
                    <div className="text-center space-y-2">
                        <p className="text-primary">New here? <Link to="/register" className="font-semibold">Create a New Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;