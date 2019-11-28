var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");

//Ruta para cargar formulario de creacion de un nuevo producto desde menu
router.get('/nuevoproducto',function(req,res,next){
  res.render('nuevoproductoform', { title: 'ElectronicCore' });
})

//Ruta para postman para obtener un solo producto
router.get('/:_id',function(req,res,next){
  productController.getOneProduct(req,res,next);
})

//Ruta para crear un nuevo producto desde formulario adecuado
router.post('/nuevoproducto',function(req,res,next){
  productController.addProduct(req,res,next);
})

/* Ruta para update de producto usada desde pagina de producto especifico*/
router.get('/update/:nombre', function(req, res, next) {
  console.log("update");
  productController.update(req,res,next);
});

/* DELETE one PRODUCT. */
router.get('/delete/:nombre/:username', function(req, res, next) {
  productController.deleteProduct(req,res,next);
});

/* Ruta de funcionamiento de update */
router.post('/update/:nombre', function(req, res, next) {
  console.log("update2");
  productController.update2(req,res,next);
});

module.exports = router;
