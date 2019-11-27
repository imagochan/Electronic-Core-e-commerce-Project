var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');
var usuarioProductoController = require('../controller/api/userProductoController');

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'ElectricCore' });
});


router.post('/',function (req, res, next) {
  usuarioProductoController.LoadIndex(req,res,next);
//  userController.Login(req,res,next);
//  var foundUser = userController.Login(req,res,next);
/*  if(foundUser){
    res.render('index', {title: 'Express', userId: foundUser._id, username: foundUser.username})
  }else{
    console.log("notFound");
    res.redirect('/');
  }*/
  
});

router.post('/signup', function (req, res, next) {
  res.render('signup', {title:'ElectricCore'});
});

module.exports = router;
