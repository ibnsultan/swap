const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const leafnl = require("../nodeLiterals/leafnl.js");
const path = require("path");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeGbeWole extends BaseNode {
    getNode () {
        this.skipKeyword(constants.KW.LETE);
        const node = {};
        node.operation = constants.KW.LETE;

        if (this.lexer().peek().type === constants.STRING) {
            node.path = leafnl.getNode.call(this);
            if (path.extname(node.path.value) !== constants.SWAP_EXT) { this.throwError(feedbackMessages.invalidFileMsg()); }

            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            return node;
        }

        this.lexer().throwError(feedbackMessages.expectStringMsg(constants.KW.LETE));
    }
}

module.exports = new KwNodeGbeWole();
