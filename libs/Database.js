let Event = require("events");
let Indexer = require("./Indexer");
let Persistent = require("./Persistent");
let Model = require("./Model");
let Query = require("./Query");
let Executor = require("./Executor");
let util = require("util");

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
        this._executor = new Executor(this._indexer);
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
        if(util.isArray(newDoc)){
            return newDoc.map(doc=>{
                return this._insertOne(doc);
            })
        }else if(util.isObject(newDoc)){
            return this._insertOne(newDoc);
        }        
    }

    _insertOne(newDoc){
        let preparedDoc = this._model.prepareDoc(newDoc);
      //  console.log(preparedDoc);
        
        this._addToCache(preparedDoc);
        this._addCacheToPersistent(preparedDoc);
        return preparedDoc.cleanedDoc;
    }

    async find(query,options){
        let preparedQuery =  this._Query.prepare("find",query,options);
        let result = this._executor.exe(preparedQuery);
        return result
    }

    _loadDocs(docStrings){
        let THIS = this;        
        let preparedDocs = docStrings.map(docString=>{
            return THIS._model.prepareLoadedDoc(JSON.parse(docString)); 
        })
        this._indexer.insertLoadedDocs(preparedDocs);
    }

    _addToCache(doc){
        return this._indexer.insert(doc);
    }

    _addCacheToPersistent(doc){
        this._persistent.persist(doc);
    }
}

module.exports = Database;