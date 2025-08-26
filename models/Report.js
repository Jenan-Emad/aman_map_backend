const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  dangerType: { type: String, required: true },
  description: { type: String },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  reportedByDevice: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    required: true,
  },
  status: { type: String, default: "pending" },
  confirmations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
  createdAt: { type: Date, default: Date.now },
});

reportSchema.index({ coordinates: "2dsphere" });

module.exports = dbConnection.model("Report", reportSchema);
