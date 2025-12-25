🛠️ Technician Booking Application

A full-stack web application that allows users to book technicians based on category and availability. Technicians can view their bookings and receive real-time notifications. The application is built using React + Tailwind CSS on the frontend and Node.js, Express, MongoDB on the backend.

📌 Objective

To build a user-friendly technician booking system with:

Category-based technician selection

Calendar-based slot booking

Booking cancellation

Technician dashboards with notifications

Clean UI and scalable backend architecture

🧩 Tech Stack
Frontend

React (Vite)

JavaScript (JS / JSX)

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

👥 User Roles
1️⃣ User

Register & Login

Select technician category

View available technicians

Book time slots

Cancel bookings

View “My Bookings”

2️⃣ Technician

Register as technician with category

View booked slots

See customer name & phone number

Receive notifications for:

New booking

Booking cancellation

Clear notifications

🧠 Application Flow (End-to-End)
🔐 Authentication Flow

User/Technician registers

Email is normalized to lowercase

JWT token is generated on login

Token stored in localStorage

Protected routes accessed using token

👤 User Booking Flow

User logs in

Selects technician category (Electrician, Plumber, etc.)

Selects a technician

Chooses a date from monthly calendar

Selects a time slot (12-hour format)

Booking is created

Technician receives notification

User can view booking in My Bookings

User can cancel booking

Cancellation notification sent to technician

🧑‍🔧 Technician Flow

Technician logs in

Views dashboard

Sees:

Profile details

Booked slots (as cards)

Customer phone number

Receives notification badge

Opens notification panel (right side)

Can clear notifications

📅 Booking Rules

One booking per technician per date & slot

Duplicate bookings prevented using MongoDB unique index

Only future dates are selectable

Past dates are disabled

Slots are shown in 12-hour format

Example:

9:00 AM – 11:00 AM
11:00 AM – 1:00 PM
1:00 PM – 3:00 PM
3:00 PM – 5:00 PM

🧾 Validation Rules
Frontend Validations

Required fields check

Email format validation

Phone number (10 digits)

Password required

Role-based field validation

Backend Validations

Email converted to lowercase

Unique email enforcement

Duplicate booking prevention

Proper error responses

🔔 Notifications System

Created on:

New booking

Booking cancellation

Stored in MongoDB

Shown as:

Badge count

Right-side notification panel

Can be cleared by technician

🗂️ Project Structure
Frontend
frontend/
 ├── src/
 │   ├── api/
 │   │   └── api.js
 │   ├── components/
 │   │   ├── Navbar.jsx
 │   │   ├── WeeklyCalendar.jsx
 │   │   ├── MonthlyCalendar.jsx
 │   │   ├── NotificationPanel.jsx
 │   ├── pages/
 │   │   ├── Login.jsx
 │   │   ├── Register.jsx
 │   │   ├── UserDashboard.jsx
 │   │   ├── UserBookings.jsx
 │   │   ├── TechnicianDashboard.jsx
 │   ├── utils/
 │   │   └── calendar.js
 │   ├── App.jsx
 │   ├── main.jsx
 │   └── index.css

Backend
backend/
 ├── controllers/
 │   ├── authController.js
 │   ├── bookingController.js
 │   ├── notificationController.js
 ├── models/
 │   ├── User.js
 │   ├── Technician.js
 │   ├── Booking.js
 │   ├── Notification.js
 ├── routes/
 │   ├── authRoutes.js
 │   ├── bookingRoutes.js
 │   ├── technicianRoutes.js
 │   ├── notificationRoutes.js
 ├── middleware/
 │   └── authMiddleware.js
 ├── server.js
 └── .env

🗄️ Database Design
User

name

email (lowercase, unique)

password

phone

role (user / technician)

Technician

user (ref User)

category

Booking

user (ref User)

technician (ref Technician)

date

slot

status (booked / cancelled)

Notification

technician

message

createdAt

⚙️ How to Run the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🔐 Environment Variables

Create .env in backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

--> Key Highlights

Role-based dashboards

Clean UI using Tailwind CSS

JWT authentication

Real-time notifications

Monthly & weekly calendar logic

Proper validation (frontend + backend)

Scalable and modular architecture

🚀 Future Enhancements

OTP-based phone verification

Real-time notifications (WebSockets)

Slot auto-expiry after time passes

Admin dashboard

Pagination for bookings & notifications




GitHub: github.com/Subbu4382