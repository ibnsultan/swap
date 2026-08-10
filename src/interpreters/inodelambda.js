const IBase = require("./ibase.js");

// A lambda literal evaluates to a plain closure-record value, storable via
// ordinary hifadhi assignment (environment().setHifadhi) like any other
// value - __swapKazi marks it as callable, checked by INodeCallKazi.
class INodeLambda extends IBase {
    interpreteNode (node) {
        return {
            __swapKazi: true,
            paramTokens: node.paramTokens,
            body: node.body,
        };
    }
}

module.exports = new INodeLambda();
