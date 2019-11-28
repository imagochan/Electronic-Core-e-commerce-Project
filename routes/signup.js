var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');


/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

//Logistica de signup y creacion de usuario
router.post('/', function(req,res,next) {
  userController.register(req,res,next);
  res.redirect('/');
})

module.exports = router;