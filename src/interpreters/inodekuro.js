const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeKuro extends IBase {
    interpreteNode (node) {
        return constants.KW.VUNJA;
    }
}

module.exports = new INodeKuro();
