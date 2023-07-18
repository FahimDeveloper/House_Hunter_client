import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const HousePage = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const { data: houseData = {} } = useQuery({
        queryKey: ["houseDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleHouseData/${id}`);
            return res.data
        }
    })
    console.log(houseData)
    return (
        <div>

        </div>
    );
};

export default HousePage;