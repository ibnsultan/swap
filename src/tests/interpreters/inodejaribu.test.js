jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeJaribu test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should catch a division by zero error and run the kamata block", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JARIBU} {
                ${constants.KW.HIFADHI} x = 10 / 0;
            } ${constants.KW.KAMATA} (hitilafu) {
                ${constants.KW.ANDIKA} hitilafu;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining("cannot divide by zero"));
    });

    test("it should catch an undefined variable error and run the kamata block", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JARIBU} {
                ${constants.KW.ANDIKA} haipo;
            } ${constants.KW.KAMATA} (hitilafu) {
                ${constants.KW.ANDIKA} hitilafu;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining("haipo"));
    });

    test("it should not run the kamata block when the jaribu block succeeds", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JARIBU} {
                ${constants.KW.ANDIKA} "sawa";
            } ${constants.KW.KAMATA} (hitilafu) {
                ${constants.KW.ANDIKA} hitilafu;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(1);
        expect(global.console.log).toHaveBeenCalledWith("sawa");
    });

    test("a vunja inside jaribu inside wakati should still break the loop", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} i = 0;
            ${constants.KW.WAKATI} (i < 10) {
                ${constants.KW.ANDIKA} i;
                ${constants.KW.JARIBU} {
                    ${constants.KW.KAMA} (i == 5) {
                        ${constants.KW.VUNJA};
                    }
                } ${constants.KW.KAMATA} (hitilafu) {
                    ${constants.KW.ANDIKA} hitilafu;
                }
                ${constants.KW.HIFADHI} i = i + 1;
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledTimes(6);
    });

    test("a rejesha inside jaribu inside njia should still return from the function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} mfano(namba) {
                ${constants.KW.JARIBU} {
                    ${constants.KW.REJESHA} namba + 3;
                } ${constants.KW.KAMATA} (hitilafu) {
                    ${constants.KW.REJESHA} 0;
                }
            }

            ${constants.KW.ANDIKA} mfano(5);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(8);
    });

    test("an error caught from inside a njia call must not leave the scope stack corrupted", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} mfano() {
                ${constants.KW.HIFADHI} x = 10 / 0;
            }

            ${constants.KW.JARIBU} {
                mfano();
            } ${constants.KW.KAMATA} (hitilafu) {
                ${constants.KW.ANDIKA} hitilafu;
            }

            ${constants.KW.HIFADHI} y = 5;
            ${constants.KW.ANDIKA} y;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
        expect(mainInterpreter.scopeStack()).toEqual([ "global", ]);
    });
});
