import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { dateFormat } from "../../lib/dateFormat";
import Title from "../../components/admin/Title";
import { useAppContext } from "../../context/AppContext";

const Listshows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user } = useAppContext();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllshows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(data.shows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllshows();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table
          className="w-full border-collapse rounded-md overflow-hidden
   text-nowrap"
        >
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium p1-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10
      bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 p1-5">{show.movie.title}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Listshows;
