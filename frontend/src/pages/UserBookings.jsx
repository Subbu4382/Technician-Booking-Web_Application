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
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">My Bookings</h3>
        {loading && <p>Loading bookings...</p>}

        {!loading && bookings.length === 0 && <p>No bookings yet</p>}

        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <div className="booking-info">
              <div className="date">{b.date}</div>
              <div className="slot">{b.slot}</div>

              <div className="tech">
                Technician Name :
                <span>{b.technician.user.name}</span>
              </div>

              <div className="category">{b.technician.category}</div>
            </div>

            <button className="cancel-btn" onClick={() => cancelBooking(b._id)}>
              Cancel Booking
            </button>
          </div>
        ))}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
