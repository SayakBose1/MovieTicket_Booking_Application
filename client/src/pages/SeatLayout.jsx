// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
// import isoTimeFormat from "../lib/isoTimeFormat";
// import toast from "react-hot-toast";
// import { ArrowRightIcon, ClockIcon } from "lucide-react";
// import BlurCircle from "../components/BlurCircle";
// import Loading from "../components/Loading";
// import { useAppContext } from "../context/AppContext";

// const SeatLayout = () => {
//   const groupRows = [
//     ["A", "B"],
//     ["C", "D"],
//     ["E", "F"],
//     ["G", "H"],
//     ["I", "J"],
//   ];
//   const { id, date } = useParams();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [show, setShow] = useState(null);
//   const [occupiedSeats, setOccupiedSeats] = useState([]);
//   const { axios, getToken, user } = useAppContext();
//   const navigate = useNavigate();

//   const getShow = async () => {
//     try {
//       const { data } = await axios.get(`/api/show/${id}`);
//       if (data.success) {
//         setShow(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSeatClick = (seatId) => {
//     if (!selectedTime) {
//       return toast("please select time first");
//     }
//     if (selectedSeats.includes(seatId)) {
//       // Deselect the seat if already selected
//       setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
//     } else {
//       if (selectedSeats.length >= 5) {
//         return toast("You can only select 5 seats");
//       }
//       if (occupiedSeats.includes(seatId)) {
//         return toast("This Seat is already booked");
//       }
//       // Add new seat to selection
//       setSelectedSeats((prev) => [...prev, seatId]);
//     }
//   };

//   const renderSeats = (row, count = 9) => (
//     <div key={row} className="flex gap-2 mt-2">
//       <div className="flex flex-wrap items-center justify-center gap-2">
//         {Array.from({ length: count }, (_, i) => {
//           const seatId = `${row}${i + 1}`; // You asked not to change this
//           return (
//             <button
//               key={seatId}
//               onClick={() => handleSeatClick(seatId)}
//               disabled={occupiedSeats.includes(seatId)} // disable click for booked
//               className={`h-8 w-8 rounded border border-primary/60
//         ${
//           occupiedSeats.includes(seatId)
//             ? "bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed"
//             : selectedSeats.includes(seatId)
//             ? "bg-primary text-white"
//             : "cursor-pointer hover:bg-primary/10"
//         }`}
//             >
//               {seatId}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const getOccupiedSeats = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/booking/seats/${selectedTime.showId}`
//       );
//       if (data.success) {
//         setOccupiedSeats(data.occupiedSeats);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const bookTickets = async () => {
//     try {
//       if (!user) return toast.error("Please login to proceed");
//       if (!selectedTime || !selectedSeats.length)
//         return toast.error("Please select a time and seats");
//       const { data } = await axios.post(
//         "/api/booking/create",
//         { showId: selectedTime.showId, selectedSeats },
//         {
//           headers: { Authorization: `Bearer ${await getToken()}` },
//         }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         navigate("/my-bookings");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getShow();
//   }, []);

//   useEffect(() => {
//     if (selectedTime) {
//       getOccupiedSeats();
//     }
//   }, [selectedTime]);

//   return show ? (
//     <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
//       {/* Available Timings */}
//       <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
//         <p className="text-lg font-semibold px-6">Available Timings</p>
//         <div className="mt-5 space-y-1">
//           {show.dateTime[date].map((item) => (
//             <div
//               key={item.time}
//               onClick={() => {
//                 setSelectedTime(item);
//                 setSelectedSeats([]);
//               }}
//               className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
//                 selectedTime?.time === item.time
//                   ? "bg-primary text-white"
//                   : "hover:bg-primary/20"
//               }`}
//             >
//               <ClockIcon className="w-4 h-4" />
//               <p className="text-sm">{isoTimeFormat(item.time)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Seat Layout */}
//       <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
//         <BlurCircle top="-100px" left="-100px" />
//         <BlurCircle top="0px" right="0px" />
//         <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
//         <img src={assets.screenImage} alt="screen" />
//         <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
//         <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
//           <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
//             {groupRows[0].map((row) => renderSeats(row))}
//           </div>

//           <div className="grid grid-cols-2 gap-11">
//             {groupRows.slice(1).map((rowGroup, idx) => (
//               <div key={idx}>{rowGroup.map((row) => renderSeats(row))}</div>
//             ))}
//           </div>
//           <button
//             onClick={bookTickets}
//             className="flex items-center gap-1 mt-20 px-10 py-3 text-sm
//         bg-primary hover:bg-primary-dull transition rounded-full font-medium
//         cursor-pointer active:scale-95"
//           >
//             Proceed To CheckOut
//             <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default SeatLayout;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const { axios, getToken, user } = useAppContext();
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("please select time first");
    }

    if (selectedSeats.includes(seatId)) {
      // Deselect the seat if already selected
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
    } else {
      if (selectedSeats.length >= 5) {
        return toast("You can only select 5 seats");
      }
      if (occupiedSeats.includes(seatId)) {
        return toast("This Seat is already booked");
      }
      // Add new seat to selection
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`; // You asked not to change this
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={occupiedSeats.includes(seatId)} // disable click for booked
              className={`h-8 w-8 rounded border border-primary/60 
        ${
          occupiedSeats.includes(seatId)
            ? "bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed"
            : selectedSeats.includes(seatId)
            ? "bg-primary text-white"
            : "cursor-pointer hover:bg-primary/10"
        }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );
  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");
      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats");
      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => {
                setSelectedTime(item);
                setSelectedSeats([]);
              }}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((rowGroup, idx) => (
              <div key={idx}>{rowGroup.map((row) => renderSeats(row))}</div>
            ))}
          </div>
          <button
            onClick={bookTickets}
            className="flex items-center gap-1 mt-20 px-10 py-3 text-sm
  bg-primary hover:bg-primary-dull transition rounded-full font-medium
  cursor-pointer active:scale-95"
          >
            Proceed To CheckOut
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
