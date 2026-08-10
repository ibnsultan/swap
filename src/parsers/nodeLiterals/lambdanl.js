const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

// njia (a, b) { ... } used in expression position - reuses njia's param/body
// grammar (see kwnodekazi.js) but produces a callable value instead of
// registering a named declaration. No auto-capture of enclosing variables:
// reaching an outer variable from inside a lambda still goes through the
// existing `ita` mechanism, and resolves dynamically against whichever scope
// is live on the call stack at call time - not lexically against the scope
// the lambda was defined in.
class LambdaNl extends BaseNode {
    getNode () {
        this.skipKeyword(constants.KW.NJIA);

        return {
            operation: constants.LAMBDA,
            paramTokens: this.parseDelimited(
                constants.SYM.L_BRACKET, constants.SYM.R_BRACKET, constants.SYM.COMMA,
                this.getTokenThatSatisfiesPredicate.bind(this), (token) => token.type === constants.VARIABLE
            ),
            body: this.parseBlock(constants.KW.NJIA),
        };
    }
}

module.exports = new LambdaNl();
