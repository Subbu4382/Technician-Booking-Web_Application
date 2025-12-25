const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    slot: {
      type: String, // e.g. "10:00-11:00"
      required: true
    },

    status: {
      type: String,
      enum: ["booked", "cancelled",  "completed"],
      default: "booked"
    }
  },
  {
    timestamps: true
  }
);

/**
 * Ensure ONE booking per technician per slot per date
 */
bookingSchema.index(
  { technician: 1, date: 1, slot: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
