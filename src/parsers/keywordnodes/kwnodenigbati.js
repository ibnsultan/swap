const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeNigbati extends BaseNode {
    constructor () {
        super();
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependencies bracketExpressionNl"));
        }
    }

    getNode () {
        this.skipKeyword(constants.KW.WAKATI);

        return {
            operation: constants.KW.WAKATI,
            condition: bracketExpressionNl.getNode.call(this, false),
            body: this.parseBlock(constants.KW.WAKATI),
        };
    }
}

module.exports = new KwNodeNigbati();
