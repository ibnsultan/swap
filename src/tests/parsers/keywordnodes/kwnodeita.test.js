jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeIta = require("../../../parsers/keywordnodes/kwnodeita.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeIta test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("It should return a valid ita node found within a kazi block", () => {
        parser.lexer().inputStream.code = `${constants.KW.ITA} \`counter, name\`;`;

        const expectedNode = {
            operation: constants.KW.ITA,
            varNames: ["counter", "name", ],
        };
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        expect(kwNodeIta.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should fail to return a valid ita node found outside kazi block", () => {
        parser.lexer().inputStream.code = `${constants.KW.ITA} \`counter\`;`;
        parser.pushToBlockTypeStack(constants.PROGRAM);

        expect(() => kwNodeIta.getNode.call(parser)).toThrow();
    });

    test("It should fail to return a valid ita node when ita is not used with a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.ITA} \`"something"\`;`;
        parser.pushToBlockTypeStack(constants.PROGRAM);

        expect(() => kwNodeIta.getNode.call(parser)).toThrow();
    });
});
