const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

// jaribu { ... } kamata (varname) { ... }  -- try/catch, modeled on kwnodekama.js
class KwNodeJaribu extends BaseNode {
    getNode () {
        this.skipKeyword(constants.KW.JARIBU);

        const node = {};
        node.operation = constants.KW.JARIBU;
        node.tryBlock = this.parseBlock(constants.KW.JARIBU);

        this.skipKeyword(constants.KW.KAMATA);
        this.skipPunctuation(constants.SYM.L_BRACKET);
        node.catchVarName = this.parseVarname();
        this.skipPunctuation(constants.SYM.R_BRACKET);
        node.catchBlock = this.parseBlock(constants.KW.KAMATA);

        return node;
    }
}

module.exports = new KwNodeJaribu();
