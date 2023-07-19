import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMapLocationDot, FaBath } from "react-icons/fa6";
import { IoIosBed } from "react-icons/io";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import Rating from "react-rating";
import moment from "moment/moment";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'


const HousePage = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const { data: houseData = {} } = useQuery({
        queryKey: ["houseDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleHouseData/${id}`);
            return res.data
        }
    });
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        reset()
        setIsOpen(true)
    }
    const onSubmit = data => {
        data.houseOwner = houseData.houseOwner;
        data.picture = houseData.picture
        data.houseId = houseData._id;
        data.houseName = houseData.name;
        data.city = houseData.city;
        data.rent = houseData.rent_per_month;
        data.availability_date = houseData.availability_date;
        axiosSecure.post("/bookingHouse", data).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your house booked successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                closeModal()
                navigate('/dashboard/myBookedHouses')
            }
        })
    }
    return (
        <div className="perfect-screen flex items-center justify-center">
            <div className="card max-h-[700px] overflow-hidden grid grid-cols-5 bg-base-100 shadow-xl">
                <figure className="col-span-3"><img src={houseData.picture} className="h-full w-full object-cover" alt="House picture" /></figure>
                <div className="card-body col-span-2 space-y-5">
                    <h2 className="card-title text-3xl">{houseData.name}</h2>
                    <div className="space-y-2">
                        <h3 className="text-xl capitalize font-medium mb-3">house information :</h3>
                        <p className='detailStyle'>Location : <FaMapLocationDot className='text-2xl' />{houseData.address}, {houseData.city}</p>
                        <p className="detailStyle">Room size : {houseData.room_size} sqr fit</p>
                        <p className="detailStyle">Bedrooms : {houseData.bedrooms} <IoIosBed className="text-2xl" /></p>
                        <p className="detailStyle">Bathrooms : {houseData.bathrooms} <FaBath className="text-2xl" /></p>
                        <p className="detailStyle">Kitchen : {houseData.kitchen} <TbToolsKitchen2 className="text-2xl" /></p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl capitalize font-medium mb-3">Rent or detail information</h3>
                        <p className="detailStyle">Rent : {houseData.rent_per_month} Tk / per month</p>
                        <p className="text-base">Availability : {moment(houseData.availability_date).format("dddd, MMMM Do YYYY,")}</p>
                        <p className="text-base">Details : {houseData.description}</p>
                        <p className="detailStyle">
                            rating : {houseData.rating} <Rating
                                placeholderRating={houseData.rating}
                                emptySymbol={<BsStar className="text-warning text-2xl" />}
                                placeholderSymbol={<BsFillStarFill className="text-warning text-2xl" />}
                                fullSymbol={<BsFillStarFill className="text-warning text-2xl" />}
                                readonly
                            />
                        </p>
                    </div>
                    <div>
                        {
                            user.userRole === "house owner" ?
                                <>
                                    <p className="text-accent">You are not booking any house, cause you are a house owner</p>
                                    <button disabled={user.userRole === "house owner" ? true : false} className="btn btn-primary">Booking now</button>
                                </>
                                :
                                <button onClick={openModal} className="btn btn-primary">Booking now</button>
                        }
                    </div>
                </div>
            </div>
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl space-y-4 bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Booking a house
                                        </Dialog.Title>
                                        <div className="space-y-2">
                                            <p>House name : <span className="font-medium">{houseData.name}</span></p>
                                            <p>Rent per month : {houseData.rent_per_month} Tk</p>
                                            <p>city : {houseData.city}</p>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input type="name" {...register("renter_name")} defaultValue={user?.name} readOnly className="input input-bordered w-full" />
                                            </div>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Email</span>
                                                </label>
                                                <input type="email"{...register("renter_email")} defaultValue={user?.email} readOnly className="input input-bordered w-full" />
                                            </div>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Phone</span>
                                                </label>
                                                <input type="number"{...register("renter_phone_number")} required placeholder="Type here" className="input input-bordered w-full" />
                                            </div>
                                            <div className="mt-3 text-end">
                                                <button className="btn btn-primary px-10">Book</button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        </div>
    );
};

export default HousePage;