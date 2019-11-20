var express = require('express');
var router = express.Router();
var userController = require('../controller/api/userController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/', function(req,res,next) {
  userController.register(req,res,next);
})

module.exports = router;