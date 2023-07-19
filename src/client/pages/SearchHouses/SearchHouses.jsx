import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import useFilterInfo from "../../../hooks/useFilterInfo";
import HouseCard from "../../../components/shared/HouseCard/HouseCard";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const SearchHouses = () => {
    const { filterInfo } = useFilterInfo();
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [houseData, setHouseData] = useState({});
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [seachHouses, setSearchHouses] = useState([]);
    const searchUrl = `http://localhost:5000/searchHouses?searchText=${searchText}`;
    useEffect(() => {
        axios.get(searchUrl).then(res => setSearchHouses(res.data))
    }, [searchUrl, searchText]);
    const handleSearchText = (text) => {
        setSearchText(text);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        if (user) {
            reset();
            setIsOpen(true)
        } else {
            Swal.fire({
                title: 'You have to login',
                text: "Need login for house booking",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Go for login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            })
        }
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
                closeModal();
                navigate('/dashboard/myBookedHouses')
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Sorry',
                    text: `${res.data}`,
                })
            }
        })
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center py-10 px-5 space-y-10">
                <div className="form-control">
                    <div className="input-group justify-center">
                        <input onChange={(e) => handleSearchText(e.target.value)} type="text" placeholder="Search by house name, address, city..." className="input input-bordered w-[700px]" />
                        <button className="btn btn-square btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {seachHouses.map(house => <HouseCard key={house._id} house={house} setHouseData={setHouseData} openModal={openModal} />)}
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
                                                <p>City : {houseData.city}</p>
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
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="p-4 bg-lime-100 w-80 min-h-full text-base-content space-y-5">
                    <h2 className="text-2xl font-medium">Filter By</h2>
                    <div className="space-y-2">
                        <p>City</p>
                        {
                            filterInfo?.cities?.map((city, index) => {
                                return (
                                    <div key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input id={index} type="checkbox" className="checkbox checkbox-secondary" />
                                            <span>{city}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-2">
                        <p>Bedrooms</p>
                        {
                            filterInfo?.bedrooms?.map((bedroom, index) => {
                                return (
                                    <div key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input id={index} type="checkbox" className="checkbox checkbox-secondary" />
                                            <span>{bedroom}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-2">
                        <p>Bathrooms</p>
                        {
                            filterInfo?.bathrooms?.map((bathroom, index) => {
                                return (
                                    <div key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input id={index} type="checkbox" className="checkbox checkbox-secondary" />
                                            <span>{bathroom}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-2">
                        <p>Kitchens</p>
                        {
                            filterInfo?.kitchens?.map((kitchen, index) => {
                                return (
                                    <div key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input id={index} type="checkbox" className="checkbox checkbox-secondary" />
                                            <span>{kitchen}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-2">
                        <p>Room size</p>
                        {
                            filterInfo?.roomSizes?.map((room, index) => {
                                return (
                                    <div key={index} className="form-control">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input id={index} type="checkbox" className="checkbox checkbox-secondary" />
                                            <span>{room} sq fit</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchHouses;