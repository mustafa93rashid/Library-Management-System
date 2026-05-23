const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    materialType: {
      type: String,
      enum: ["book", "magazine", "cd", "map"],
      required: true,
      lowercase: true,
      trim: true,
    },

    category:{
      type: String,
    },
    
    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    coverImage: {
      type: String,
    },

    book: {
      author: String,
      publisher: String,
      publishedYear: Number,
      isbn: {
        type: String,
        unique: true,
        sparse: true,
      },
    },

    magazine: {
      issueNumber: String,
      month: String,
      year: Number,
    },

    cd: {
      duration: String,
      format: String,
    },

    map: {
      region: String,
      scale: String,
    },
  },
  { timestamps: true }
);

materialSchema.methods.isAvailable = function () {
  return this.availableCopies > 0;
};

module.exports = mongoose.model("Material", materialSchema);