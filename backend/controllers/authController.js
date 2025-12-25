
const User = require("../models/User");
const Technician = require("../models/Technician");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password,phone, role, category } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    let technician = null;

    if (role === "technician") {
      technician = await Technician.create({
        user: user._id,
        category,
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "09:00", end: "17:00" }
      });
    }

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
