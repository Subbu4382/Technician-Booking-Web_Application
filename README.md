# 🛠️ Technician Booking Application

A full-stack web application that allows users to book technicians based on category and availability.  
Technicians can manage their bookings and receive notifications.

Built using **React + Tailwind CSS** on the frontend and **Node.js, Express, MongoDB** on the backend.

---

## 📌 Objective

To design and implement a **user-friendly, scalable technician booking system** with:

- Category-based technician selection  
- Calendar-based slot booking  
- Booking cancellation  
- Technician dashboards with notifications  
- Clean UI and maintainable backend architecture  

---

## 🧩 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

---

## 👥 User Roles

### 👤 User
- Register & Login
- Select technician category
- View available technicians
- Book time slots
- Cancel bookings
- View **My Bookings**

### 🧑‍🔧 Technician
- Register with category
- View booked slots (card-based UI)
- See customer name & phone number
- Receive notifications for:
  - New booking
  - Booking cancellation
- Clear notifications

---

## 🧠 Application Flow

### 🔐 Authentication Flow
1. User/Technician registers
2. Email is normalized to lowercase
3. JWT token generated on login
4. Token stored in `localStorage`
5. Protected routes accessed using JWT

---

### 👤 User Booking Flow
1. User logs in
2. Selects technician category (Electrician, Plumber, etc.)
3. Selects a technician
4. Chooses a date from **monthly calendar**
5. Selects a time slot
6. Booking is created
7. Technician receives notification
8. User views booking in **My Bookings**
9. User cancels booking (if required)
10. Cancellation notification sent to technician

---

### 🧑‍🔧 Technician Flow
1. Technician logs in
2. Views dashboard
3. Sees:
   - Profile details
   - Booked slots (as cards)
   - Customer phone number
4. Notification badge appears
5. Opens notification panel (right-side drawer)
6. Clears notifications

---

## 📅 Booking Rules

- One booking per technician per date & slot
- Duplicate bookings prevented using MongoDB unique index
- Only future dates are selectable
- Past dates are disabled

**Example:**

9:00 AM – 11:00 AM
11:00 AM – 1:00 PM
1:00 PM – 3:00 PM
3:00 PM – 5:00 PM


---

## 🧾 Validation Rules

### Frontend Validations
- Required field validation
- Email format validation
- Phone number validation (10 digits)
- Password required
- Role-based conditional fields

### Backend Validations
- Email normalization (lowercase)
- Unique email enforcement
- Duplicate booking prevention
- Proper API error responses

---

## 🔔 Notifications System

- Notifications created on:
  - New booking
  - Booking cancellation
- Stored in MongoDB
- Displayed as:
  - Notification badge
  - Right-side notification panel
- Can be cleared by technician

---

## 🗂️ Project Structure

### Frontend

frontend/
├── src/
│ ├── api/
│ │ └── api.js
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── SlotList.jsx
│ │ ├── MonthlyCalendar.jsx
│ │ ├── NotificationList.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── UserDashboard.jsx
│ │ ├── UserBookings.jsx
│ │ ├── TechnicianDashboard.jsx
│ ├── utils/
│ │ └── auth.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css


### Backend

backend/
├── controllers/
│ ├── authController.js
│ ├── bookingController.js
│ ├── notificationController.js
| ├── technicianController.js
├── models/
│ ├── User.js
│ ├── Technician.js
│ ├── Booking.js
│ ├── Notification.js
├── routes/
│ ├── authRoutes.js
│ ├── bookingRoutes.js
│ ├── technicianRoutes.js
│ ├── notificationRoutes.js
├── middleware/
│ └── authMiddleware.js
├── server.js
└── .env


---

## 🗄️ Database Design

### User
- name
- email (lowercase, unique)
- password
- phone
- role (user / technician)

### Technician
- user (ref User)
- category

### Booking
- user (ref User)
- technician (ref Technician)
- date
- slot
- status (booked / cancelled)

### Notification
- technician
- message
- createdAt

---

## ⚙️ How to Run the Project

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

🔐 Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

### Project Source Code

GitHub: https://github.com/Subbu4382/Technician-Booking-Web_Application/
