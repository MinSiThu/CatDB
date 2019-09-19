let Event = require("events");
let Indexer = require("./Indexer");
let Persistent = require("./Persistent");
let Model = require("./Model");

class Database extends Event.EventEmitter {
    constructor(options){
        super();

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
        this.model = new Model({
            timestampData:this.timestampData,
        });
    }

    async loadDatabase(cb){
        let THIS = this;
        return new Promise(async (resolve,reject)=>{
            try{
                let data = await this._persistent.loadDatabase();                
                if(typeof cb == "function"){
                    cb(null)
                }else{
                    THIS._loadDocs(data);
                    resolve();
                }
            }catch(e){
                if(typeof cb == "function"){
                    THIS._loadDocs(data);
                    cb(e)
                }else{
                    reject(e);
                }
            }
        })
    }

    _loadDocs(docStrings){
        let THIS = this;        
        let preparedDocs = docStrings.map(docString=>{
            return JSON.parse(docString);
        })
        this._indexer.insertDocs(preparedDocs);
    }

    insert(newDoc){
        let preparedDoc = this.model.prepareDoc(newDoc);
        this._addToCache(preparedDoc);
        this._addCacheToPersistent(preparedDoc);
        return preparedDoc.cleanedDoc;           
    }

    _addToCache(doc){
        return this._indexer.insert(doc);
    }

    _addCacheToPersistent(doc){
        this._persistent.persist(doc);
    }
}

module.exports = Database;