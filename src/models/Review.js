const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
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

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent same member from reviewing same material twice
reviewSchema.index(
  { memberId: 1, materialId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);