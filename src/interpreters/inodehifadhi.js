const IBase = require("./ibase.js");
const constants = require("../constants.js");
const ItaHelper = require("./helpers/ita_helper.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeHifadhi extends IBase {
    interpreteNode (node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeHifadhi.setArrayElement(this, node);
            return;
        }

        if (node.left.operation === constants.MAP_ELEM) {
            INodeHifadhi.setMapElement(this, node);
            return;
        }

        if (ItaHelper.isItaVariable(this, node.left)) {
            INodeHifadhi.setItaVariable(this, node);
            return;
        }

        this.environment().setHifadhi(this.getCurrentScope(), node.left, INodeHifadhi.getValue(this, node.right));
    }

    static setItaVariable (context, node) {
        const topIndex = context.scopeStack().length - 2;

        for (let index = topIndex; index >= 0; index--) {
            if (context.environment().getHifadhi(context.scopeStack()[index], node.left) !== undefined) {
                return context.environment().setHifadhi(context.scopeStack()[index], node.left, INodeHifadhi.getValue(context, node.right));
            }
        }
    }

    static setArrayElement (context, node) { // this also caters for setting multi-dimensional array element
        let arrayLiteral = INodeHifadhi.getArrayLiteral(context, node);

        for (let i = 0; i < node.left.indexNodes.length; i++) {
            const arrayIndex = context.evaluateNode(node.left.indexNodes[i]);

            if (arrayIndex === "" && i === node.left.indexNodes.length - 1) {
                // push right node to the last location in the array when index is empty
                arrayLiteral.push(context.evaluateNode(node.right));
                return;
            }

            if (typeof arrayIndex === "number") {
                if (!(Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    context.throwError(feedbackMessages.arrayIndexDoesNotExistMsg(node.left.name));
                }

                if ((Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    arrayLiteral = arrayLiteral[arrayIndex];
                }

                if (i === node.left.indexNodes.length - 1) {
                    arrayLiteral[arrayIndex] = context.evaluateNode(node.right);
                }
            } else {
                context.throwError(feedbackMessages.invalidArrayIndexTypeMsg(node.name));
            }
        };
    }

    static getArrayLiteral (context, node) {
        const hifadhiNode = { name: node.left.name, operation: constants.GET_HIFADHI, };
        return context.evaluateNode(hifadhiNode);
    }

    static setMapElement (context, node) { // always a plain upsert - no array-style empty-key append case
        const mapLiteral = INodeHifadhi.getMapLiteral(context, node);
        if (typeof mapLiteral !== "object" || mapLiteral === null || Array.isArray(mapLiteral)) {
            context.throwError(feedbackMessages.invalidMapAccessMsg(node.left.name));
        }

        mapLiteral[node.left.key] = INodeHifadhi.getValue(context, node.right);
    }

    static getMapLiteral (context, node) {
        const hifadhiNode = { name: node.left.name, operation: constants.GET_HIFADHI, };
        return context.evaluateNode(hifadhiNode);
    }

    static getValue (context, node) {
        const value = context.evaluateNode(node);
        if (value === undefined) context.throwError(feedbackMessages.undefinedValueMsg(node.left));
        return value;
    }
}

module.exports = new INodeHifadhi();
