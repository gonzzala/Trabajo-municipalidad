const express = require('express');
const loginController = require('../controllers/login.controller');
const validatorHandler = require('../middlewares/validator.handler');
const loginSchema = require('../schemas/login.schema');

const router = express.Router();

router.post('/', validatorHandler(loginSchema), loginController.login)
// Ruta para manejar la solicitud de problemas
router.post('/login-problems', loginController.reportProblems);

module.exports = router;