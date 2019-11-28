var express = require('express');
var router = express.Router();
var reciboController = require("../controller/api/reciboController");

//Rutas para postman recibos
router.get('/', reciboController.getOne);

router.post('/', reciboController.makeRecibo);


module.exports = router;