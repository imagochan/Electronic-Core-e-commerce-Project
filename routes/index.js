var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET home page. */
router.get('/', function(req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
//  res.render('index', { title: 'Express' });
});

module.exports = router;
