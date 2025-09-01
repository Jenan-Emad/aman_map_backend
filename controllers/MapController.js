const e = require('express');
const { Device, Hazard, Log, Report } = require('../models');
const validator = require('../validation');

const addHazard = ((req, res, next) => {
res.send("<h1>welcome to add hazard</h1>");

//validate user location
//validate hazard location
//check if user has time restriction using log model
//add to hazard
//add to log
//add to device if not exist

});

const documentHazard = ((req, res, next) => {
res.send("<h1>welcome to document hazard</h1>");

//validate user location
//validate device fingerprint
//

});

const reportHazard = ((req, res, next) => {
res.send("<h1>welcome to report hazard</h1>");

});

const endHazard = ((req, res, next) => {
res.send("<h1>welcome to add hazard</h1>");

});


// for testing the entered hazard location validation
// const isInsideGaza = ((req, res, next) => {
//     const lat = 31.5019;// Example coordinates
//     const lng = 34.4666;
//     res.send(Hazard.pointInGazaPolygon(lat, lng)); // true example
//     res.send(Hazard.pointInGazaPolygon(31.6, 34.5)); // false example
// });



// for testing the user location validation
// const validateUserLocation =  ((req, res, next) => {
 
//     // Get client IP (Express may show ::1 for localhost, so test with a real IP)
//     // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     const ip = "212.14.245.115"; // Example
//     Report.validateUserLocation(ip).then(isValid => {
//       if (!isValid) {
//         return res.json({ message: "Location not allowed", status: 403 });
//       }
//       res.json({ message: "Location valid", status: 200 });
//     }).catch(err => {
//       console.error(err);
//       res.json({ message: "Error validating location", status: 500 });
//     });
// });



module.exports = {
    addHazard,
    documentHazard,
    reportHazard,
    endHazard
}