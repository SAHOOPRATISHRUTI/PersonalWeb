const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  taskType: {
    type: String,
    enum: ["CHECKLIST", "MEASURABLE"],
    default: "CHECKLIST",
  },
  targetvalue: {
    type: Number,
    default: 0,
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: null,
  },
  actualValue: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING",
  },
  completedAt: {
    type: Date,
    default: null,
  },
  delayReason: {
    type: String,
    default: "",
    trim: true,
  },
  remarks: {
    type: String,
    default: "",
    trim: true,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
