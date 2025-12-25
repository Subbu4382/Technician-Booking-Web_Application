const Booking = require("../models/Booking");
const Technician = require("../models/Technician");
const Notification = require("../models/Notification");

/**
 * Check if a booking slot is expired
 */
const isSlotExpired = (date, slot) => {
  const now = new Date();
  const bookingDate = new Date(date);

  // Past date
  if (bookingDate < new Date(now.toDateString())) return true;

  // Same day → check slot end time
  if (bookingDate.toDateString() === now.toDateString()) {
    const slotEnd = slot.split("-")[1].trim();
    const [time, period] = slotEnd.split(" ");
    let [hours] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const slotEndTime = new Date();
    slotEndTime.setHours(hours, 0, 0, 0);

    return now >= slotEndTime;
  }

  return false;
};

/**
 * Create booking
 */
exports.createBooking = async (req, res) => {
  try {
    const { userId, technicianId, date, slot } = req.body;

    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    // ⛔ BLOCK expired slots
    if (isSlotExpired(date, slot)) {
      return res.status(400).json({
        message: "This slot time has already passed"
      });
    }

    const booking = await Booking.create({
      user: userId,
      technician: technicianId,
      date,
      slot,
      status: "booked"
    });

    await Notification.create({
      technician: technicianId,
      message: `New booking on ${date} for slot ${slot}`
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/**
 * Cancel booking
 */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    await Notification.create({
      technician: booking.technician,
      message: `Booking cancelled for ${booking.date} (${booking.slot})`
    });

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get upcoming bookings for technician
 */
exports.getBookingsByTechnician = async (req, res) => {
  try {
    const bookings = await Booking.find({
      technician: req.params.technicianId,
      status: "booked"
    })
      .populate("user", "name phone")
      .sort({ date: 1 });

    // ✅ Filter expired slots
    const upcoming = bookings.filter(
      b => !isSlotExpired(b.date, b.slot)
    );

    res.json(upcoming);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user bookings
 */
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
      status: "booked"
    })
      .populate({
        path: "technician",
        populate: { path: "user", select: "name" }
      })
      .sort({ date: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
