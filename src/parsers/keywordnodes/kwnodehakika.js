const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const kwNodeHifadhi = require("./kwnodehifadhi.js");
const feedbackMessages = require("../../feedbackMessages.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeHakika extends BaseNode {
    constructor () {
        super();
        if (this.isDependenciesInValid()) {
            throw new Error(feedbackMessages.baseNodeType("Dependencies"));
        }
    }

    isDependenciesInValid () {
        return !(kwNodeHifadhi instanceof BaseNode) && !(bracketExpressionNl instanceof BaseNode);
    }

    getNode () {
        this.skipKeyword(constants.KW.HAKIKA);

        this.skipPunctuation(constants.SYM.L_BRACKET);
        const node = {};
        node.operation = constants.KW.HAKIKA;
        node.init = kwNodeHifadhi.getNode.call(this);
        node.condition = bracketExpressionNl.getNode.call(this, { isArithmeticExpression: false, isBracketExpected: false, });

        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
        node.increment = kwNodeHifadhi.getNode.call(this, { shouldExpectTerminator: false, });

        if (KwNodeHakika.isInValidHakikaIncrementStatement(node)) {
            this.throwError(feedbackMessages.hakikaIncrementAndDecrementMsg());
        }
        this.skipPunctuation(constants.SYM.R_BRACKET);

        node.body = this.parseBlock(constants.KW.HAKIKA);

        return node;
    }

    static isInValidHakikaIncrementStatement (hakikaNode) {
        const incrementNode = hakikaNode.increment.right;

        if ([ constants.SYM.PLUS, constants.SYM.MINUS, ].includes(incrementNode.operation)) {
            // e.g hakika (tí i =0; i < 10; tí i = i + 1;)
            // make sure there is variable 'i' in atleast one child of the incrementNode
            // i.e hifadhi i = i + 1 or hifadhi i = 1 + i or hifadhi i = i + i
            if ([ incrementNode.left.name, incrementNode.right.name, ].includes(hakikaNode.init.left)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = new KwNodeHakika();
