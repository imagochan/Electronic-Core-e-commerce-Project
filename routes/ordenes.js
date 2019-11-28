var express = require('express');
var router = express.Router();
var reciboController = require('../controller/api/reciboController');
var usuarioProductoController = require('../controller/api/userProductoController');

//Ruta para obtener las ordenes desde menu en pagina principal
router.get('/:username', function(req,res,next){
    console.log("getRecibosFromMenu");
    reciboController.getRecibosFromMenu(req,res,next);
})

module.exports = router;