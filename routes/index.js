const express = require('express');
const mapController = require('../controllers/MapController')

const router = express.Router();

router.get('/addHazard', mapController.addHazard)
    .get('/documentHazard', mapController.documentHazard)
    .get('/reportHazard', mapController.reportHazard)
    .get('/endHazard', mapController.endHazard)
    // .get('/isInsideGaza', mapController.isInsideGaza);
    // .get('/validateUserLocation', mapController.validateUserLocation); //only for testing

module.exports =  router;