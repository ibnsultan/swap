const IBase = require("./ibase.js");

class INodeAndika extends IBase {
    interpreteNode (node) {
        this.environment().andika(this.evaluateNode(node.body));
    }
}

module.exports = new INodeAndika();
