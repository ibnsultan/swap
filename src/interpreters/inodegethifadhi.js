const IBase = require("./ibase.js");
const ItaHelper = require("./helpers/ita_helper.js");
const feedbackMessages = require("../feedbackMessages.js");
const constants = require("../constants.js");

class INodeGetHifadhi extends IBase {
    interpreteNode (node) {
        for (let index = INodeGetHifadhi.getTopIndex(this, node.name); index >= 0; index--) {
            if (this.environment().getHifadhi(this.scopeStack()[index], node.name) !== undefined) {
                return this.environment().getHifadhi(this.scopeStack()[index], node.name);
            }
        }

        this.throwError(feedbackMessages.varDoesNotExist(constants.VARIABLE, node.name));
    }

    static getTopIndex (context, hifadhiName) {
        if (ItaHelper.isItaVariable(context, hifadhiName)) {
            return context.scopeStack().length - 2;
        }

        return context.scopeStack().length - 1;
    }
}

module.exports = new INodeGetHifadhi();
