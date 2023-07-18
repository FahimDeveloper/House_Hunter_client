import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { BsFillHouseAddFill } from 'react-icons/bs';

const OwnHouses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const { data: ownHouses = [] } = useQuery({
        queryKey: ["OwnHouses", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ownHouses/${user?.email}`);
            return res.data
        }
    });
    return (
        <div className="py-16 space-y-10">
            <h2 className="text-center text-4xl font-bold">Manage Own Houses</h2>
            <div className="text-end"><Link to="/dashboard/addNewHouse" className="btn btn-primary"> <BsFillHouseAddFill className="text-xl" /> add new house</Link></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Availability</th>
                            <th>Rent per month</th>
                            <th>More details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            ownHouses.map((house, index) => {
                                return (
                                    <tr key={house._id}>
                                        <th>{index + 1}</th>
                                        <td>{house.name}</td>
                                        <td>{house.city}</td>
                                        <td>{house.availability_date}</td>
                                        <td>{house.rent_per_month}</td>
                                        <td><Link to={`/housePage/${house._id}`} className="btn btn-secondary btn-outline btn-sm">view details</Link></td>
                                        <td className="space-x-2">
                                            <Link to={`/dashboard/updateHouseData/${house._id}`}><button className="btn btn-sm btn-primary btn-outline">update</button></Link>
                                            <button className="btn btn-sm btn-accent btn-outline">delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OwnHouses;