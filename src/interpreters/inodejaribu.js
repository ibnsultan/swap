const IBase = require("./ibase.js");

// jaribu/kamata (try/catch) - uses real JS try/catch to catch the Error objects
// throwError() already produces throughout the interpreter, rather than inventing
// a new sentinel-propagation convention like vunja/rejesha use. A rejesha/vunja
// sentinel value bubbling up from inside either block still propagates normally,
// since it is a plain return value, not a thrown exception.
class INodeJaribu extends IBase {
    interpreteNode (node) {
        try {
            return INodeJaribu.runBody(this, node.tryBlock);
        } catch (err) {
            this.environment().setHifadhi(this.getCurrentScope(), node.catchVarName, err.message);
            return INodeJaribu.runBody(this, node.catchBlock);
        }
    }

    static runBody (context, body) {
        for (let i = 0; i < body.length; i++) {
            const returnedValue = context.evaluateNode(body[i]);
            if (returnedValue !== undefined) return returnedValue; // it's a kazi rejesha value or vunja statement
        }
    }
}

module.exports = new INodeJaribu();
