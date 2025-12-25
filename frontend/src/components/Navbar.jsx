export default function Navbar({ user, onLogout, onShowBookings }) {
  return (
    <nav className="bg-orange-200 border-b border-green-800 px-8 py-8 flex items-center justify-between">
      <h1 className="text-xl font-bold text-green-900">
        Technician Booking
      </h1>

      <div className="flex items-center gap-8">
        {user.role === "user" && (
          <button
            onClick={onShowBookings}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
          >
            My Bookings
          </button>
        )}

        <span className="text-m text-gray-1000">
          {user.name} <span className="text-gray-500">({user.role})</span>
        </span>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
