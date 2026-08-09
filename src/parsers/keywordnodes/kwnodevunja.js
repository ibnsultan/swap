const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeVunja extends BaseNode {
    getNode () {
        if (KwNodeVunja.isExpectedVunjaStatement(this)) {
            return KwNodeVunja.getParsedVunjaNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.VUNJA));
    }

    static isExpectedVunjaStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.HAKIKA) ||
                                            context.getBlockTypeStack().includes(constants.KW.WAKATI);
    }

    static getParsedVunjaNode (context) {
        const node = {};
        node.operation = context.lexer().next().value;
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeVunja();
