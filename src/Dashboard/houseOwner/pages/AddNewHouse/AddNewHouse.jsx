import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { BsFillHouseAddFill } from 'react-icons/bs';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddNewHouse = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const onSubmit = data => {
        console.log(data)
        const formData = new FormData();
        console.log(data.picture[0])
        formData.append('image', data.picture[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(imgResponse => {
            if (imgResponse.success) {
                data.picture = imgResponse.data.display_url;
                data.rent_per_month = parseInt(data.rent_per_month)
                data.room_size = parseInt(data.room_size)
                data.bedrooms = parseInt(data.bedrooms)
                data.bathrooms = parseInt(data.bathrooms)
                data.kitchen = parseInt(data.kitchen)
                data.rating = parseInt(data.rating)
                axiosSecure.post(`/addNewHouse`, data).then(data => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Add house successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        reset();
                        navigate("/dashboard/manageOwnHouses")
                    }
                })
            }
        })

    };
    return (
        <div className="py-10 min-h-screen flex items-center justify-center">
            <div className="space-y-10 border rounded-lg px-20 py-10 w-full">
                <h2 className="text-center text-4xl font-bold">Add New House</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Appertment or house name</span>
                            </label>
                            <input type="text" {...register("name")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Appertment or house name</span>
                            </label>
                            <input type="text" {...register("address")} required placeholder="street, road address..." className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text"{...register("city")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Monthly rent</span>
                            </label>
                            <input type="number"{...register("rent_per_month")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Bedrooms</span>
                            </label>
                            <input type="number"{...register("bedrooms")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Bathrooms</span>
                            </label>
                            <input type="number"{...register("bathrooms")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Kitchen</span>
                            </label>
                            <input type="number"{...register("kitchen")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Room size in sqr fit</span>
                            </label>
                            <input type="number"{...register("room_size")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="number"{...register("rating")} required placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Availability date</span>
                            </label>
                            <input type="date"{...register("availability_date")} required className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"{...register("houseOwner")} value={user?.email} placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="tel"{...register("phone_number", { pattern: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/ })} className="input input-bordered w-full" />
                            {errors.phone && <span className="text-red-600">It is not bd number, Please check the number and re write it</span>}
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Small description</span>
                        </label>
                        <textarea {...register('description')} required className="textarea textarea-bordered" placeholder="Description"></textarea>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Appertmnet or house picture</span>
                        </label>
                        <input type="file" {...register("picture")} required className="file-input file-input-bordered file-input-primary w-full" />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary px-10"> <BsFillHouseAddFill className="text-xl" /> Add house</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewHouse;