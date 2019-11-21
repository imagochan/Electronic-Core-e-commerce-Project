var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hola");
  res.render('index', { title: 'Express' });
});

module.exports = router;
