const Technician = require("../models/Technician");
const Booking = require("../models/Booking");
const generateSlots = require("../utils/slotGenerator");

/**
 * Get technician profile (by userId)
 */
exports.getTechnicianProfile = async (req, res) => {
  try {
    const technician = await Technician.findOne({
      user: req.params.userId
    }).populate("user", "name email role phone ");

    if (!technician) {
      return res.status(404).json({ message: "Technician profile not found" });
    }

    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all bookings for a technician
 */
exports.getTechnicianBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      technician: req.params.technicianId,
      status: "booked"
    })
      .populate("user", "name email")
      .sort({ date: 1, slot: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find({ isActive: true })
      .populate("user", "name email");

    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  const { technicianId, date } = req.query;

  if (!technicianId || !date) {
    return res.status(400).json([]);
  }

  const technician = await Technician.findById(technicianId);
  if (!technician) return res.json([]);

  const weekday = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  if (!technician.workingDays.includes(weekday)) {
    return res.json([]);
  }

  const allSlots = generateSlots(
    technician.workingHours.start,
    technician.workingHours.end
  );

  const bookings = await Booking.find({
    technician: technicianId,
    date,
    status: "booked",
  });

  const booked = bookings.map(b => b.slot);

  res.json(
    allSlots.map(slot => ({
      slot,
      booked: booked.includes(slot),
    }))
  );
};
