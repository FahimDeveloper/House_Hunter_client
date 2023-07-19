import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { BsFillHouseAddFill } from "react-icons/bs";

const UpdateHouseData = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();
    const { data: houseData = {}, isLoading } = useQuery({
        queryKey: ["houseDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleHouseData/${id}`);
            return res.data
        }
    })
    const onSubmit = data => {
        data.rent_per_month = parseInt(data.rent_per_month)
        data.room_size = parseInt(data.room_size)
        data.bedrooms = parseInt(data.bedrooms)
        data.bathrooms = parseInt(data.bathrooms)
        data.kitchen = parseInt(data.kitchen)
        data.rating = parseInt(data.rating)
        axiosSecure.put(`/updateHouseData/${houseData._id}`, data).then(data => {
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'update successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/manageOwnHouses")
            }
        })

    };
    if (isLoading) {
        return <p>Loading</p>
    }
    return (
        <div className="py-10 min-h-screen flex items-center justify-center">
            <div className="space-y-10 border rounded-lg px-20 py-10 w-full">
                <h2 className="text-center text-4xl font-bold">Update house data</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Appertment or house name</span>
                            </label>
                            <input type="text" {...register("name")} defaultValue={houseData?.name} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Appertment or house name</span>
                            </label>
                            <input type="text" {...register("address")} defaultValue={houseData?.address} required placeholder="street, road address..." className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text"{...register("city")} defaultValue={houseData?.city} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Monthly rent</span>
                            </label>
                            <input type="number"{...register("rent_per_month")} defaultValue={houseData?.rent_per_month} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Bedrooms</span>
                            </label>
                            <input type="number"{...register("bedrooms")} defaultValue={houseData?.bedrooms} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Bathrooms</span>
                            </label>
                            <input type="number"{...register("bathrooms")} defaultValue={houseData?.bathrooms} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Kitchen</span>
                            </label>
                            <input type="number"{...register("kitchen")} defaultValue={houseData?.kitchen} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Room size in sqr fit</span>
                            </label>
                            <input type="number"{...register("room_size")} defaultValue={houseData?.room_size} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="number"{...register("rating")} defaultValue={houseData?.rating} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Availability date</span>
                            </label>
                            <input type="date"{...register("availability_date")} defaultValue={houseData?.availability_date} required className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"{...register("houseOwner")} defaultValue={user?.email} readOnly placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="tel"{...register("phone_number", { pattern: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/ })} placeholder="Type here" defaultValue={houseData.phone_number} className="input input-bordered w-full" />
                            {errors.phone_number && <span className="text-red-600">It is not bd number, Please check the number and re write it</span>}
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Small description</span>
                        </label>
                        <textarea {...register('description')} defaultValue={houseData?.description} required className="textarea textarea-bordered" placeholder="Description"></textarea>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary px-10"><BsFillHouseAddFill className="text-xl" /> update house data</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateHouseData;