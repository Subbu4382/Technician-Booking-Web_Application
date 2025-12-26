
const express = require("express");
const router = express.Router();

const {
  getNotificationsByTechnician,
  clearNotifications
} = require("../controllers/notificationController");

// Get notifications for a technician
router.get("/technician/:technicianId", getNotificationsByTechnician);

// Clear all notifications for a technician
router.delete("/technician/:technicianId", clearNotifications);

module.exports = router;
