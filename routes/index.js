var express = require('express');
var router = express.Router();
var controller = require('../app/controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new', controller.new);


module.exports = router;
