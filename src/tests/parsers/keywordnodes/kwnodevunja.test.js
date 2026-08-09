jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeVunja = require("../../../parsers/keywordnodes/kwnodevunja.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");
const fs = require("fs");

describe("KwNodeVunja test suite", () => {
    let parser;

    beforeEach(() => {
        fs.readFileSync.mockReturnValue(`${constants.KW.VUNJA};`);
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should return a kúrò node ast when vunja node is expected because it is within a loop", () => {
        const expectedNode = { operation: constants.KW.VUNJA, };
        parser.pushToBlockTypeStack(constants.KW.WAKATI);

        expect(kwNodeVunja.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should skip the semicolon after an expected keyword kúrò", () => {
        parser.pushToBlockTypeStack(constants.KW.WAKATI);
        kwNodeVunja.getNode.call(parser);

        expect(parser.lexer().peek()).toBe(null);
    });

    test("It should fail to return a vunja node because the vunja keyword is not within a loop", () => {
        expect(() => kwNodeVunja.getNode.call(parser)).toThrow();
    });
});
