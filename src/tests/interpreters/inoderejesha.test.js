jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const iNodeRejesha = require("../../interpreters/inoderejesha.js");
const kwNodeRejesha = require("../../parsers/keywordnodes/kwnoderejesha.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeRejesha test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("rejesha should return a number value", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} 2;`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);
        const node = kwNodeRejesha.getNode.call(parser);

        expect(iNodeRejesha.interpreteNode.call(new MainInterpreter(), node)).toBe(2);
    });

    test("rejesha should return a string value", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} "sawa";`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);
        const node = kwNodeRejesha.getNode.call(parser);

        expect(iNodeRejesha.interpreteNode.call(new MainInterpreter(), node)).toBe("sawa");
    });

    test("rejesha should return a floating point value", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} 3.142;`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);
        const node = kwNodeRejesha.getNode.call(parser);

        expect(iNodeRejesha.interpreteNode.call(new MainInterpreter(), node)).toBe(3.142);
    });

    test("rejesha should return an array literal value", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} [1,2];`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);
        const node = kwNodeRejesha.getNode.call(parser);

        expect(iNodeRejesha.interpreteNode.call(new MainInterpreter(), node)).toEqual([1, 2, ]);
    });
});
