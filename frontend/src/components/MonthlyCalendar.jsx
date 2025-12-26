import { useState } from "react";

export default function MonthlyCalendar({ selectedDate, onSelect }) {
  const today = new Date();
  const todayYMD = formatDate(today);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); //  LOCAL DAY

  // Build calendar grid
  const dates = [];

  // Empty slots before month start
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  // Month dates
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    dates.push(formatDate(dateObj));
  }

  const isPastDate = (date) => date < todayYMD;
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-orange-100 rounded-xl shadow border p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          disabled={isCurrentMonth}
          onClick={prevMonth}
          className={`w-9 h-9 rounded-lg border
            ${
              isCurrentMonth
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-green-300"
            }`}
        >
          ←
        </button>

        <h3 className="font-semibold text-gray-800">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-lg border hover:bg-green-300"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-3">
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
              className={`h-10 rounded-lg text-sm font-medium transition
                ${
                  selectedDate === d
                    ? "bg-green-600 text-white"
                    : d === todayYMD
                    ? "border border-green-500 text-green-700"
                    : "hover:bg-green-200"
                }
                ${
                  isCurrentMonth && isPastDate(d)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-700"
                }`}
            >
              {d.split("-")[2]}
            </button>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
}

/* Local date formatter (NO UTC) */
function formatDate(date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
