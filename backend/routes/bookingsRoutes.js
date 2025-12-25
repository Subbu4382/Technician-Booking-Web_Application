const express = require("express");
const router = express.Router();

const {
  createBooking,
  cancelBooking,
  getBookingsByTechnician,
  getBookingsByUser
} = require("../controllers/bookingController");

// Create a booking
router.post("/", createBooking);

// Cancel a booking
router.put("/cancel/:id", cancelBooking);

// Get bookings for a technician
router.get("/technician/:technicianId", getBookingsByTechnician);

router.get("/user/:userId", getBookingsByUser);

module.exports = router;
