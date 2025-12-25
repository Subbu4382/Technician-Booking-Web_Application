import { useEffect, useState } from "react";
import API from "../api/api";

export default function NotificationList({ technicianId, onClose }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (technicianId) {
      API.get(`/notifications/technician/${technicianId}`)
        .then(res => setNotes(res.data));
    }
  }, [technicianId]);

  const clearAll = async () => {
    try {
      await API.delete(`/notifications/technician/${technicianId}`);
      setNotes([]);
    } catch {
      alert("Failed to clear notifications");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-green-50 z-50 shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-green-100">
          <h3 className="text-lg font-semibold text-green-800">
            Notifications
          </h3>

          <div className="flex items-center gap-3">
            {notes.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Clear All
              </button>
            )}

            <button
              onClick={onClose}
              className="text-xl font-bold text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notes.length === 0 && (
            <p className="text-center text-gray-500 text-sm mt-10">
              No notifications
            </p>
          )}

          {notes.map(n => {
            const isCancelled = n.message.toLowerCase().includes("cancel");

            return (
              <div
                key={n._id}
                className={`border rounded-lg p-4 shadow-sm
                  ${isCancelled
                    ? "bg-red-50 border-red-200"
                    : "bg-green-100 border-green-200"}
                `}
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm text-gray-800">
                    {n.message}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap
                      ${isCancelled
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-700"}
                    `}
                  >
                    {isCancelled ? "Cancelled" : "New"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
