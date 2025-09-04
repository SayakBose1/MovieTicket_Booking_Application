# 🎬 Movie Ticket Booking Application

A full-stack web application for booking movie tickets online.  
Built with **React** + **Tailwind CSS** (frontend), **Express.js** (backend), **MongoDB** (database), **Clerk** (authentication), and **Stripe** (payment gateway).

---

## 🚀 Features

- 🔑 **User Authentication** with [Clerk](https://clerk.com) (signup, login, logout)  
- 🎥 **Browse Movies** – Users can view available movies and show timings  
- 🎟️ **Book Tickets** – Select seats and confirm booking  
- 💳 **Online Payments with Stripe** – Secure checkout for ticket purchases  
- 🗄️ **Admin Dashboard** – Add movies and manage bookings  
- 🎯 **Real-time Seat Selection** – Select seats with live availability  
- 📱 **Mobile Responsive** – Optimized UI for mobile devices  
- 📧 **Booking Confirmation Email** after successful payment 
- 🗄️ **MongoDB Database** for storing users, movies, and bookings  
- ⚡ **Express.js** for smooth frontend–backend communication  
- 🎨 **Modern UI** with React + Tailwind CSS  

---

## 🛠️ Tech Stack

**Frontend:**  
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 📡 Axios  

**Backend:**  
- 🟢 Node.js  
- 🚂 Express.js  
- 🔑 Clerk  
- 🗄️ MongoDB (Mongoose)  
- 💳 Stripe


---

## 📂 Project Structure

```
movie-ticket-booking/
│
├── client/                # Frontend (React + Tailwind)
│   └── src/
│       ├── assets/        # Images, icons, fonts, etc.
│       ├── components/    # Reusable UI components
│       ├── context/       # React context providers
│       ├── lib/           # Utility functions and libraries
│       ├── pages/         # Pages (Home, Movies, Booking, Admin, etc.)
│       ├── App.jsx        # Main app component
│       ├── index.css      # Global styles
│       └── main.jsx       # Entry point
│
├── server/                # Backend (Express + MongoDB + Stripe)
│   ├── configs/           # Configurations (DB, Clerk, Stripe, Nodemailer)
│   ├── controllers/       # Route handler functions
│   ├── ingerest/          # Inngest functions
│   ├── middleware/        # Express middlewares
│   ├── models/            # Mongoose models (User, Movie, Booking)
│   ├── routes/            # API routes (movies, bookings, payments)
│   └── server.js           # Entry point
│
└── README.md
```


---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/SayakBose1/MovieTicket_Booking_Application.git
cd MovieTicket_Booking_Application
```


### 2. Install dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Setup Environment Variables

#### Server (`server/.env`)
```
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
TMDB_API_KEY=your_tmdb_api_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
SENDER_EMAIL=your_sender_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

#### Client (`client/.env`)
```
VITE_CURRENCY='$'
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000       # URL of your backend server
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```



---

## ▶️ Running the App

Start Backend:
```bash
cd server
npm run server
```

Start Frontend:
```bash
cd client
npm run dev
```

By default:  
- Frontend → http://localhost:5173  
- Backend → http://localhost:3000  

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.  

---

## 📜 License

This project is licensed under the **MIT License**.
