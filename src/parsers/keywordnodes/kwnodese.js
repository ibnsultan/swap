const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeSe extends BaseNode {
    constructor () {
        super();
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency brackExpressionNl"));
        }
    }

    getNode () {
        this.skipKeyword(constants.KW.KAMA);

        const node = {};
        node.operation = constants.KW.KAMA;
        node.condition = bracketExpressionNl.getNode.call(this, { isArithmeticExpression: false, isBracketExpected: true, });
        node.then = this.parseBlock(constants.KW.KAMA);

        if (this.isNextTokenKeyword(constants.KW.BASI)) {
            node.else = KwNodeSe.getTabiNode(this);
        }

        return node;
    }

    static getTabiNode (context) {
        context.skipKeyword(constants.KW.BASI);

        if (context.isNextTokenKeyword(constants.KW.KAMA)) { // cater for 'tabi se' block
            return new KwNodeSe().getNode.call(context);
        }

        return context.parseBlock(constants.KW.BASI);
    }
}

module.exports = new KwNodeSe();
