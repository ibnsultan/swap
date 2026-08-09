const IBase = require("./ibase.js");

class INodeChagua extends IBase {
    interpreteNode (node) {
        const chaguavalue = this.evaluateNode(node.chaguavalue);

        for (let kesiIndex = 0; kesiIndex < node.chaguabody.length; kesiIndex++) {
            if (INodeChagua.isKesiValueMatchChaguaValue(this, node.chaguabody[kesiIndex].kesivalue, chaguavalue)) {
                return INodeChagua.runMatchedBody(this, node.chaguabody[kesiIndex].kesibody);
            }

            if (INodeChagua.canRunZaidi(kesiIndex, node)) {
                return INodeChagua.runMatchedBody(this, node.zaidi);
            }
        }
    }

    static isKesiValueMatchChaguaValue (context, kesivalueNode, chaguavalue) {
        return context.evaluateNode(kesivalueNode) === chaguavalue;
    }

    static runMatchedBody (context, body) {
        for (let i = 0; i < body.length; i++) {
            const returnedValue = context.evaluateNode(body[i]);
            if (returnedValue !== undefined) return returnedValue; // it's a kazi rejesha value or vunja statement
        }
    }

    static canRunZaidi (kesiIndex, node) {
        return (kesiIndex === node.chaguabody.length - 1) && (node.zaidi !== undefined);
    }
}

module.exports = new INodeChagua();
