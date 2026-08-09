const IBase = require("./ibase.js");
const Parser = require("../parsers/parser.js");
const Lexer = require("../lexer.js");
const InputStream = require("../inputstream.js");

class INodeLete extends IBase {
    interpreteNode (node) {
        const fileName = this.evaluateNode(node.path);
        const parser = new Parser(new Lexer(new InputStream(fileName)));
        this.interpreteImportedProgram(parser);
    }
}

module.exports = new INodeLete();
