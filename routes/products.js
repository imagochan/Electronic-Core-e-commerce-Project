var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/comprar/:nombre/:producto',function(req,res,next){
  var data = {
    user: req.params.nombre,
    producto: req.params.producto
  };

  console.log("user " + data.user + " producto " + data.producto);
  
})

/*router.get('/', function(req, res, next) {
  res.render('principal', { title: 'Express' });
});*/

module.exports = router;
