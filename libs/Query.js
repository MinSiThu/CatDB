class Query {
    constructor(operation,query,options){
        this.executeStack = [];
        this.operationType = operation;
    }

    prepareQuery(operation,query,options){
        
    }
}

module.exports = Query;