const express = require('express');
const router = express.Router();
const PartidoController = require('../controllers/partido.controller');

router.get('/', PartidoController.getAll);

module.exports = router;
