const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeYi extends BaseNode {
    constructor () {
        super();
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency bracketExpressionNl"));
        }
    }

    getNode () {
        const node = {};
        node.operation = constants.KW.BAD;
        this.pushToBlockTypeStack(constants.KW.BAD);
        this.skipKeyword(constants.KW.BAD);
        node.yivalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);
        node.yibody = KwNodeYi.getYiBody(this);
        node.padasi = KwNodeYi.getPadasi(this);
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.popBlockTypeStack();

        return node;
    }

    static getYiBody (context) {
        const yiBody = []; const kwNodeIRU = new KwNodeIRU();

        while (KwNodeYi.isNextTokenIru(context)) {
            yiBody.push(kwNodeIRU.getNode.call(context));
        }

        return yiBody;
    }

    static isNextTokenIru (context) {
        return context.isNotEndOfFile() && context.lexer().peek().value === constants.KW.KESI;
    }

    static getPadasi (context) {
        const padasi = [];

        if (context.isNextTokenKeyword(constants.KW.PADASI)) {
            context.skipKeyword(constants.KW.PADASI);
            context.skipPunctuation(constants.SYM.COLON);

            while (context.isNotEndOfBlock()) {
                padasi.push(context.parseAst());
            }
        }

        return padasi;
    }
}

class KwNodeIRU extends BaseNode {
    getNode () {
        const node = {};
        node.operation = constants.KW.KESI;
        this.skipKeyword(constants.KW.KESI);
        node.IRUvalue = this.parseExpression();
        this.skipPunctuation(constants.SYM.COLON);
        node.IRUbody = KwNodeIRU.getIRUBody(this);

        return node;
    }

    static getIRUBody (context) {
        const IRUBody = [];

        while (KwNodeIRU.canParseIRUStatements(context)) {
            IRUBody.push(context.parseAst());
        }

        return IRUBody;
    }

    static canParseIRUStatements (context) {
        return context.isNotEndOfFile() &&
                        context.lexer().peek().value !== constants.KW.KESI &&
                        context.lexer().peek().value !== constants.KW.PADASI &&
                        context.lexer().peek().value !== constants.SYM.R_PAREN;
    }
}

module.exports = new KwNodeYi();
