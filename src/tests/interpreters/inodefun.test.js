jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeFun test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete fun node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
                ${constants.KW.ANDIKA} i;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(10);
    });

    test("it should interprete fun node while using helper function to get length of the array", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} num = [1,2,3,4,5,6,7,8,9,10];

            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 0; i < ka(num); ${constants.KW.HIFADHI} i = i + 1) {
                ${constants.KW.ANDIKA} num[i];
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(10);
    });

    test("it should interprete nested fun node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 1; i < 3; ${constants.KW.HIFADHI} i = i + 1) {
                ${constants.KW.ANDIKA} i;
                ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} j = 0; j < 2; ${constants.KW.HIFADHI} j = i + j) {
                    ${constants.KW.ANDIKA} j;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(5);
    });

    test("it should interprete fun node with kuro keyword", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
                ${constants.KW.ANDIKA} i;
                ${constants.KW.KAMA} (i == 5) {
                    ${constants.KW.VUNJA};
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(6);
    });
});
