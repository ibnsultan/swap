const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeAnd extends IBase {
    interpreteNode (node) {
        return this.evaluateNode(node.left) !== constants.KW.SIKWELI && this.evaluateNode(node.right) !== constants.KW.SIKWELI
            ? constants.KW.KWELI : constants.KW.SIKWELI;
    }
}

module.exports = new INodeAnd();
