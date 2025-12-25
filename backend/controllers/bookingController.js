const Booking = require("../models/Booking");
const Technician = require("../models/Technician");
const Notification = require("../models/Notification");

/**
 * Create a new booking
 */
exports.createBooking = async (req, res) => {
  try {
    const { userId, technicianId, date, slot } = req.body;

    // Check technician exists
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    // Create booking (unique index prevents double booking)
    const booking = await Booking.create({
      user: userId,
      technician: technicianId,
      date,
      slot
    });

    // Create notification for technician
    await Notification.create({
      technician: technicianId,
      message: `New booking on ${date} for slot ${slot}`
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    // Handle duplicate slot booking error
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

    // Notify technician
    await Notification.create({
      technician: booking.technician,
      message: `Booking cancelled for ${booking.date} (${booking.slot})`
    });

    res.json({
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get bookings by technician
 */
exports.getBookingsByTechnician = async (req, res) => {
  try {
    const bookings = await Booking.find({
      technician: req.params.technicianId,
      status: "booked"
    })
      .populate("user", "name phone")
      .sort({ date: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET BOOKINGS BY USER
exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({
      user: userId,
      status: "booked"   // ✅ IMPORTANT
    })
      .populate({
        path: "technician",
        populate: {
          path: "user",
          select: "name"
        }
      })
      .sort({ date: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
