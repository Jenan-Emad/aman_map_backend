const { dbConnection } = require("../config");
const mongoose = require("mongoose");
const { WebServiceClient } = require("@maxmind/geoip2-node");
const client = new WebServiceClient(
  process.env.MAXMIND_ACCOUNT_ID,
  process.env.MAXMIND_LICENSE_KEY
);

const deviceSchema = new mongoose.Schema({
  // deviceType: { type: String, required: true }, //I think this info is not important because we use the visitorId which mainly depend on these information
  ipAddress: { type: String, required: true, unique: true },
  visitorId: { type: String, required: true, unique: true }, // this is the unique id from fingerprintjs library
  // lastActive: { type: Date, default: Date.now },
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

//validation functions

//validate user location  tested: true with ip example
deviceSchema.statics.validateUserLocation = async function (ipAddress) {
  try {
    const DeviceLocationCity = await client.city(ipAddress);
    if (DeviceLocationCity.city.names.en !== "Gaza") {
      return false;
    }
    return true;
  } catch (err) {
    console.error("GeoIP lookup failed:", err);
    return false; // On error, consider location invalid
  }
};

//validate user fingerprint
deviceSchema.statics.validateVisitorId = async function (visitorId) {
  const device = await this.findOne({ visitorId: visitorId });
  if (!device) {
    return false; // Device not found
  }
  return true;
};


//validate ip address
deviceSchema.statics.validateIpAddress = async function (ipAddress) {
  const device = await this.findOne({ ipAddress: ipAddress });
  if (!device) {
    return false; // Device not found
  }
  return true;
};

module.exports = dbConnection.model("Device", deviceSchema);
