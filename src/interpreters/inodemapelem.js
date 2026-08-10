const IBase = require("./ibase.js");
const constants = require("../constants.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeMapElement extends IBase {
    interpreteNode (node) {
        const hifadhiNode = { name: node.name, operation: constants.GET_HIFADHI, };
        const mapLiteral = this.evaluateNode(hifadhiNode);

        return INodeMapElement.getMapElement(this, node, mapLiteral);
    }

    static getMapElement (context, node, mapLiteral) {
        if (!INodeMapElement.isMap(mapLiteral)) context.throwError(feedbackMessages.invalidMapAccessMsg(node.name));
        if (!(node.key in mapLiteral)) context.throwError(feedbackMessages.mapKeyDoesNotExistMsg(node.name, node.key));

        return mapLiteral[node.key];
    }

    static isMap (value) {
        return typeof value === "object" && value !== null && !Array.isArray(value);
    }
}

module.exports = new INodeMapElement();
