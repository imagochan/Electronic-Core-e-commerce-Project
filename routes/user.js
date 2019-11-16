var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');

router.get('/:username', userController.getOne);
router.get('/', userController.getAll);

router.post('/', userController.register);


module.exports = router;