const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
    },

    skills: {
      type: [String],
      required: [true, "Skills are required"],
    },

    performanceScore: {
      type: Number,
      required: [true, "Performance score required"],
      min: 0,
      max: 100,
    },

    experience: {
      type: Number,
      required: [true, "Experience required"],
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);