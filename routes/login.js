var express = require('express');
var router = express.Router();

//console.log("Note Count: " + notes.length)

/* GET home page. */
router.get('', function(req, res, next) {

  res.render('login');
});

module.exports = router;
