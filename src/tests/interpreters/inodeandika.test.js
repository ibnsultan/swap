jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeSope = require("../../interpreters/inodesope.js");
const kwNodeSope = require("../../parsers/keywordnodes/kwnodesope.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeSope test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        global.console.log = jest.fn();
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should print a string to the console", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} "femi";`;
        const node = kwNodeSope.getNode.call(parser);
        iNodeSope.interpreteNode.call(mainInterpreter, node);
        expect(global.console.log).toHaveBeenCalledWith("femi");
    });

    test("it should print a number to the console", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} 3;`;
        const node = kwNodeSope.getNode.call(parser);
        iNodeSope.interpreteNode.call(mainInterpreter, node);
        expect(global.console.log).toHaveBeenCalledWith(3);
    });

    test("it should print the value of variable to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 5;
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
    });

    test("it should print the value of an expression to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.ANDIKA} "a" + 5;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("a5");
    });

    test("it should print the value of variable to the console", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [1,5];
            ${constants.KW.ANDIKA} a[1];
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
    });
});
