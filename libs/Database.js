let Indexer = require("./Indexer");
let Persistent = require("./Persistent");

class Database {
    constructor(options){
        if(typeof options == "string"){
            this.filename = options;
        }else{
            options = options || {};
            this.filename = options.filename || "default"
            this.inMemoryOnly = options.inMemoryOnly || false;
            this.autoload = options.autoload || false;
            this.timestampData = options.timestampData || false;
        }

        this._indexer = new Indexer();
        this._persistent = new Persistent(this.filename);
    }

    insert(newDoc){
        let indexedDocs = this._addToCache(newDoc);
        this._addCacheToPersistent(indexedDocs);           
    }

    _addToCache(doc){
        return this._indexer.insert(doc);
    }

    _addCacheToPersistent(doc){
        this._persistent.persist(doc);
    }
}

module.exports = Database;