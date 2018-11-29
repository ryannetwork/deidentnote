var fs = require('fs');

convertFile = function (filename) {
        var notes = {}     
        try {
            var content = fs.readFileSync(filename, "utf8")
            var lines = content.split(/\n/)
          	for (var id  in lines) {

          		line = lines[id].split(/\|\|/)
              if (line[0]!=="ID") {
                notes[line[0]] = { 
                 note_type: line[2],
                 note_dts: line[1],
                 ID: line[0],
                }  
              }
              
        	}
          	return notes        
        } catch (err) {
            return err
        }
    
};

