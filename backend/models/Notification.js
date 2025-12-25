const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true
    },

    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
