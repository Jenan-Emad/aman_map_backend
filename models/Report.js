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
      validate: {
        validator: (v) => v.length == 2,
        message: (props) => `${props.value} must be [lng, lat]`,
      },
      required: true,
    },
  },
  reportedByDevice: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  confirmations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
  verificationSummary: {
    documentCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    endCount: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

reportSchema.index({ coordinates: "2dsphere" }); // Geospatial index

//validation functions

//validate if it included in confirmations
reportSchema.statics.validateNotConfirmed = async function (
  reportId,
  deviceId
) {
  const report = await this.findById(reportId);
  if (!report) {
    throw new Error("Report not found");
  }

  for (let confirm of report.confirmations) {
    if (confirm.toString() === deviceId.toString()) {
      return false; // Device already confirmed
    }
  }
  return true; // Not confirmed yet
};

module.exports = dbConnection.model("Report", reportSchema);
