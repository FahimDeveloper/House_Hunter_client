import axios from "axios";
import { useQuery } from "react-query";
import HouseCard from "../../../components/shared/HouseCard/HouseCard";


const Home = () => {
    const { data: houseCollection = [] } = useQuery({
        queryKey: ["houseCollection"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/houseCollection");
            return res.data
        }
    })
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
                    houseCollection.map(house => <HouseCard key={house._id} house={house} />)
                }
            </div>
        </div>
    );
};

export default Home;