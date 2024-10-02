const express = require('express');
const AdminController = require('../controllers/admin.controller');
const validatorHandler = require('../middlewares/validator.handler');
const adminSchema = require('../schemas/admin.schema'); 
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();

router.post('/', AdminController.createAdmin);
router.get('/', AdminController.getAll);
router.put('/:id', AdminController.updateAdmin);

module.exports = router;
