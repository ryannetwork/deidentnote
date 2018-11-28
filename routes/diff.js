var express = require('express');
var router = express.Router();
var fs = require('../util/loadFile');
var myRequest = require('request');

//const notes = convertFile('DeIdentNotes.txt')


/* GET Note By ID directy from CRDW. */
router.get('/:id', function(req, res, next) {
	var noteId = req.params.id
	//res.send(JSON.stringify(notes[noteId]));

    var options = {
        url: "http://localhost:9292/clinicnote/",
      qs: {
        'noteid': noteId,
        
        }
    };
 	myRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var bodyObj = JSON.parse(body);
            //console.log(bodyObj)
            res.render('diff', { note: bodyObj });

        } else {
        	res.render('error', { error: error })
        }
    })
	
});

/* GET Note By ID from 500 Random notes. */
router.get('/old/:id', function(req, res, next) {
	var noteId = req.params.id
	//res.send(JSON.stringify(notes[noteId]));
	res.render('diff', { note: notes[noteId] });

});


router.post('/', function(req, res, next) {
	var noteId = parseInt(req.body.noteid)
	console.log("POST")
	if (noteId > 0) {
		res.redirect('/diff/' + noteId );
	} else {
		res.render('error', { error: 'error in note id'})
	}
		

});

module.exports = router;

