import {
  ChartLineIcon,
  IndianRupee,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching dashboard data:", error);
    }
  };

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || "0"}`,
      icon: IndianRupee,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div>
        {/* <BlurCircle top="-100px" left="0" /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-zinc-900 text-white p-4 rounded-xl shadow-md"
              >
                <div>
                  <h3 className="text-sm text-gray-400">{card.title}</h3>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {card.value}
                  </p>
                </div>
                <div className="bg-zinc-800 p-2 rounded-full">
                  <Icon className="text-primary" size={28} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-55 rounded-lg overflow-hidden
          h-full pb-3 bg-primary/10 border border-primary/20
          hover:translate-y-1 transition duration-300"
          >
            <img
              src={image_base_url + show.movie.poster_path}
              alt=""
              className="h-60
      w-full object-cover"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>
              <p
                className="flex items-center gap-1 text-sm
      text-gray-400 mt-1 pr-1"
              >
                <StarIcon
                  className="w-4 h-4 text-primary
          fill-primary"
                />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
