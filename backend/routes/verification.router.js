const express = require('express');
const verificationController = require('../controllers/verification.controller');

const router = express.Router();

router.get('/:userId', verificationController.verifyEmail);

module.exports = router;
