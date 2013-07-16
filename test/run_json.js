thermometers=require("..");
var fs = require('fs');

var outputData = {
  date:'null',
  degreesF:0
}

var outputFilename = 'current_temp.json'; 

var devices=thermometers.getDevices();

thermometers.readTemperature(devices[0], function(err, value) {
  console.log("Result:"+value);
  console.log("Error:"+err);
  var f = thermometers.toDegreeFarenheit(value);
  console.log("F:"+f);
  
  var now = new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');

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
