var express = require('express');
var router = express.Router();
var reciboController = require('../controller/api/reciboController');
var productController = require("../controller/api/productController");
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET home page. */
router.get('/', function(req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
//  res.render('index', { title: 'Express' });
});

router.get('/:username/:nombre', function(req,res,next){
  usuarioProductoController.Comprar(req,res,next);
});

router.post('/ordenes', function(req,res,next){
  reciboController.makeRecibo(req,res,next);
});

router.get('/ordenes/:username', function(req,res,next){
  usuarioProductoController.LoadIndexRecibo(req,res,next);
});

module.exports = router;
