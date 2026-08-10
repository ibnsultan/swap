const constants = require("../../constants.js");
const leafNl = require("./leafnl.js");
const mapNl = require("./mapnl.js");
const lambdaNl = require("./lambdanl.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KeywordNl extends BaseNode {
    constructor () {
        super();
        if (!(leafNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency leafnl"));
        }
        if (!(mapNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency mapNl"));
        }
        if (!(lambdaNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency lambdaNl"));
        }
    }

    getNode () {
        if (KeywordNl.isBooleanKeywordNl(this)) {
            return leafNl.getNode.call(this);
        }

        if (KeywordNl.isMapKeywordNl(this)) {
            return mapNl.getNode.call(this);
        }

        if (KeywordNl.isLambdaKeywordNl(this)) {
            return lambdaNl.getNode.call(this);
        }

        this.throwError(feedbackMessages.expectBooleanMsg());
    }

    static isBooleanKeywordNl (context) {
        return [ constants.KW.KWELI, constants.KW.SIKWELI, ].includes(context.lexer().peek().value);
    }

    static isMapKeywordNl (context) {
        return context.lexer().peek().value === constants.KW.RAMANI;
    }

    static isLambdaKeywordNl (context) {
        return context.lexer().peek().value === constants.KW.NJIA;
    }
}

module.exports = new KeywordNl();
