let fs = require("fs");
let path = require("path");

let Storage = {};

Storage._toBufferFromUTF8 = function(data){
    return Buffer.isBuffer(data)?data:Buffer.from(data,"utf8");
}

Storage._toBufferFromHex = function(HEX){
    let b = Buffer.from(HEX.toString(),"hex");    
    return b;
}

//test code


Storage.writeHex = function(filename,data){
    let buffer = this._toBufferFromUTF8(data).toString("hex");

    try{        
        fs.writeFile(path.join(__dirname,filename),buffer,{'flag':'a'},(err,data)=>{
            if(err){
                throw new Error(err);
            }        
        })
    }catch(e){
        console.log(`Write operation doesn't success`);
        console.trace();
    }
}

Storage.readHex = function(filename){
    let THIS = this;

    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,filename),function(err,data){            
            if(err) reject(err);
            else {
                let buffer = THIS._toBufferFromHex(data).toString();
                resolve(buffer);
            }
        })
    })
}

module.exports = Storage;