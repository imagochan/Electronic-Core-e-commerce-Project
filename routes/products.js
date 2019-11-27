var express = require('express');
var router = express.Router();
var productController = require("../controller/api/productController");

router.get('/nuevoproducto',function(req,res,next){
  res.render('nuevoproductoform', { title: 'Express' });
})

router.get('/:_id',function(req,res,next){
  productController.getOneProduct(req,res,next);
})

router.post('/nuevoproducto',function(req,res,next){
  productController.addProduct(req,res,next);
})

/* UPDATE one page. */
router.get('/update/:nombre', function(req, res, next) {
  productController.update(req,res,next);
});

/* DELETE one PRODUCT. */
router.get('/delete/:nombre', function(req, res, next) {
  productController.deleteProduct(req,res,next);
});

/* UPDATE one page. part2 */
router.post('/update/:nombre', function(req, res, next) {
  productController.update2(req,res,next);
});

/*router.get('/', function(req, res, next) {
  res.render('principal', { title: 'Express' });
});*/

module.exports = router;
