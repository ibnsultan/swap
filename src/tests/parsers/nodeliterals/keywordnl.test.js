jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const keywordNl = require("../../../parsers/nodeLiterals/keywordnl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KeywordNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse keyword literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.KWELI}`;

        const expectedNode = {
            left: null,
            operation: null,
            right: null,
            value: constants.KW.KWELI,
        };

        expect(keywordNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid keyword literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAZI}`;

        expect(() => keywordNl.getNode.call(parser)).toThrow();
    });
});
