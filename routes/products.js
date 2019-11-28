var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");

router.get('/nuevoproducto',function(req,res,next){
  res.render('nuevoproductoform', { title: 'ElectronicCore' });
})

router.get('/:_id',function(req,res,next){
  productController.getOneProduct(req,res,next);
})

router.post('/nuevoproducto',function(req,res,next){
  productController.addProduct(req,res,next);
})

/* UPDATE one page. */
router.get('/update/:nombre', function(req, res, next) {
  console.log("update");
  productController.update(req,res,next);
//  res.render('actualizarproductoform', {title: 'ElectronicCore'});
});

/* DELETE one PRODUCT. */
router.get('/delete/:nombre/:username', function(req, res, next) {
  productController.deleteProduct(req,res,next);
});

/* UPDATE one page. part2 */
router.post('/update/:nombre', function(req, res, next) {
  console.log("update2");
  productController.update2(req,res,next);
});

/*router.get('/', function(req, res, next) {
  res.render('principal', { title: 'Express' });
});*/

module.exports = router;
