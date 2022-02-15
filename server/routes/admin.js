const express = require('express');
const adminController = require('../controllers/admin');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.post('/', adminController.authenticate);
router.post('/update', authJwt.verifyToken, adminController.updateDetails);

module.exports = router;
