const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeIta extends BaseNode {
    getNode () {
        if (KwNodeIta.isExpectedItaStatement(this)) {
            return KwNodeIta.getParsedItaNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.ITA));
    }

    static isExpectedItaStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.NJIA);
    }

    static getParsedItaNode (context) {
        context.skipKeyword(constants.KW.ITA);
        const node = {};
        node.operation = constants.KW.ITA;
        node.varNames = KwNodeIta.getItaVarNames(context);
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }

    static getItaVarNames (context) {
        const varTokens = context.parseDelimited("`", "`", ",", context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE);
        const varNames = [];
        varTokens.map(varToken => {
            varNames.push(varToken.value);
        });

        return varNames;
    }
}

module.exports = new KwNodeIta();
