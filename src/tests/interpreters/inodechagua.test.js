jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeHakika test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete a valid yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} jina = "juma";

        ${constants.KW.CHAGUA} (jina) {
            ${constants.KW.KESI} "sawa":
                ${constants.KW.ANDIKA} "it is sawa";
            ${constants.KW.KESI} "juma":
                ${constants.KW.ANDIKA} "it is juma";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is juma");
    });

    test("it should interprete a nested yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} jina = 1;

        ${constants.KW.CHAGUA} (jina) {
            ${constants.KW.KESI} 1:
                ${constants.KW.CHAGUA} (1+5) {
                    ${constants.KW.KESI} 3+3:
                        ${constants.KW.ANDIKA} "it is sawa";
                    ${constants.KW.KESI} 3:
                        ${constants.KW.ANDIKA} "it is three";
                }            
            ${constants.KW.KESI} 2:
                ${constants.KW.ANDIKA} "it is juma";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is sawa");
    });

    test("it should interprete yi node with zaidi", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} jina = "fatuma";

        ${constants.KW.CHAGUA} (jina) {
            ${constants.KW.KESI} "sawa":
                ${constants.KW.ANDIKA} "it is sawa";
            ${constants.KW.KESI} "juma":
                ${constants.KW.ANDIKA} "it is juma";
            ${constants.KW.ZAIDI}: 
                ${constants.KW.ANDIKA} "i don't know";
                ${constants.KW.ANDIKA} "sijui kabisa";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("i don't know");
        expect(global.console.log).toHaveBeenCalledWith("sijui kabisa");
    });

    test("it should interprete a valid yi node and return a value from within it", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} jina = "juma";

            ${constants.KW.NJIA} mfano(jina) {

                ${constants.KW.CHAGUA} (jina) {
                    ${constants.KW.KESI} "sawa":
                        ${constants.KW.REJESHA} "it is sawa";
                    ${constants.KW.KESI} "juma":
                        ${constants.KW.REJESHA} "it is juma";
                }
            }
            
            ${constants.KW.ANDIKA} mfano(jina);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is juma");
    });
});
