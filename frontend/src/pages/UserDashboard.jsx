import { useEffect, useState } from "react";
import API from "../api/api";
import MonthlyCalendar from "../components/MonthlyCalendar";
import SlotList from "../components/SlotList";

export default function UserDashboard({ user }) {
  const [category, setCategory] = useState("Electrician");
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingTechs, setLoadingTechs] = useState(false);

  /* ---------------- FETCH TECHNICIANS ---------------- */
  useEffect(() => {
    const fetchTechnicians = async () => {
      setLoadingTechs(true);
      try {
        const res = await API.get("/technicians");
        const filtered = res.data.filter(
          (t) => t.category === category
        );
        setTechnicians(filtered);
      } catch (err) {
        alert("Failed to load technicians");
      } finally {
        setLoadingTechs(false);
      }
    };

    fetchTechnicians();

    // reset selections on category change
    setSelectedTech(null);
    setSelectedDate(null);
    setSlots([]);
  }, [category]);

  /* ---------------- FETCH SLOTS ---------------- */
  useEffect(() => {
    if (!selectedTech || !selectedDate) return;

    const fetchSlots = async () => {
      try {
        const res = await API.get(
          `/technicians/slots?technicianId=${selectedTech._id}&date=${selectedDate}`
        );
        setSlots(res.data);
      } catch (err) {
        alert("Failed to load slots");
      }
    };

    fetchSlots();
  }, [selectedTech, selectedDate]);

  /* ---------------- BOOK SLOT ---------------- */
  const bookSlot = async (slot) => {
    if (!user || !selectedTech || !selectedDate) return;

    const confirmBooking = window.confirm(
      `Confirm Booking?\n\n` +
      `Date : ${selectedDate}\n` +
      `Time : ${slot}\n` +
      `Technician : ${selectedTech?.user?.name}\n` +
      `Category : ${selectedTech?.category}`
    );

    if (!confirmBooking) return;

    try {
      await API.post("/bookings", {
        userId: user._id,
        technicianId: selectedTech._id,
        date: selectedDate,
        slot,
      });

      alert("✅ Booking successful");

      // refresh slots after booking
      setSelectedDate(null);
      setSlots([]);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-orange-50 min-h-screen p-6">
      <h2 className="text-orange-600 text-2xl font-bold mb-8">
        User Dashboard
      </h2>

      {/* CATEGORY SELECT */}
      <select
        className="border border-orange-400 rounded-lg p-2 mb-8"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Electrician</option>
        <option>Plumber</option>
        <option>AC Technician</option>
        <option>Carpenter</option>
        <option>Computer Repair</option>
      </select>

      {/* TECHNICIAN LIST */}
      {loadingTechs ? (
        <p className="text-gray-600">Loading technicians...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {technicians.map((t) => (
            <div
              key={t._id}
              onClick={() => {
                setSelectedTech(t);
                setSelectedDate(null);
                setSlots([]);
              }}
              className={`
                p-6 rounded-xl cursor-pointer transition-all duration-200 border-2
                ${
                  selectedTech?._id === t._id
                    ? "border-orange-600 bg-orange-100 shadow-md scale-[1.02]"
                    : "border-gray-300 bg-white hover:border-orange-400 hover:shadow"
                }
              `}
            >
              <p className="font-bold text-lg">
                {t.user?.name || "Technician"}
              </p>
              <p className="text-sm text-gray-600">{t.category}</p>

              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-orange-200 text-orange-800">
                {t.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* DATE + SLOT SECTION */}
      {selectedTech && (
        <>
          <h3 className="mt-10 mb-3 font-semibold text-lg">
            Select Date for{" "}
            <span className="text-orange-600">
              {selectedTech?.user?.name}
            </span>
          </h3>

          <MonthlyCalendar
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />

          {selectedDate && (
            <SlotList
              slots={slots}
              selectedDate={selectedDate}
              onBook={bookSlot}
            />
          )}
        </>
      )}
    </div>
  );
}
