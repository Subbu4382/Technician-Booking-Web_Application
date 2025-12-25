const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

const {
  getNotificationsByTechnician,
  markAsRead
} = require("../controllers/notificationController");

// Get notifications for a technician
router.get("/technician/:technicianId", getNotificationsByTechnician);

// Mark notification as read
router.put("/read/:id", markAsRead);

router.delete("/technician/:technicianId", async (req, res) => {
  await Notification.deleteMany({
    technician: req.params.technicianId
  });
  res.json({ message: "Notifications cleared" });
});


module.exports = router;
