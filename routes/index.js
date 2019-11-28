var express = require('express');
var router = express.Router();
var reciboController = require('../controller/api/reciboController');
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET home page. */
router.get('/', function(req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
});

//Get para buscar informacion de comprar
router.get('/:username/:nombre', function(req,res,next){
  usuarioProductoController.Comprar(req,res,next);
});

//Post para obtener las ordenes realizadas por el usuario
router.post('/ordenes', async function(req,res,next){
  console.log("Making recibo");
  await reciboController.makeRecibo(req,res,next)
  .then((returned) => {
    console.log("from then " + returned);
    reciboController.getRecibosFromUsuario(req,res,next);
  });
});

module.exports = router;
