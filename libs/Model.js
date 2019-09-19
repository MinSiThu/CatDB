let uniqid = require("uniqid");
let util = require("util");

class Model{
    constructor(options){
        this.timestampData = options.timestampData||false;
    }

    prepareLoadedDoc(doc){
        return {
            key:doc._id,
            cleanedDoc:doc
        }
    }

    /**
     * return prepared Document
     * @param {object} doc 
     * @returns {object}
     */
    prepareDoc(doc){
        let cleanedDoc;
        let _id = "";

        try{
            if(typeof doc == "object"){
                cleanedDoc = this._deepCopy(doc); //prepared docs
                _id = uniqid();
                cleanedDoc = {_id,...cleanedDoc};
            }else{
                throw new Error("document must be object type!");
            }
        }catch(e){
            console.trace(e);            
        }

        // set up timestampData
        if(this.timestampData == true){
            let created_time = new Date();
            cleanedDoc.created_time = created_time.toISOString();
        }

        return {
            key:_id,
            cleanedDoc,
        }
    }

    /**
     * checks function property
     * @param {object} doc 
     * @returns {object}
     * 
     */
    _deepCopy(doc){
        let preparedDoc = {};

        try{
            for(const key in doc) {
                if (doc.hasOwnProperty(key)) {
                    if( util.isObject(doc[key]) == true ){
                        preparedDoc[key] = this._deepCopy(doc[key]);
                    }else if( util.isFunction(doc[key]) == true ){
                        throw new Error(`function type can't be supported!`);
                    }else{
                        preparedDoc[key] = doc[key];
                    }
                }
            }
        }catch(e){
            console.trace(e);            
        }

        return preparedDoc;
    }

}

module.exports = Model;