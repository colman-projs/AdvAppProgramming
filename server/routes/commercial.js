const express = require('express');
const commercialController = require('../controllers/commercial');
const router = express.Router();

router.get('/', commercialController.getCommercials);

router.get('/:screenId(\\d+)', commercialController.getCommercialsByScreenId);

router.get('/:commercialId', commercialController.getCommercialById);

router.post('/', commercialController.upsertCommercial);

router.delete('/:commercialId', commercialController.deleteCommercial);

module.exports = router;
