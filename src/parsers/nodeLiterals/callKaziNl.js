const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class CallKaziNl extends BaseNode {
    /*
     * Whenever kaziNameToken is provided, then the function call is being used in an expression
     * e.g hifadhi a = sum(1,2);
     * Whenever kaziNameToken is not provided, then the function call is not being used in an expression
     * e.g printName("juma");
    */

    getNode (kaziNameToken) {
        kaziNameToken = kaziNameToken || {};

        const node = {};
        node.operation = constants.CALL_KAZI;
        node.name = kaziNameToken.value || this.lexer().next().value;
        node.paramValues = this.parseDelimited(
            constants.SYM.L_BRACKET, constants.SYM.R_BRACKET, constants.SYM.COMMA,
            this.parseExpression.bind(this), null
        );

        if (kaziNameToken.value === undefined) this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new CallKaziNl();
