jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const mapNl = require("../../../parsers/nodeLiterals/mapnl.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("MapNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("It should parse a ramani literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}(jina: "Juma", umri: 25)`;

        const expectedNode = {
            operation: constants.MAP,
            body: [
                { key: "jina", valueNode: { left: null, operation: null, right: null, value: "Juma", }, },
                { key: "umri", valueNode: { left: null, operation: null, right: null, value: 25, }, },
            ],
        };

        expect(mapNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse an empty ramani literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}()`;

        expect(mapNl.getNode.call(parser)).toEqual({ operation: constants.MAP, body: [], });
    });

    test("It should parse a ramani property access", () => {
        parser.lexer().inputStream.code = "mtu.jina";
        const mapNameToken = { value: parser.parseVarname(), };

        const expectedNode = {
            operation: constants.MAP_ELEM,
            name: "mtu",
            key: "jina",
        };

        expect(mapNl.getNode.call(parser, mapNameToken)).toEqual(expectedNode);
    });

    test("It should throw an error while parsing an invalid ramani literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}(jina "Juma")`;

        expect(() => mapNl.getNode.call(parser)).toThrow();
    });

    test("It should throw an error while parsing an invalid ramani property access", () => {
        parser.lexer().inputStream.code = "mtu.25";
        const mapNameToken = { value: parser.parseVarname(), };

        expect(() => mapNl.getNode.call(parser, mapNameToken)).toThrow();
    });
});
