const express = require('express');
const mongoose = require('mongoose')
const commercialController = require('../controllers/commercial')
const router = express.Router()

router.get('/', commercialController.getAllcommercials);

 router.get('/name/:commercialName', commercialController.getByName);

router.get('/:commercialId', commercialController.getById);

router.post('/', commercialController.create);

router.put('/', commercialController.update);

router.delete('/', commercialController.remove);


module.exports = router;