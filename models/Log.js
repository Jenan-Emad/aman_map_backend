const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  reportId: { type: String, required: true },
  verifyingDevice: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  verificationType: {
    type: String,
    enum: ["document", "report", "end"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  // ipAddress: { type: String, required: true },
});

//validation functions

//validate last activation time
logSchema.statics.validateLastActivation = async function(verifiedBy, verificationType) {
  const now = new Date();
  const log = await this.findOne({ verifyingDevice : verifiedBy}).sort({createdAt: -1}); // get latest log
  if (!log) return true; // no previous logs, so valid

  const diffInMinutes = (now - log.createdAt) / (1000 * 60); // difference in minutes
  if (log.verificationType == verificationType && diffInMinutes < 10) return false; // same type within 10 minutes is invalid
  if (log.verificationType != verificationType && diffInMinutes < 5) return false; // different type within 5 minutes is invalid

  return true;
}


module.exports = dbConnection.model("Log", logSchema);
