const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeKazi extends BaseNode {
    getNode () {
        if (KwNodeKazi.isExpectedKaziDeclaration(this)) {
            return KwNodeKazi.getParsedKaziNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.NJIA));
    }

    static isExpectedKaziDeclaration (context) {
        return context.getBlockTypeStack().length === 0 || context.peekBlockTypeStack() === constants.PROGRAM ||
                                                    context.peekBlockTypeStack() === constants.KW.NJIA;
    }

    static getParsedKaziNode (context) {
        context.skipKeyword(constants.KW.NJIA);

        return {
            operation: constants.KW.NJIA,
            name: context.parseVarname(),
            paramTokens: context.parseDelimited(
                constants.SYM.L_BRACKET, constants.SYM.R_BRACKET, constants.SYM.COMMA,
                context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE
            ),
            body: context.parseBlock(constants.KW.NJIA),
        };
    }
}

module.exports = new KwNodeKazi();
