const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/area.controller');

// Obtener todas las áreas
router.get('/', AreaController.getAll);

// Obtener áreas por ID de administrador
router.get('/:userId', AreaController.getAreasByIdAdmin);

// Crear nueva área
router.post('/', AreaController.createArea);

// Actualizar área por ID
router.put('/:id', AreaController.updateArea);

// Eliminar área por ID
router.delete('/:id', AreaController.deleteArea);

module.exports = router;
