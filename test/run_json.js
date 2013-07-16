thermometers=require("..");
var fs = require('fs');

var outputData = {
  name:'test',
  version:'1.0'
}

var outputFilename = 'current_temp.json'; 

var devices=thermometers.getDevices();

thermometers.readTemperature(devices[0], function(err, value) {
  console.log("Result:"+value);
  console.log("Error:"+err);
  var f = thermometers.toDegreeFarenheit(value);
  console.log("F:"+f);
  fs.writeFile(outputFilename, JSON.stringify(outputData, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to disk");
      }
  }); 
});
