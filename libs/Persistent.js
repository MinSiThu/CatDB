let Storage = require("./Storage");

class Persistent{
    constructor(dbname){
        this._persistentFilename = `${dbname}.catdb.binary`;
    }

    persist(doc){
        Storage.writeBinary(this._persistentFilename,doc);
    }

    _appendBinary(){
        
    }
}

module.exports = Persistent;