import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../../../assets/AuthAnimation.json"
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { setCheckUser, checkUser } = useAuth();
    const onSubmit = (data) => {
        data.loggedIn = true;
        axios.post("http://localhost:5000/addNewUser", data).then(data => {
            if (data.data.insertedId) {
                localStorage.setItem("userId", data.data.insertedId);
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
                <div className="space-y-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <h3 className="text-center text-3xl font-medium">Sign Up</h3>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name')} placeholder="Enter your name" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email')} placeholder="Enter your email" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="number" {...register("phone")} placeholder="Enter your phone number" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Chooce your role</span>
                            </label>
                            <select {...register("userRole")} className="select select-bordered w-full" required>
                                <option selected disabled value="">select an option</option>
                                <option value="house owner">As a house owner</option>
                                <option value="house renter">As a house renter</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password')} placeholder="Enter your password" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <button className="btn btn-primary w-full mt-2">sign up</button>
                        </div>
                    </form>
                    <div className="text-center space-y-2">
                        <p className="text-primary">Already registered? <Link to="/login" className="font-semibold">Go to login</Link></p>
                    </div>
                </div>
                <Lottie animationData={animation} loop={true} />
            </div>
        </div>
    );
};

export default Register;