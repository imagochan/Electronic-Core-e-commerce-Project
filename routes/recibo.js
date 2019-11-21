var express = require('express');
var router = express.Router();
var reciboController = require("../controller/api/reciboController");

router.get('/', reciboController.getOne);

router.post('/', reciboController.makeRecibo);


module.exports = router;