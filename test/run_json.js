thermometers=require("..");
var fs = require('fs');
var moment = require('moment');

var outputData = {
  date:'null',
  degreesF:0
}

var outputFilename = 'current_temp.json'; 

var devices=thermometers.getDevices();

thermometers.readTemperature(devices[0], function(err, value) {
  var f = thermometers.toDegreeFarenheit(value);
  console.log("F:"+f);
  
  var now = moment().format("YYYY-MM-DD HH:mm:ss");

  outputData.degreesF = f;
  outputData.date = now;
  fs.writeFile(outputFilename, JSON.stringify(outputData, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to disk");
      }
  }); 
});
