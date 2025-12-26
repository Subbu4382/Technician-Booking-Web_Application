import { useEffect, useState } from "react";
import API from "../api/api";
import NotificationList from "../components/NotificationList";

export default function TechnicianDashboard({ user }) {
  const [technician, setTechnician] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    API.get(`/technicians/profile/${user._id}`).then((res) => {
      setTechnician(res.data);

      API.get(`/bookings/technician/${res.data._id}`).then((b) =>
        setBookings(b.data)
      );

      API.get(`/notifications/technician/${res.data._id}`).then((n) =>
        setNotifications(n.data)
      );
    });
  }, [user]);

  if (!technician) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Technician Dashboard</h2>

        {/*  Notification Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotes(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Notifications
          </button>

          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-semibold">{technician.user.name}</h3>
        <p className="text-sm text-gray-600">{technician.category}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Booked Slots
        </h3>

        {bookings.length === 0 && (
          <p className="text-sm text-gray-500">No bookings yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border border-green-200 bg-green-50 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-green-700">
                  {b.date}
                </span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {b.slot}
                </span>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Customer:</span> {b.user.name}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {b.user.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Popup */}

      {showNotes && (
        <NotificationList
          technicianId={technician._id}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}
