var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'ElectricCore' });
});

//Ruta que ejecuta controller para validar login y obtener los productos
router.post('/',function (req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);  
});

//Ruta para redireccionar a pagina de signup
router.post('/signup', function (req, res, next) {
  res.render('signup', {title:'ElectricCore'});
});

module.exports = router;
