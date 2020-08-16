const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeIse extends BaseNode {
    getNode () {
        if (KwNodeIse.isExpectedIseDeclaration(this)) {
            return KwNodeIse.getParsedIseNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.KAZI));
    }

    static isExpectedIseDeclaration (context) {
        return context.getBlockTypeStack().length === 0 || context.peekBlockTypeStack() === constants.PROGRAM ||
                                                    context.peekBlockTypeStack() === constants.KW.KAZI;
    }

    static getParsedIseNode (context) {
        context.skipKeyword(constants.KW.KAZI);

        return {
            operation: constants.KW.KAZI,
            name: context.parseVarname(),
            paramTokens: context.parseDelimited(
                constants.SYM.L_BRACKET, constants.SYM.R_BRACKET, constants.SYM.COMMA,
                context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE
            ),
            body: context.parseBlock(constants.KW.KAZI),
        };
    }
}

module.exports = new KwNodeIse();
