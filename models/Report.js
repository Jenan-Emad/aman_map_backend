const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  dangerType: {
    type: String,
    enum: ["evacuation", "incursion", "fire_control", "hard_to_reach"],
    required: true,
  },
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
  reportedByDevice: { type: String, required: true },
  status: { type: String, enum: ["pending", "verified", "rejected"] },
  confirmations: [
    {deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    reportType: { type: String, enum: ["document", "report", "end"], required: true },}
  ],
  createdAt: { type: Date, default: Date.now },
});

reportSchema.index({ coordinates: "2dsphere" }); // Geospatial index

module.exports = dbConnection.model("Report", reportSchema);
