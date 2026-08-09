jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeKazi test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("It should save a kazi node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} fname;
            }
        `;

        const expectedNode = {
            body: [{
                operation: constants.KW.ANDIKA,
                body: {
                    name: "fname",
                    operation: constants.GET_HIFADHI,
                },
            }, ],
            name: "wekaJina",
            operation: constants.KW.NJIA,
            paramTokens: [
                {
                    type: constants.VARIABLE,
                    value: "fname",
                },
            ],
        };

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getKazi(mainInterpreter.getCurrentScope(), "wekaJina")).toEqual(expectedNode);
    });

    test("It should fail to save kazi node if there exist another kazi node with the same name in the same scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname, lname) {
                ${constants.KW.ANDIKA} fname + " "+ lname;
            }

            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} fname + " "+ lname;
            }
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("It should save nested kazi node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname, lname) {
                ${constants.KW.ANDIKA} fname + " "+ lname;
                ${constants.KW.NJIA} wekaNamba(number) {
                    ${constants.KW.ANDIKA} number;
                }
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getKazi(mainInterpreter.getCurrentScope(), "wekaJina")).toBeTruthy();
    });
});
