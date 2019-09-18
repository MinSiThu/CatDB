let fs = require("fs");
let path = require("path");

let Storage = {};

Storage._toBuffer = function(data){
    return Buffer.isBuffer(data)?data:new Buffer(data);
}

Storage.writeBinary = function(filename,data){
    let buffer = this._toBuffer(data);

    fs.writeFile(path.join(__dirname,filename),buffer,(err,data)=>{
        console.log(err);
        console.log("Success");
        
    })
}

module.exports = Storage;