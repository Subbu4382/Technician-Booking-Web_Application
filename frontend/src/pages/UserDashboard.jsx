import { useEffect, useState } from "react";
import API from "../api/api";
import MonthlyCalendar from "../components/MonthlyCalendar";
import SlotList from "../components/SlotList";

export default function UserDashboard({ user }) {
  const [category, setCategory] = useState("Electrician");
  const [technicians, setTechnicians] = useState([]);
  const [tech, setTech] = useState(null);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    API.get("/technicians").then((res) =>
      setTechnicians(res.data.filter((t) => t.category === category))
    );
  }, [category]);

  useEffect(() => {
    if (tech && date) {
      API.get(`/technicians/slots?technicianId=${tech._id}&date=${date}`).then(
        (res) => setSlots(res.data)
      );
    }
  }, [tech, date]);

  const bookSlot = async (slot) => {
    const confirmBooking = window.confirm(
      `Confirm booking?\n\nDate : ${date}\nTime : ${slot}\nTechnician : ${tech.user.name}\nCategory : ${tech.category}`
    );

    if (!confirmBooking) return; // ❌ stop booking

    try {
      await API.post("/bookings", {
        userId: user._id,
        technicianId: tech._id,
        date,
        slot,
      });

      alert("✅ Booking successful");
      setDate(null);
      setSlots([]); // refresh slots
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-orange-50  p-6">
      <h2 className="text-orange-600  text-2xl font-bold mb-8">
        User Dashboard
      </h2>

      <select
        className="border p-2 mb-8"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Electrician</option>
        <option>Plumber</option>
        <option>AC Technician</option>
        <option>Washing Mashine Technician</option>
        <option>Carpenter</option>
        <option>Computer Repair</option>
      </select>

      <div className="  rounded-md grid grid-cols-2 gap-5">
        {technicians.map((t) => (
          <div
            key={t._id}
            onClick={() => setTech(t)}
            className={`
    p-6 rounded-xl cursor-pointer transition-all duration-200
    border-2
    ${
      tech?._id === t._id
        ? "border-orange-600 bg-orange-100 shadow-md scale-[1.02]"
        : "border-gray-300 bg-white hover:border-orange-400 hover:shadow"
    }
  `}
          >
            <p className="font-bold text-lg">{t.user.name}</p>
            <p className="text-sm text-gray-600">{t.category}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-orange-200 text-orange-800">
              {t.category}
            </span>
          </div>
        ))}
      </div>

      {tech && (
        <>
          <h3 className="mt-4 font-bold">Select Date for {tech.user.name}</h3>

          <MonthlyCalendar selectedDate={date} onSelect={setDate} />

          {date && (
            <SlotList slots={slots} selectedDate={date} onBook={bookSlot} />
          )}
        </>
      )}
    </div>
  );
}
