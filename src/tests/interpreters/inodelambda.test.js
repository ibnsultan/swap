jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeLambda = require("../../interpreters/inodelambda.js");
const lambdaNl = require("../../parsers/nodeLiterals/lambdanl.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeLambda test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should interprete a lambda literal into a callable closure-record value", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} (a, b) { ${constants.KW.REJESHA} a + b; }`;
        const node = lambdaNl.getNode.call(parser);

        const value = iNodeLambda.interpreteNode.call(mainInterpreter, node);
        expect(value.__swapKazi).toBe(true);
        expect(value.paramTokens).toEqual(node.paramTokens);
        expect(value.body).toEqual(node.body);
    });
});
