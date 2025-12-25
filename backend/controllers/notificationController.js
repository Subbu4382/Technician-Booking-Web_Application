const Notification = require("../models/Notification");

/**
 * Get all notifications for a technician
 */
exports.getNotificationsByTechnician = async (req, res) => {
  try {
    const notifications = await Notification.find({
      technician: req.params.technicianId
    })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      technician: req.params.technicianId
    });

    res.json({ message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
