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
    <div className="bg-white rounded-xl shadow-sm border p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          disabled={isCurrentMonth}
          onClick={() => setMonth((m) => m - 1)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border
            ${
              isCurrentMonth
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-orange-200"
            }`}
        >
          ←
        </button>

        <h3 className="text-base font-semibold text-gray-800 tracking-wide">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => setMonth((m) => m + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-orange-100"
        >
          →
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-3">
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
              className={`
                h-10 rounded-lg text-sm font-medium transition-all
                ${
                  selectedDate === d
                    ? "bg-green-600 text-white shadow"
                    : d === todayISO
                    ? "border border-green-500 text-green-700"
                    : "hover:bg-green-100"
                }
                ${
                  isCurrentMonth && isPastDate(d)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-700"
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
