import axios from "axios";
import { useQuery } from "react-query";

const useFilterInfo = () => {
    const { data: filterInfo = {} } = useQuery({
        queryKey: ["FilterInfo"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/filterInfo");
            return res.data
        }
    });
    return { filterInfo }
};

export default useFilterInfo;