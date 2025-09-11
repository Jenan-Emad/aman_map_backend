const {Device} = require("../models/Device");
const { Log } = require("../models/Log");
const { Report } = require("../models/Report");
const validator = require("../validation");

const addDevice = (async (req, res, next) => {
    try {
        const {error} = validator.deviceValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        await Device.create(req.body);
        res.status(201).send({message: "Device created successfully"});
    } catch (error) {
        next(error);
    }
});


module.exports = {
    addDevice
};