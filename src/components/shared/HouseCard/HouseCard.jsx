import { AiFillStar } from 'react-icons/ai';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HouseCard = ({ house, openModal, setHouseData }) => {
    return (
        <div className="card card-compact h-full bg-base-100 shadow hover:shadow-xl">
            <figure><img src={house.picture} className='w-full h-64 object-cover' alt="house picture" /></figure>
            <div className="card-body">
                <h2 className="card-title text-xl">
                    {house.name}
                </h2>
                <div className="card-actions justify-between text-base">
                    <p>{house.rent_per_month} Tk / per month</p>
                    <p className='flex items-center font-semibold gap-2 justify-end'><AiFillStar className='text-warning text-3xl' /> {house.rating}</p>
                </div>
                <p className='flex items-center gap-3'><FaMapLocationDot className='text-2xl text-secondary' />{house.address}, {house.city}</p>
                <div className="card-actions justify-between items-center">
                    <button onClick={() => { setHouseData(house), openModal() }} className="btn btn-primary">Book Now</button>
                    <Link className='cursor-pointer' to={`/housePage/${house._id}`}><FiArrowRightCircle className='text-3xl text-primary' /></Link>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;