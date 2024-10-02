const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getAll);
router.get('/:userId', UserController.getUsersById);
router.put('/:id', UserController.updateUser);
router.put('/Enable/:id', UserController.updateEnableByAdmin);
router.put('/Comentario/:id', UserController.updateComentarioByAdmin);
router.get('/search/:dni', UserController.searchUserByDNI);

module.exports = router;
