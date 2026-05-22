const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reservationDate: {
      type: Date,
      default: Date.now,
    },

    queuePriority: {
      type: Number,
      required: true,
      min: 1,
    },

    notifyWhenAvailable: {
      type: Boolean,
      default: true,
    },

    autoCancelAfter: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "notified", "cancelled", "expired"],
      default: "active",
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Reservation", reservationSchema);
