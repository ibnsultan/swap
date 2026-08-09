jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const KwNodeLete = require("../../../parsers/keywordnodes/kwnodelete.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");
const fs = require("fs");

describe("KwNodeLete test suite", () => {
    let parser;

    beforeEach(() => {
        fs.readFileSync.mockReturnValue(`${constants.KW.LETE} "./test.yl";`);
        parser = new Parser(new lexer(new InputStream()));
    });

    test("It should return valid lete node", () => {
        const expectedNode = {
            operation: constants.KW.LETE,
            path: {
                left: null,
                operation: null,
                right: null,
                value: "./test.yl",
            },
        };

        expect(KwNodeLete.getNode.call(parser))
            .toEqual(expectedNode);
    });

    test("It should fail when lete is given invalid parameter", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.LETE} "./test.yal";
        `;
        expect(() => KwNodeLete.getNode.call(parser)).toThrow();
    });
});
