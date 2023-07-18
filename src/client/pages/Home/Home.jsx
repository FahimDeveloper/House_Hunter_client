import axios from "axios";
import HouseCard from "../../../components/shared/HouseCard/HouseCard";
import { useEffect, useState } from "react";


const Home = () => {
    const [houseCollection, setHouseCollection] = useState([]);
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
        </div>
    );
};

export default Home;