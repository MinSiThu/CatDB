let BinarySearchTree = require("binary-search-tree").AVLTree;
let compareKey = (a,b)=>{
    console.log(a,b);
    
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
}

class Indexer {
    constructor(){
        this._bst = new BinarySearchTree(compareKey);
        this._keys = [];
    }

    insert(doc){        
        let {key,cleanedDoc} = doc;
        this._keys.push(key);
        this._bst.insert(key,cleanedDoc);
    }

    insertLoadedDocs(docs){
        docs.forEach(doc =>{
            this.insert(doc);
        });
    }
}

module.exports = Indexer;