🎬 Movie Ticket Booking Application

A full-stack web application for booking movie tickets online.
Built with React + Tailwind CSS (frontend), Express.js (backend), MongoDB (database), and Clerk (authentication).

🚀 Features

🔑 User Authentication with Clerk
 (signup, login, logout)

🎥 Browse Movies – Users can view available movies and show timings

🎟️ Book Tickets – Select seats and confirm booking

📧 Booking Confirmation via email 

🗄️ MongoDB Database for storing users, movies, and bookings

⚡ Express.js for smooth communication between frontend and backend

🎨 Modern UI with React + Tailwind CSS

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios (for API calls)

Backend

Node.js

Express.js

Clerk (Authentication)

MongoDB with Mongoose

📂 Project Structure
movie-ticket-booking/
│── client/              # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Pages (Home, Movies, Booking, etc.)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
│── server/              # Backend (Express + MongoDB)
│   ├── models/          # Mongoose models (User, Movie, Booking)
│   ├── routes/          # API routes
│   ├── configs/         # Configurations (Clerk, DB, Nodemailer)
│   ├── index.js         # Entry point
│   └── package.json
│
│── README.md

⚙️ Installation
1. Clone the repository
git clone https://github.com/your-username/movie-ticket-booking.git
cd movie-ticket-booking

2. Install dependencies

Frontend

cd client
npm install


Backend

cd server
npm install

3. Setup Environment Variables

Create a .env file inside server/ with:

MONGO_URI=your_mongo_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
PORT=5000

▶️ Running the App
Start Backend
cd server
npm run dev

Start Frontend
cd client
npm start


By default:

Frontend runs on: http://localhost:3000

Backend runs on: http://localhost:5000

📸 Screenshots (Optional)

Add some screenshots here once UI is ready.

🔮 Future Improvements

✅ Online payment integration (Stripe/Razorpay)

✅ Admin dashboard for adding movies and managing bookings

✅ Real-time seat selection updates

✅ Mobile responsiveness improvements

🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

📜 License

This project is licensed under the MIT License.
