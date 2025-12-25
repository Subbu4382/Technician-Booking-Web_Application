🛠️ Technician Booking ApplicationA comprehensive full-stack solution connecting users with skilled technicians. Features role-based dashboards, a custom calendar booking system, and a real-time notification engine.🚀 Key Features👤 For UsersCategory-Based Search: Find help quickly (Electricians, Plumbers, etc.).Smart Booking: Interactive monthly/weekly calendar with 12-hour time slot selection.Management: View and cancel upcoming appointments from a personal dashboard.🧑‍🔧 For TechniciansProfessional Profiles: Specialized profiles categorized by service type.Live Dashboards: View booked slots, customer details, and contact info at a glance.Notification Engine: Real-time alerts for new bookings and cancellations with a dedicated notification panel.🔒 Core SystemsSecurity: JWT-based authentication with protected routes.Data Integrity: Duplicate booking prevention via MongoDB unique indexing.Validation: Robust field validation on both Frontend (React) and Backend (Express).🧩 Tech StackLayerTechnologyFrontendReact (Vite), Tailwind CSS, AxiosBackendNode.js, Express.jsDatabaseMongoDB Atlas, MongooseAuthJSON Web Tokens (JWT)UtilitiesDay.js / Custom Calendar Logic📂 Project StructurePlaintext├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB Schemas (User, Booking, Notification)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Protection
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── api/        # Axios configuration
    │   ├── components/ # Reusable UI (Calendars, Navbar, Panels)
    │   ├── pages/      # Route-based views
    │   └── utils/      # Helper functions (Calendar logic)
⚙️ Installation & Setup1. Clone the repositoryBashgit clone https://github.com/Subbu4382/Technician-Booking-Web-Application.git
cd Technician-Booking-Web-Application
2. Backend ConfigurationNavigate to the backend folder and install dependencies:Bashcd backend
npm install
Create a .env file in the backend directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
Start the server:Bashnpm run dev
3. Frontend ConfigurationNavigate to the frontend folder and install dependencies:Bashcd ../frontend
npm install
Start the development server:Bashnpm run dev
🗄️ Database DesignUser Schema: Handles credentials, normalization (email to lowercase), and role assignment (user vs technician).Booking Schema: Relational links between User and Technician, enforcing unique slots per date.Notification Schema: Tracks technician-specific alerts with a "read/clear" status.🔮 Future Roadmap[ ] Real-time Updates: Integrate Socket.io for instant notification badges.[ ] Payments: Stripe/Razorpay integration for booking deposits.[ ] Verification: OTP-based phone number authentication.[ ] Admin Panel: Global view for managing users and technicians.🤝 ContributingContributions are welcome! Please fork the repository and create a pull request.Developed by Subbu
