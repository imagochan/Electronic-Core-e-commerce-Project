var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');

//Rutas de postman para usuario
router.get('/:username', userController.getOne);
router.get('/:username:password', userController.Login);
router.get('/', userController.getAll);

router.post('/', userController.register);


module.exports = router;