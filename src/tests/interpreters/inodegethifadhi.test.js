jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodeGetHifadhi = require("../../interpreters/inodegethifadhi.js");
const Environment = require("../../environment.js");
const iNodeTi = require("../../interpreters/inodehifadhi.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodehifadhi.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodegetJeki test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should get the value of a variable if it exists", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 15 / 5;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(iNodeGetHifadhi.interpreteNode.call(mainInterpreter, { name: "a", })).toBe(3);
    });

    test("it should throw an error when attempting to get the value of a non-existent variable within the current scope", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 15 / 5;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(() => iNodeGetHifadhi.interpreteNode.call(mainInterpreter, { name: "b", })).toThrow();
    });
});
