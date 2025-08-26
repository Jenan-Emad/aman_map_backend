const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  deviceType: { type: String, required: true },
  ipAddress: { type: String, required: true },
  lastActive: { type: Date, default: Date.now },
  location: {
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
});

deviceSchema.index({ location: "2dsphere" });

module.exports = dbConnection.model("Device", deviceSchema);
