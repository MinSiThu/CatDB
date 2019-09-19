let Event = require("events");
let Indexer = require("./Indexer");
let Persistent = require("./Persistent");
let Model = require("./Model");
let Query = require("./Query");
let Executer = require("./Executer");

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
        this._model = new Model({
            timestampData:this.timestampData,
        });
        this._Query = Query;
        this._executer = new Executer(this._indexer);
    }

    async loadDatabase(){
        let THIS = this;
        try{
            let data = await THIS._persistent.loadDatabase();                
            THIS._loadDocs(data);
            THIS.emit("load");
        }catch(e){
            THIS.emit("error",e);
        }
    }

    insert(newDoc){
        let preparedDoc = this._model.prepareDoc(newDoc);
        this._addToCache(preparedDoc);
        this._addCacheToPersistent(preparedDoc);
        return preparedDoc.cleanedDoc;           
    }

    async find(query){
        let preparedQuery =  this._Query.prepare(query);
        let result = this._executer.exe(preparedQuery);
        return result
    }

    _loadDocs(docStrings){
        let THIS = this;        
        let preparedDocs = docStrings.map(docString=>{
            return JSON.parse(docString);
        })
        this._indexer.insertDocs(preparedDocs);
    }

    _addToCache(doc){
        return this._indexer.insert(doc);
    }

    _addCacheToPersistent(doc){
        this._persistent.persist(doc);
    }
}

module.exports = Database;