var HID = require('node-hid');
//var readCommand=[0x01, 0x80, 0x33, 0x01, 0x00, 0x00, 0x00, 0x00];
exports.readTemperatures=function(devices) {
};

//   if((item.product==="TEMPer1V1.2" && item.vendorId===3141 && item.interface===1) || {  list.push(item.path);

String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }
  return bytes;
};

function readTemperatures() {
  var deviceList = require('./devices.json')
  var devices=HID.devices()
  devices.forEach(function(item){
    deviceList.forEach(function(device){
//      console.log(item);
//      console.log(device);
//        console.log(item.product + " vs " + device.name)
      if (item.product === device.name && parseInt(item.interface) === device.interface){
        
        console.log("********************************** found ****************************************")
        console.log(item.product + " " + device.name)
        console.log(item.path);
        temp = readDevice(item, device);
        console.log("temp:" + temp);
      };
    });
  });
  // determine device
  //
  // retrieve variables for device
  //
  // query device
  //
  // convert to degrees
  //
  // return degrees
};

function readDevice(hardware, deviceData) {
  var device = new HID.HID(hardware.path);
  converter=exports.toDegreeCelcius;
  console.log("device found")
  device.write(deviceData.readCommand.getBytes());
  console.log("write done")
  device.read(function(err,response){
                        if(err) {
                          console.log(err);
                          console.log("error will robinson");
                        } else {
                          converter(response[2],response[3])
                          console.log(response[deviceData.lowByte]);
                          console.log("finished??");
                        }
  });
  console.log("read done")

}

exports.readTemperature=function(path, callback, converter){
 if(!converter) {
  converter=exports.toDegreeCelcius;
 }
 var device = new HID.HID(path);
 device.write(readCommand);
 device.read(function(err,response){
   if(err) {
    callback.call(this,err,null); 
   } else {
    callback.call(this,null, converter(response[2],response[3]));
   }
 });
}

exports.toDegreeCelcius=function(hiByte, loByte) {
 var sign = hiByte & (1 << 7);
 var temp = ((hiByte & 0x7F) << 8) | loByte;
 if (sign) {
    temp = -temp;
 }
 console.log("did it")
 console.log(temp * 125.0 / 32000.0);
 return temp * 125.0 / 32000.0;
}

exports.readTemperatures = readTemperatures;

readTemperatures();
