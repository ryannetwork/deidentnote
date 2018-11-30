var express = require('express');
var router = express.Router();
var fs = require('../util/loadFile');

const notes = convertFile('DeIdentNotes.txt')


//console.log("Note Count: " + notes.length)

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Deidentified Clinic Notes',   notes: notes });
});

module.exports = router;
