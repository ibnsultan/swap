jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeFun test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete a valid yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} oruko = "femi";

        ${constants.KW.BAD} (oruko) {
            ${constants.KW.KESI} "anu":
                ${constants.KW.ANDIKA} "it is anu";
            ${constants.KW.KESI} "femi":
                ${constants.KW.ANDIKA} "it is femi";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is femi");
    });

    test("it should interprete a nested yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} oruko = 1;

        ${constants.KW.BAD} (oruko) {
            ${constants.KW.KESI} 1:
                ${constants.KW.BAD} (1+5) {
                    ${constants.KW.KESI} 3+3:
                        ${constants.KW.ANDIKA} "it is anu";
                    ${constants.KW.KESI} 3:
                        ${constants.KW.ANDIKA} "it is three";
                }            
            ${constants.KW.KESI} 2:
                ${constants.KW.ANDIKA} "it is femi";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is anu");
    });

    test("it should interprete yi node with padasi", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} oruko = "funmi";

        ${constants.KW.BAD} (oruko) {
            ${constants.KW.KESI} "anu":
                ${constants.KW.ANDIKA} "it is anu";
            ${constants.KW.KESI} "femi":
                ${constants.KW.ANDIKA} "it is femi";
            ${constants.KW.PADASI}: 
                ${constants.KW.ANDIKA} "i don't know";
                ${constants.KW.ANDIKA} "Yoruba - mi o mo";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("i don't know");
        expect(global.console.log).toHaveBeenCalledWith("Yoruba - mi o mo");
    });

    test("it should interprete a valid yi node and return a value from within it", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} oruko = "femi";

            ${constants.KW.KAZI} apere(oruko) {

                ${constants.KW.BAD} (oruko) {
                    ${constants.KW.KESI} "anu":
                        ${constants.KW.PADA} "it is anu";
                    ${constants.KW.KESI} "femi":
                        ${constants.KW.PADA} "it is femi";
                }
            }
            
            ${constants.KW.ANDIKA} apere(oruko);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is femi");
    });
});
