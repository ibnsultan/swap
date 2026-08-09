const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeIta extends IBase {
    interpreteNode (node) {
        let ita = this.environment().getHifadhi(this.getCurrentScope(), constants.KW.ITA);

        if (!ita) ita = node.varNames;
        else ita.push(...node.varNames);

        this.environment().setHifadhi(this.getCurrentScope(), constants.KW.ITA, ita);
    }
}

module.exports = new INodeIta();
