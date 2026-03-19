const mongoose = require("mongoose");

const eventRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userPrompt: {
      type: String,
      required: true,
      trim: true,
    },
    venueName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedCost: {
      type: String,
      required: true,
      trim: true,
    },
    whyItFits: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventRequest", eventRequestSchema);