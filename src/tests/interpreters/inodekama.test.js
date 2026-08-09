jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeSe test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete the se keyword and run the then block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 7;
            ${constants.KW.KAMA} (a > 6) {
                ${constants.KW.HIFADHI} a = 6 * 3;
                ${constants.KW.ANDIKA} a;
            } ${constants.KW.BASI} {
                ${constants.KW.HIFADHI} a = 6 * 2;
                ${constants.KW.ANDIKA} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
    });

    test("it should run the then block when the condition returns a truthy value that is not the keyword OOTO", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 7;
            ${constants.KW.KAMA} (a) {
                ${constants.KW.ANDIKA} a;
            } 
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(7);
    });

    test("it should interprete the se keyword and run the else block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 6;
            ${constants.KW.KAMA} (a > 6) {
                ${constants.KW.HIFADHI} a = 6 * 3;
                ${constants.KW.ANDIKA} a;
            } ${constants.KW.BASI} {
                ${constants.KW.HIFADHI} a = 6 * 2;
                ${constants.KW.ANDIKA} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(12);
    });

    test("it should interprete nested se keyword and run the then block ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 7;
            ${constants.KW.KAMA} (a > 6) {
                ${constants.KW.HIFADHI} a = 6 * 3;
                ${constants.KW.ANDIKA} a;

                ${constants.KW.KAMA} (a > 14) {
                    ${constants.KW.HIFADHI} a = 6 * 5;
                    ${constants.KW.ANDIKA} a;
                }
            } ${constants.KW.BASI} {
                ${constants.KW.HIFADHI} a = 6 * 2;
                ${constants.KW.ANDIKA} a;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
        expect(global.console.log).toHaveBeenCalledWith(30);
    });

    test("it should interprete tabi se (else if) statments ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 5;

            ${constants.KW.KAMA} (a < 5) {
                ${constants.KW.ANDIKA} a + 4;
            } 
            ${constants.KW.BASI} ${constants.KW.KAMA} (a > 7) {
                ${constants.KW.ANDIKA} a + 3;
            }
            ${constants.KW.BASI} ${constants.KW.KAMA} (a == 5) {
                ${constants.KW.ANDIKA} a + 2;
            }
            ${constants.KW.BASI} {
                ${constants.KW.ANDIKA} a + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(7);
    });

    test("it should interprete tabi se (else if) statments and return value from within tabi se ", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 5;

            ${constants.KW.KAZI} apere(nonba) {
                ${constants.KW.KAMA} (nonba < 4) {
                    ${constants.KW.ANDIKA} nonba + 4;
                } 
                ${constants.KW.BASI} ${constants.KW.KAMA} (nonba > 4) {
                    ${constants.KW.PADA} nonba + 3;
                }
            }

            ${constants.KW.ANDIKA} apere(a);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(8);
    });
});
