const mongoose = require("mongoose");

const dailyInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tithi: {
      type: String,
      required: true,
      trim: true,
    },
    pakshya: {
      type: String,
      required: true,
      trim: true,
    },
    masa: {
      type: String,
      required: true,
      trim: true,
    },
    nakshatra: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: String,
      required: true,
      trim: true,
    },
    specialNotes: {
      type: String,
      trim: true,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DailyInfo", dailyInfoSchema);
