const { Report } = require("../models/Report");
const { validateReport } = require("../validation");

const addReport = async (req, res, next) => {
    try {
        const { error } = validateReport(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        await Report.create(req.body);
        res.status(201).send({ message: "Report created successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addReport
};
