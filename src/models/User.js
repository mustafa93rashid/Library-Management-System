const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: {
        values: ["member", "librarian", "manager"],
        message: "Role must be member, librarian, or manager",
      },
      required: [true, "Role is required"],
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    member: {
      address: {
        type: String,
        trim: true,
      },

      dateOfBirth: {
        type: Date,
      },

      membershipNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
      },
    },

    librarian: {
      responsibleDepartment: {
        type: String,
        trim: true,
      },
    },

    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
