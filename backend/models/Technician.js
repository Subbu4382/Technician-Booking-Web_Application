const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

      
    },

    category: {
      type: String,
      enum: [
        "Electrician",
        "Plumber",
        "AC Technician",
        "Carpenter",
        "Computer Repair",
      ],
      required: true,
    },

    workingDays: {
      type: [String],
      default: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },

    workingHours: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Technician", technicianSchema);
