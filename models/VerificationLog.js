const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const verificationLogSchema = new mongoose.Schema({
  logId: { type: String, required: true, unique: true },
  reportId: { type: String, required: true },
  verifyingDevices: [{ type: String, required: true }],
  verificationType: {
    type: String,
    enum: ["approve", "reject"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true },
});

module.exports = dbConnection.model("VerificationLog", verificationLogSchema);
