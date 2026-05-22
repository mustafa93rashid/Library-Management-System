const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    borrowDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "returned", "overdue", "cancelled"],
      default: "active",
    },

    fine: {
      finePerDay: {
        type: Number,
        default: 1000,
        min: 0,
      },

      totalFine: {
        type: Number,
        default: 0,
        min: 0,
      },

      fineStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
      },
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

    librarianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Loan", loanSchema);
