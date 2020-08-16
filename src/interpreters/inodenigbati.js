const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNigbati extends IBase {
    interpreteNode (node) {
        while (this.evaluateNode(node.condition) !== constants.KW.SIKWELI) {
            for (let i = 0; i < node.body.length; i++) {
                const returnedValue = this.evaluateNode(node.body[i]);
                if (returnedValue === constants.KW.VUNJA) return;
                if (returnedValue !== undefined) return returnedValue;
            }
        }
    }
}

module.exports = new INodeNigbati();
