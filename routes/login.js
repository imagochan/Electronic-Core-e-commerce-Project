var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');
const User = require('../models/Usuario');


/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  console.log(req.body.username);
  User = userController.getAllLogin();
  var found = userController.getAllLogin;
  console.log(User);

  if(1==1)
    res.render('index', { title: 'Express' });
  else
    res.json("error");
});

router.post('/signup', function (req, res, next) {
  res.render('signup', {title:'Express'});
});

module.exports = router;
