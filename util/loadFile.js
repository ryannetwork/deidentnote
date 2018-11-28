var fs = require('fs');

convertFile = function (filename) {
        var notes = {}     
        try {
            var content = fs.readFileSync(filename, "utf8")
            var lines = content.split(/\n/)
          	for (var id  in lines) {

          		line = lines[id].split(/\|\|/)
               	//console.log(addNewLines(line[3]))
               	notes[line[2]] = { 
					note_type: line[0],
					note_dts: line[1],
					ID: line[2],
					note_rpt_txt: line[3], //.replace(/\. /g, "<br />\r\n"),
					note_rpt_txt_deid: line[4] //.replace(/\. /g, "<br />\r\n")
				}
        	}
          	return notes        
        } catch (err) {
            return err
        }
    
};

