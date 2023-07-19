import axios from "axios";
import HouseCard from "../../../components/shared/HouseCard/HouseCard";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Home = () => {
    const [houseCollection, setHouseCollection] = useState([]);
    const [houseData, setHouseData] = useState({});
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const [totalHouse, setTotalHouse] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:5000/totalHouse").then(res => {
            setTotalHouse(res.data.totalHouse)
        })
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const housePerPage = 10;
    const totalPage = Math.ceil(totalHouse / housePerPage);
    const pageNumbers = [...Array(totalPage).keys()];
    const url = `http://localhost:5000/houseCollection?page=${currentPage}&limit=${housePerPage}`
    useEffect(() => {
        axios.get(url).then(res => {
            setHouseCollection(res.data)
        })
    }, [url])
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
        data.houseId = houseData._id;
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
            }
        })
    }
    return (
        <div className="py-10 space-y-10">
            <div className="form-control">
                <div className="input-group justify-center">
                    <input type="text" placeholder="Search by house name, address, city..." className="input input-bordered w-[700px]" />
                    <button className="btn btn-square btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {
                    houseCollection.map(house => <HouseCard key={house._id} house={house} openModal={openModal} setHouseData={setHouseData} />)
                }
            </div>
            <div className='text-center space-x-3'>
                {
                    totalHouse > 20 ? pageNumbers.map(number => <button
                        onClick={() => setCurrentPage(number)}
                        className={`${(currentPage === number) ? "border-2 text-xl bg-primary" : ''} px-2 rounded text-lg border border-primary`}
                        key={number}>
                        {number + 1}
                    </button>) : ''
                }
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
                                                <input type="number"{...register("renter_phone_number")} placeholder="Type here" className="input input-bordered w-full" />
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

export default Home;