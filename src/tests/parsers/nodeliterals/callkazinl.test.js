jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const callKaziNl = require("../../../parsers/nodeLiterals/callKaziNl.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("CallKaziLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should parse valid callKazi syntax with parameters", () => {
        parser.lexer().inputStream.code = "mtu(1,\"sawa\");";

        const expectedNode = {
            paramValues: [
                { left: null, operation: null, right: null, value: 1, },
                { left: null, operation: null, right: null, value: "sawa", },
            ],
            name: "mtu",
            operation: constants.CALL_KAZI,
        };

        expect(callKaziNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should parse valid callKazi syntax without parameters", () => {
        parser.lexer().inputStream.code = "mtu();";

        const expectedNode = {
            paramValues: [],
            name: "mtu",
            operation: constants.CALL_KAZI,
        };

        expect(callKaziNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should fail to parse invalid callKazi syntax", () => {
        parser.lexer().inputStream.code = "mtu(";
        expect(() => callKaziNl.getNode.call(parser)).toThrow();
    });
});
