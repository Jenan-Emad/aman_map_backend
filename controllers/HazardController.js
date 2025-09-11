const {Hazard} = require("../models/Hazard");
const { Device, Log, Report } = require('../models');
const validator = require('../validation');

const createHazard = async (req, res) => {
    try {
        const { error } = validator.hazardValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }   
        const hazard = await Hazard.create(req.body);
        res.status(201).json({ message: "Hazard created successfully", hazard });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getAllHazards = async (req, res) => {
    try {
        const hazards = await Hazard.findAll();
        res.status(200).json(hazards);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    createHazard,
    getAllHazards
};