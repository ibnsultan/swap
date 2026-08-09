const IBase = require("./ibase.js");

class INodeRejesha extends IBase {
    interpreteNode (node) {
        return this.evaluateNode(node.body);
    }
}

module.exports = new INodeRejesha();
