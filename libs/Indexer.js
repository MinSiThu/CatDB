let BinarySearchTree = require("binary-search-tree").AVLTree;
let uniqid = require("uniqid");

class Indexer {
    constructor(){
        this._bst = new BinarySearchTree();
    }

    insert(docs){
        this._bst.insert(uniqid,JSON.stringify(docs));
        return docs;
    }
}

module.exports = Indexer;