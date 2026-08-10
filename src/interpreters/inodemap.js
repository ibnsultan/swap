const IBase = require("./ibase.js");

class INodeMap extends IBase {
    interpreteNode (node) {
        const map = {};

        node.body.forEach((entry) => {
            map[entry.key] = this.evaluateNode(entry.valueNode);
        });

        return map;
    }
}

module.exports = new INodeMap();
