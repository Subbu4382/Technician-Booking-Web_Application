import { useState } from "react";

export default function MonthlyCalendar({ selectedDate, onSelect }) {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const dates = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const dateISO = new Date(year, month, d)
      .toISOString()
      .split("T")[0];
    dates.push(dateISO);
  }

  const isPastDate = (date) => date < todayISO;

  const isCurrentMonth =
    month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Disable previous month */}
        <button
          disabled={isCurrentMonth}
          onClick={() => setMonth((m) => m - 1)}
          className={`px-3 py-1 rounded
            ${
              isCurrentMonth
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          ←
        </button>

        <h3 className="font-semibold text-gray-800">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => setMonth((m) => m + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-3">
        {dates.map((d, i) =>
          d ? (
            <button
              key={i}
              disabled={isCurrentMonth && isPastDate(d)}
              onClick={() => onSelect(d)}
              className={`p-2 rounded text-sm border transition
                ${
                  selectedDate === d
                    ? "bg-green-600 text-white"
                    : d === todayISO
                    ? "border-green-600 text-green-700 font-semibold"
                    : "hover:bg-green-100"
                }
                ${
                  isCurrentMonth && isPastDate(d)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {d.split("-")[2]}
            </button>
          ) : (
            <div key={i}></div>
          )
        )}
      </div>
    </div>
  );
}
