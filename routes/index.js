const DeviceRoute = require("./device");
const HazardRoutes = require("./hazard");

module.exports = (app) => {
    app.use("/hazards", HazardRoutes),
    app.use("/devices", require("./device")),
    app.use("/logs", require("./log")),
    app.use("/reports", require("./report"))
}

