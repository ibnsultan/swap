const IBase = require("./ibase.js");
const getFormattedReturnValue = require("./helpers/helper_kazi_adapter");
const feedbackMessages = require("../feedbackMessages.js");
const constants = require("../constants.js");

// Unique per-call scope names for lambda calls (see getNextAnonymousScopeName)
// - never reused within a process run, so two lambda calls active at once on
// the stack (e.g. a lambda calling itself, or one lambda calling another)
// never clobber each other's local variable bindings the way two overlapping
// calls to the SAME named njia can (Environment#vars is keyed by scope name,
// not by call/stack instance).
let anonymousScopeCounter = 0;

class INodeCallKazi extends IBase {
    interpreteNode (node) {
        const kaziNode = INodeCallKazi.getKaziNode(this, node.name);

        if (kaziNode != null) {
            return INodeCallKazi.startNewScope(this, kaziNode, INodeCallKazi.getResolvedParameterValues(this, node.paramValues));
        }

        const kaziValue = INodeCallKazi.getKaziValue(this, node.name);
        if (kaziValue !== undefined) {
            if (!INodeCallKazi.isCallable(kaziValue)) this.throwError(feedbackMessages.notCallableMsg(node.name));

            return INodeCallKazi.startNewScope(
                this, kaziValue, INodeCallKazi.getResolvedParameterValues(this, node.paramValues),
                INodeCallKazi.getNextAnonymousScopeName()
            );
        }

        if (this.environment().isExistHelperKazi(node.name)) {
            const params = INodeCallKazi.getKaziHelperParams(this, node.paramValues);
            return getFormattedReturnValue(this.environment().runHelperKazi(node.name, params, INodeCallKazi.getCallSwapFunction(this)));
        }

        this.throwError(feedbackMessages.varDoesNotExist(constants.KW.NJIA, node.name));
    }

    // Lets a closure-taking helper (e.g. ramanisha/chuja/punguza/kilamoja in
    // array_helpers) invoke a Swap closure value it received as one of its
    // args, without needing to know anything about the interpreter itself.
    // Every other helper simply ignores this second callback argument.
    static getCallSwapFunction (context) {
        return (kaziValue, argValues) => {
            if (!INodeCallKazi.isCallable(kaziValue)) context.throwError(feedbackMessages.notCallableMsg("kazi"));

            return INodeCallKazi.startNewScope(context, kaziValue, argValues, INodeCallKazi.getNextAnonymousScopeName());
        };
    }

    // Looks up node.name as a plain hifadhi value (e.g. a variable holding a
    // lambda) without throwing when it isn't found - reuses GET_HIFADHI's
    // own (ita-aware) scope-stack walk rather than duplicating it.
    static getKaziValue (context, name) {
        try {
            return context.evaluateNode({ operation: constants.GET_HIFADHI, name, });
        } catch (e) {
            return undefined;
        }
    }

    static isCallable (value) {
        return value !== null && typeof value === "object" && value.__swapKazi === true;
    }

    static getNextAnonymousScopeName () {
        anonymousScopeCounter += 1;
        return `<njia@${anonymousScopeCounter}>`;
    }

    static getKaziNode (context, kaziName) {
        for (let index = context.scopeStack().length - 1; index >= 0; index--) {
            if (context.environment().getKazi(context.scopeStack()[index], kaziName) !== undefined) {
                return context.environment().getKazi(context.scopeStack()[index], kaziName);
            }
        }
        return null;
    }

    static getKaziHelperParams (context, paramNodeList) {
        const params = [];
        paramNodeList.forEach(paramNode => {
            params.push(context.evaluateNode(paramNode));
        });
        return params;
    }

    static getResolvedParameterValues (context, paramValueNodes) {
        const paramValues = [];
        paramValueNodes.forEach(paramValueNode => {
            paramValues.push(context.evaluateNode(paramValueNode));
        });

        return paramValues;
    }

    static startNewScope (context, kaziNode, paramValues, scopeName) {
        context.pushToScopeStack(scopeName || kaziNode.name);
        try {
            // must pop even if the body throws (e.g. an error caught by an
            // enclosing jaribu/kamata), otherwise the scope stack is left
            // corrupted for everything that runs after the catch block
            INodeCallKazi.setKaziNodeParam(context, kaziNode.paramTokens, paramValues);
            return INodeCallKazi.runKaziNodeBody(context, kaziNode.body);
        } finally {
            context.popFromScopeStack();
        }
    }

    static setKaziNodeParam (context, kaziNodeParamTokens, kaziParamValues) {
        for (let i = 0; i < kaziNodeParamTokens.length; i++) {
            context.environment().setHifadhi(context.getCurrentScope(), kaziNodeParamTokens[i].value, kaziParamValues[i]);
        }
    }

    static runKaziNodeBody (context, kaziNodeBody) {
        for (let i = 0; i < kaziNodeBody.length; i++) {
            const returnedValue = context.evaluateNode(kaziNodeBody[i]);
            if (returnedValue !== undefined) return returnedValue;
        }
    }
}

module.exports = new INodeCallKazi();
