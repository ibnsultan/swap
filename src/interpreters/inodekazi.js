const IBase = require("./ibase.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeKazi extends IBase {
    interpreteNode (node) {
        if (this.environment().getKazi(this.getCurrentScope(), node.name) !== undefined) { this.throwError(feedbackMessages.kaziAlreadyExist(node.name, this.getCurrentScope())); }

        this.environment().setKazi(this.getCurrentScope(), node.name, node);
    }
}

module.exports = new INodeKazi();
