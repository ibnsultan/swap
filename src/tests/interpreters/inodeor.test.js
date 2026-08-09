jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeOr = require("../../interpreters/inodeor.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodehifadhi.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeOr test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return kweli for an or true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 5 > 4 || 3 < 2;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeOr.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.KWELI);
    });

    test("it should return sikweli for an or false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 5 > 6 || 5 > 7;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeOr.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.SIKWELI);
    });

    test("it should get the value of a variable and test it in an condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 6;
            ${constants.KW.HIFADHI} b = a > 6 || 5 > 7;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.SIKWELI);
    });
});
