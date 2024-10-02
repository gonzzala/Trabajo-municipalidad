const express = require('express');
const router = express.Router();
const PlazoVtoController = require('../controllers/plazoVto.controller');

router.get('/', PlazoVtoController.getPlazoVto);
router.put('/:id', PlazoVtoController.updatePlazoVto);

module.exports = router;
