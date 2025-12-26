import { useEffect, useState } from "react";
import API from "../api/api";

export default function UserBookings({ user, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    const res = await API.get(`/bookings/user/${user._id}`);
    setBookings(res.data);
    setLoading(false);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await API.put(`/bookings/cancel/${id}`);
    loadBookings();
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal */}
      <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-xl bg-green-50 shadow-2xl p-5">

        {/*  Close Button (Fixed Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full 
                     bg-red-500 text-white font-bold hover:bg-red-600 transition"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          My Bookings
        </h3>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-gray-600">Loading bookings...</p>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <p className="text-sm text-gray-600">No bookings yet</p>
        )}

        {/* Booking Cards */}
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-lg border border-green-300 bg-green-100 p-4 shadow-sm"
            >
              <div className="text-sm text-gray-600">{b.date}</div>

              <div className="font-semibold text-gray-800">
                {b.slot}
              </div>

              <div className="text-sm text-gray-700 mt-1">
                Technician Name :
                <span className="font-semibold ml-1">
                  {b.technician.user.name}
                </span>
              </div>

              <div className="text-green-700 font-semibold text-sm mt-1">
                {b.technician.category}
              </div>

              <button
                onClick={() => cancelBooking(b._id)}
                className="mt-3 inline-block rounded-md bg-red-500 px-4 py-1.5
                           text-sm text-white hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
