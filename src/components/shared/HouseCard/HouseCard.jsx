import { AiFillStar } from 'react-icons/ai';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HouseCard = ({ house }) => {
    return (
        <Link to={`/housePage/${house._id}`}>
            <div className="card card-compact h-full bg-base-100 shadow hover:shadow-xl cursor-pointer">
                <figure><img src={house.picture} alt="house picture" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-xl">
                        {house.name}
                    </h2>
                    <div className="card-actions justify-between text-base">
                        <p>{house.rent_per_month} Tk / per month</p>
                        <p className='flex items-center font-semibold gap-2'><AiFillStar className='text-warning text-3xl' /> {house.rating}</p>
                    </div>
                    <p className='flex items-center text-base gap-3'><FaMapLocationDot className='text-2xl text-secondary' />{house.address}, {house.city}</p>
                </div>
            </div>
        </Link>
    );
};

export default HouseCard;