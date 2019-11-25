var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET home page. */
router.get('/', function(req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
//  res.render('index', { title: 'Express' });
});

router.get('/:username/:nombre', function(req,res,next){
  console.log("Hola");
  usuarioProductoController.Comprar(req,res,next);
});

module.exports = router;
