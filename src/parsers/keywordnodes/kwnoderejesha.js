const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeRejesha extends BaseNode {
    getNode () {
        if (KwNodeRejesha.isExpectedRejeshaStatement(this)) {
            return KwNodeRejesha.getParsedRejeshaNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.REJESHA));
    }

    static isExpectedRejeshaStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.NJIA);
    }

    static getParsedRejeshaNode (context) {
        context.skipKeyword(constants.KW.REJESHA);
        const node = {};
        node.operation = constants.KW.REJESHA;
        node.body = context.parseExpression();
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeRejesha();
