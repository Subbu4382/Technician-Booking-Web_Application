export default function SlotList({ slots, onBook }) {
  if (!slots.length) {
    return <p className="text-gray-500 mt-4">No slots available</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {slots.map(s => (
        <button
          key={s.slot}
          disabled={s.booked}
          onClick={() => onBook(s.slot)}
          className={`w-full py-3 rounded text-white
            ${s.booked
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-300 hover:bg-orange-500"}`}
        >
          {s.slot}
        </button>
      ))}
    </div>
  );
}
