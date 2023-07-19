import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const BookedHouse = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: bookedHouses = [], refetch } = useQuery({
        queryKey: ["bookedHouses"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ownBookedHouses/${user?.email}`);
            return res.data
        }
    })
    const handleRemoveBooking = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/removeBookedHouse/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Remove Booking successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        })
    }
    return (
        <div className="py-16 space-y-10">
            <h2 className="text-center text-4xl font-bold">Your Booked houses</h2>
            <p className="text-center text-lg font-medium">You will booked maximum 2 house</p>
            <div className="grid grid-cols-2 gap-5">
                {bookedHouses.map(house => {
                    return (
                        <div key={house._id} className="card card-compact grid grid-cols-2 bg-base-100 shadow-xl">
                            <figure><img src={house.picture} alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{house.houseName}</h2>
                                <p>City : {house.city}</p>
                                <p>Rent : {house.rent} Tk / per month</p>
                                <p>Available : {moment(house.availability_date).format("dddd, MMMM Do YYYY,")}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/housePage/${house.houseId}`}><button className="btn btn-primary btn-sm">view</button></Link>
                                    <button onClick={() => handleRemoveBooking(house._id)} className="btn btn-accent btn-sm">remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default BookedHouse;