let BinarySearchTree = require("binary-search-tree").AVLTree;

class Indexer {
    constructor(){
        this._bst = new BinarySearchTree();
    }

    insert(doc){
        let {_id,cleanedDoc} = doc;
        this._bst.insert(_id,cleanedDoc);
    }
}

module.exports = Indexer;