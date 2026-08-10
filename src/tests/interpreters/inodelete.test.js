jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");
const fs = require("fs");

describe("INodeLete test suite", () => {
    beforeEach(() => {
        global.console.log = jest.fn();
    });

    test("it should import valid file path correctly", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.LETE} "/sample/sample.sw";
                ${constants.KW.HIFADHI} b = hesabu(14, 2);
                ${constants.KW.ANDIKA} b;
            `).mockReturnValueOnce(`${constants.KW.NJIA} hesabu(a, b) {
                ${constants.KW.REJESHA} a * b;
            }`);

        const parser = new Parser(new Lexer(new InputStream()));
        const mainInterpreter = new MainInterpreter(new Environment(), parser);
        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(28);
    });

    test("it should fail to import invalid file path", () => {
        fs.readFileSync.mockReturnValueOnce(`${constants.KW.LETE} "sample/sample.yl";   
                ${constants.KW.HIFADHI} b = hesabu(14, 2);
                ${constants.KW.ANDIKA} b;         
            `);

        const parser = new Parser(new Lexer(new InputStream()));
        const mainInterpreter = new MainInterpreter(new Environment(), parser);

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});
