var express = require('express');
var router = express.Router();
var reciboController = require('../controller/api/reciboController');
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET home page. */
router.get('/', function(req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
//  res.render('index', { title: 'Express' });
});

router.get('/:username/:nombre', function(req,res,next){
  usuarioProductoController.Comprar(req,res,next);
});

router.post('/ordenes', async function(req,res,next){
  console.log("Making recibo");
  await reciboController.makeRecibo(req,res,next)
  .then((returned) => {
    console.log("from then " + returned);
    reciboController.getRecibosFromUsuario(req,res,next);
  });
});

/*
router.get('/ordenes/:username', function(req,res,next){
  console.log("getRecibosFromUsuario");
  reciboController.getRecibosFromMenu(req,res,next);
})

router.get('/ordenes/:username', function(req,res,next){
  console.log("LoadIndexRecibo");
  usuarioProductoController.LoadIndexRecibo(req,res,next);
});*/

module.exports = router;
