var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function (req, res, next) {
/*  if (req == 'login')
    res.render('index', { title: 'Express' });
  else if (req == 'signup')
    res.render('signup', { title: 'Express' });
  else
    res.render('index', { title: 'Express' });*/
    console.log("Logged In");
    res.render('index', { title: 'Express' });
});

router.post('/signup', function (req, res, next) {
  console.log("Sign Up!!!!");
  res.render('signup', {title:'Express'});
});

module.exports = router;
