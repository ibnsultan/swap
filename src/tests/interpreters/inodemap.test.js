jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeMap = require("../../interpreters/inodemap.js");
const mapNl = require("../../parsers/nodeLiterals/mapnl.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeMap test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should interprete a ramani literal into a plain object", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}(jina: "Juma", umri: 25)`;
        const node = mapNl.getNode.call(parser);

        expect(iNodeMap.interpreteNode.call(mainInterpreter, node)).toEqual({ jina: "Juma", umri: 25, });
    });

    test("it should interprete an empty ramani literal into an empty object", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}()`;
        const node = mapNl.getNode.call(parser);

        expect(iNodeMap.interpreteNode.call(mainInterpreter, node)).toEqual({});
    });

    test("it should evaluate nested expressions given as values", () => {
        parser.lexer().inputStream.code = `${constants.KW.RAMANI}(jumla: 2 + 3)`;
        const node = mapNl.getNode.call(parser);

        expect(iNodeMap.interpreteNode.call(mainInterpreter, node)).toEqual({ jumla: 5, });
    });
});
