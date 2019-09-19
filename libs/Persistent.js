let Storage = require("./Storage");

class Persistent{
    constructor(dbname){
        this._persistentFilename = `${dbname}.catdb.binary`;
        this._dataSeparator = `!u@w#f$%^&*()_+`
    }

    async loadDatabase(){
        let data = await Storage.readHex(this._persistentFilename);        
        data = data.split(this._dataSeparator);
        data.pop();
        return data;
    }

    persist(doc){
        Storage.writeHex(this._persistentFilename,JSON.stringify(doc.cleanedDoc)+this._dataSeparator);
    }

    _appendBinary(){
        
    }
}

module.exports = Persistent;