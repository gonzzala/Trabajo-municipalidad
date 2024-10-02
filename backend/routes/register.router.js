const express = require('express');
const registerController = require('../controllers/register.controller');
const validatorHandler = require('../middlewares/validator.handler');
const registerSchema = require('../schemas/register.schema');

const router = express.Router();

router.post('/', validatorHandler(registerSchema), registerController.register);

module.exports = router;
