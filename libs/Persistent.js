let Storage = require("./Storage");

class Persistent{
    constructor(dbname){
        this._persistentFilename = `${dbname}.catdb.binary`;
    }

    async loadDatabase(){
        let data = await Storage.readHex(this._persistentFilename);
        return data;
    }

    persist(doc){
        Storage.writeHex(this._persistentFilename,JSON.stringify(doc.cleanedDoc));
    }

    _appendBinary(){
        
    }
}

module.exports = Persistent;