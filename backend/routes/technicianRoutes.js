const express = require("express");
const router = express.Router();

const {
  getTechnicianProfile,
  getTechnicianBookings,
  getAllTechnicians,
  getAvailableSlots,
  updateAvailability
} = require("../controllers/technicianController");

router.get("/", getAllTechnicians);
router.get("/profile/:userId", getTechnicianProfile);
router.get("/bookings/:technicianId", getTechnicianBookings);
router.get("/slots", getAvailableSlots);
router.put("/availability", updateAvailability);
module.exports = router;
