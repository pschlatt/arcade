var express = require('express');
var router = express.Router();

/* home Get*/
/* home Get*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
