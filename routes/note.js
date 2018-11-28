var express = require('express');
var router = express.Router();
var fs = require('../util/loadFile');

const notes = convertFile('DeIdentNotes.txt')


/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var noteId = req.params.id
	//res.send(JSON.stringify(notes[noteId]));
	res.render('note', { note: notes[noteId] });

});


module.exports = router;

