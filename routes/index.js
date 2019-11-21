var express = require('express');
var router = express.Router();
var productController = require("../models/Producto");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(productController.getProducts(req,res,next));
  res.render('index', { title: 'Express' });
});

module.exports = router;
