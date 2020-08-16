jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeNigbati test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete the nigbati keyword with kuro keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 0;
            ${constants.KW.WAKATI} (a < 3) {
                ${constants.KW.ANDIKA} a;
                ${constants.KW.HIFADHI} a = a + 1;
                ${constants.KW.KAMA} (a == 2) {
                    ${constants.KW.VUNJA};
                }
                ${constants.KW.WAKATI} (a < 2) {
                    ${constants.KW.ANDIKA} a;
                    ${constants.KW.VUNJA};
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(3);
    });

    test("it should interprete the nigbati keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 0;
            ${constants.KW.WAKATI} (a < 3) {
                ${constants.KW.ANDIKA} a;
                ${constants.KW.HIFADHI} a = a + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(3);
    });

    test("it should interprete nested nigbati keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 0;
            ${constants.KW.WAKATI} (a < 3) {
                ${constants.KW.ANDIKA} a;
                ${constants.KW.HIFADHI} a = a + 1;
                ${constants.KW.HIFADHI} b = a + 1;
                ${constants.KW.WAKATI} (b < 3) {
                    ${constants.KW.ANDIKA} "anu";
                    ${constants.KW.HIFADHI} b = b + 1;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(4);
    });
});
