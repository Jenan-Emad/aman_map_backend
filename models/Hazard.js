const { dbConnection } = require("../config");
const mongoose = require("mongoose");

const hazardSchema = new mongoose.Schema({
  geometry: {
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
  //the final state of the hazard
  status: {
    type: String,
    enum: ["active", "resolved", "false_alarm"],
    default: "active",
  },
  verificationSummary: {
    reportCount: { type: Number, default: 0 },
    documentCount: { type: Number, default: 0 },
    endRequestCount: { type: Number, default: 0 },
  },
  colorCode: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  relatedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

hazardSchema.index({ geometry: "2dsphere" });

// Gaza simplified polygon (lng, lat)
const GAZA_POLYGON = [
  [34.216, 31.353],
  [34.232, 31.568],
  [34.552, 31.586],
  [34.556, 31.333],
  [34.219, 31.22],
  [34.216, 31.353], // closed polygon
];

//validation functions

//validate hazard location
hazardSchema.statics.pointInGazaPolygon = function (lat, lng) {
  let inside = false;
  for (
    let i = 0, j = GAZA_POLYGON.length - 1;
    i < GAZA_POLYGON.length;
    j = i++
  ) {
    const xi = GAZA_POLYGON[i][0],
      yi = GAZA_POLYGON[i][1];
    const xj = GAZA_POLYGON[j][0],
      yj = GAZA_POLYGON[j][1];

    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
};

module.exports = dbConnection.model("Hazard", hazardSchema);
