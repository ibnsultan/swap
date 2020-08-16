const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeSope extends BaseNode {
    getNode () {
        this.skipKeyword(constants.KW.ANDIKA);
        const node = {};
        node.operation = constants.KW.ANDIKA;
        node.body = this.parseExpression();
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeSope();
