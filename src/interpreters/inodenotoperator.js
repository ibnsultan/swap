const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNotOperator extends IBase {
    interpreteNode (node) {
        return (this.evaluateNode(node.body) === constants.KW.SIKWELI) ? constants.KW.KWELI : constants.KW.SIKWELI;
    }
}

module.exports = new INodeNotOperator();
