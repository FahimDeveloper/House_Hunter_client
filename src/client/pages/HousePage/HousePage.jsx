import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMapLocationDot, FaBath } from "react-icons/fa6";
import { IoIosBed } from "react-icons/io";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import Rating from "react-rating";
import moment from "moment/moment";
import useAuth from "../../../hooks/useAuth";


const HousePage = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const { data: houseData = {} } = useQuery({
        queryKey: ["houseDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleHouseData/${id}`);
            return res.data
        }
    })
    return (
        <div className="perfect-screen flex items-center justify-center">
            <div className="card grid grid-cols-5 bg-base-100 shadow-xl">
                <figure className="col-span-3"><img src={houseData.picture} className="h-full" alt="House picture" /></figure>
                <div className="card-body col-span-2 space-y-5">
                    <h2 className="card-title text-3xl">{houseData.name}</h2>
                    <div className="space-y-2">
                        <h3 className="text-xl capitalize font-medium mb-3">house information :</h3>
                        <p className='detailStyle'>Location : <FaMapLocationDot className='text-2xl' />{houseData.address}, {houseData.city}</p>
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
                                <button className="btn btn-primary">Booking now</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousePage;