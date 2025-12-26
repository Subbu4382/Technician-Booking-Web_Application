

export default function SlotList({ slots, onBook, selectedDate }) {
  // 🔒 Check if a slot is expired
  const isSlotExpired = (date, slot) => {
    const now = new Date();
    const bookingDate = new Date(date);

    // Past date
    if (bookingDate < new Date(now.toDateString())) return true;

    // Same day → check slot end time
    if (bookingDate.toDateString() === now.toDateString()) {
      const endTime = slot.split("-")[1].trim(); // "11:00 AM"
      const [time, period] = endTime.split(" ");
      let [hours] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const slotEnd = new Date();
      slotEnd.setHours(hours, 0, 0, 0);

      return now >= slotEnd;
    }

    return false;
  };

  if (!slots.length) {
    return (
      <p className="mt-6 text-center text-gray-500 italic">
        No slots available for this date
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-4">
      {slots.map((s) => {
        const expired = isSlotExpired(selectedDate, s.slot);
        const disabled = s.booked || expired;

        return (
          <button
            key={s.slot}
            disabled={disabled}
            onClick={() => !disabled && onBook(s.slot)}
            className={`
              group relative flex items-center justify-between
              w-full px-6 py-4 rounded-xl border transition-all duration-200
              ${
                disabled
                  ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "bg-orange-50 border-orange-300 hover:bg-orange-400 hover:border-orange-500"
              }
            `}
          >
            {/* Slot Time */}
            <span
              className={`
                text-sm md:text-base font-semibold
                ${
                  disabled
                    ? "text-gray-500"
                    : "text-orange-800 group-hover:text-white"
                }
              `}
            >
              {s.slot}
            </span>

            {/* Status Badge */}
            {expired && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                Expired
              </span>
            )}

            {s.booked && !expired && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                Booked
              </span>
            )}

            {!disabled && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 group-hover:bg-white group-hover:text-green-700">
                Available
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
