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
    await API.post("/bookings", {
      userId: user._id,
      technicianId: tech._id,
      date,
      slot,
    });
    alert("Booking successful");
    setDate(null);
  };

  return (
    <div className="bg-orange-50  p-6">
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>

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
            className={`p-6 border rounded cursor-pointer
              ${tech?._id === t._id ? "border-secondary bg-orange-100" : ""}`}
          >
            <p className="font-bold">{t.user.name}</p>
            <p className="text-sm">{t.category}</p>
          </div>
        ))}
      </div>

      {tech && (
        <>
          <h3 className="mt-4 font-bold">Select Date for {tech.user.name}</h3>

          <MonthlyCalendar selectedDate={date} onSelect={setDate} />

          {date && <SlotList slots={slots} onBook={bookSlot} />}
        </>
      )}
    </div>
  );
}
