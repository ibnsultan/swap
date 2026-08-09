const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeChagua extends BaseNode {
    constructor () {
        super();
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency bracketExpressionNl"));
        }
    }

    getNode () {
        const node = {};
        node.operation = constants.KW.CHAGUA;
        this.pushToBlockTypeStack(constants.KW.CHAGUA);
        this.skipKeyword(constants.KW.CHAGUA);
        node.chaguavalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);
        node.chaguabody = KwNodeChagua.getChaguaBody(this);
        node.zaidi = KwNodeChagua.getZaidi(this);
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.popBlockTypeStack();

        return node;
    }

    static getChaguaBody (context) {
        const chaguaBody = []; const kwNodeKesi = new KwNodeKesi();

        while (KwNodeChagua.isNextTokenKesi(context)) {
            chaguaBody.push(kwNodeKesi.getNode.call(context));
        }

        return chaguaBody;
    }

    static isNextTokenKesi (context) {
        return context.isNotEndOfFile() && context.lexer().peek().value === constants.KW.KESI;
    }

    static getZaidi (context) {
        const zaidi = [];

        if (context.isNextTokenKeyword(constants.KW.ZAIDI)) {
            context.skipKeyword(constants.KW.ZAIDI);
            context.skipPunctuation(constants.SYM.COLON);

            while (context.isNotEndOfBlock()) {
                zaidi.push(context.parseAst());
            }
        }

        return zaidi;
    }
}

class KwNodeKesi extends BaseNode {
    getNode () {
        const node = {};
        node.operation = constants.KW.KESI;
        this.skipKeyword(constants.KW.KESI);
        node.kesivalue = this.parseExpression();
        this.skipPunctuation(constants.SYM.COLON);
        node.kesibody = KwNodeKesi.getKesiBody(this);

        return node;
    }

    static getKesiBody (context) {
        const kesiBody = [];

        while (KwNodeKesi.canParseKesiStatements(context)) {
            kesiBody.push(context.parseAst());
        }

        return kesiBody;
    }

    static canParseKesiStatements (context) {
        return context.isNotEndOfFile() &&
                        context.lexer().peek().value !== constants.KW.KESI &&
                        context.lexer().peek().value !== constants.KW.ZAIDI &&
                        context.lexer().peek().value !== constants.SYM.R_PAREN;
    }
}

module.exports = new KwNodeChagua();
