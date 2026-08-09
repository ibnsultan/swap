const IBase = require("./ibase.js");
const getFormattedReturnValue = require("./helpers/helper_kazi_adapter");
const feedbackMessages = require("../feedbackMessages.js");
const constants = require("../constants.js");

class INodeCallKazi extends IBase {
    interpreteNode (node) {
        const kaziNode = INodeCallKazi.getKaziNode(this, node.name);

        if (kaziNode == null) {
            if (this.environment().isExistHelperKazi(node.name)) {
                return getFormattedReturnValue(this.environment().runHelperKazi(node.name, INodeCallKazi.getKaziHelperParams(this, node.paramValues)));
            }

            this.throwError(feedbackMessages.varDoesNotExist(constants.KW.NJIA, node.name));
        }

        return INodeCallKazi.startNewScope(this, kaziNode, INodeCallKazi.getResolvedParameterValues(this, node.paramValues));
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

    static startNewScope (context, kaziNode, paramValues) {
        context.pushToScopeStack(kaziNode.name);
        INodeCallKazi.setKaziNodeParam(context, kaziNode.paramTokens, paramValues);
        const returnedValue = INodeCallKazi.runKaziNodeBody(context, kaziNode.body);
        context.popFromScopeStack();

        return returnedValue;
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
