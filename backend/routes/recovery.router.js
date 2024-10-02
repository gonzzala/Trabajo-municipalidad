const express = require('express');
const recoveryController = require('../controllers/recovery.controller');
const { recoveryRequestSchema, resetPasswordSchema } = require('../schemas/recovery.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.post('/request', validatorHandler(recoveryRequestSchema), recoveryController.requestRecovery);
router.post('/reset', validatorHandler(resetPasswordSchema), recoveryController.resetPassword);

module.exports = router;