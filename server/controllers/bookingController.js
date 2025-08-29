import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from 'stripe';

//Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    // Check if any selected seat is already booked
    const isAnySeatTaken = selectedSeats.some((seat) => !!occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// ✅ Booking Route
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // 🧠 Double-check inputs
    if (
      !showId ||
      !Array.isArray(selectedSeats) ||
      selectedSeats.length === 0
    ) {
      return res.json({ success: false, message: "Missing show or seats" });
    }

    // ✅ Check if selected seats are available
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected Seats are not available.",
      });
    }

    // ✅ Fetch show details
    const showData = await Show.findById(showId).populate("movie");

    // ✅ Create new booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    // ✅ Update occupied seats
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // creating line items to for stripe
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, //expires in 30 minutes
    });
    booking.paymentLink = session.url;
    await booking.save();

    //Run Inngest sheduler function to check payment status after 10 minutes
    // await inngest.send({
    //   name: "app/checkpayment",
    //   data: {
    //     bookingId: booking._id.toString(),
    //   },
    // });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Occupied Seats by Show ID
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
