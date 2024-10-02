const express = require('express');
const router = express.Router();
const EstadoController = require('../controllers/estado.controller');

router.get('/', EstadoController.getAll);

module.exports = router;
