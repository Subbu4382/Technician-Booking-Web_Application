import { useState, useEffect } from "react";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import Navbar from "./components/Navbar";
import UserBookings from "./pages/UserBookings";
import { isTokenExpired } from "./utils/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && !isTokenExpired()) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <>
      <Navbar
        user={user}
        onLogout={logout}
        onShowBookings={() => setShowBookings(true)}
      />

      {showBookings && (
        <UserBookings
          user={user}
          onClose={() => setShowBookings(false)}
        />
      )}

      {user.role === "technician" ? (
        <TechnicianDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </>
  );
}
