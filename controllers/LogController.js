const {log} = require('../models');
const { Report } = require("../models/Report");
const { validateReport } = require("../validation");

const addLog = async (req, res, next) => {
    try {
        const { error } = validateReport(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        await log.create(req.body);
        res.status(201).send({ message: "Log created successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addLog
};