import { useState } from "react";
import API from "../api/api";

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    role: "user",
    category: "Electrician"
  });

const register = async () => {
  // 1️⃣ Basic validations
  if (!form.name || !form.email || !form.password || !form.phone) {
    alert("All fields are required");
    return;
  }

  // 2️⃣ Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // 3️⃣ Phone validation (Indian example)
  if (!/^\d{10}$/.test(form.phone)) {
    alert("Phone number must be 10 digits");
    return;
  }

  // 4️⃣ Normalize email (IMPORTANT)
  const payload = {
    ...form,
    email: form.email.toLowerCase()
  };

  try {
    await API.post("/auth/register", payload);
    alert("Registration successful");
    onSwitch();
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-5">Register</h2>

        {["name", "email", "password","phone"].map(field => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border rounded-lg p-2 mb-3"
            onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <select
          className="w-full border rounded-lg p-2 mb-3"
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="technician">Technician</option>
        </select>

        {form.role === "technician" && (
          <select
            className="w-full border rounded-lg p-2 mb-3"
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option>Electrician</option>
            <option>Plumber</option>
            <option>AC Technician</option>
             <option>Washing Mashine Technician</option>
            <option>Carpenter</option>
             <option>Computer Repair</option>
          </select>
        )}

        <button
          onClick={register}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={onSwitch}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
