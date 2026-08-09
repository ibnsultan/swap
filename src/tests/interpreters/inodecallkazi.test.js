jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeCallIse test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should call an already declared ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} teOruko(fname) {
                ${constants.KW.ANDIKA} fname;
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("femi");
    });

    test("it should fail to print a variable that is out of scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} teOruko(fname) {
                ${constants.KW.ANDIKA} fname;
            }

            teOruko("femi");
            ${constants.KW.ANDIKA} fname;
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should have access to variables in a parent scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} sname = "karounwi";

            ${constants.KW.KAZI} teOruko(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
    });

    test("it should fail to call an ise function that hasn't been declared", () => {
        parser.lexer().inputStream.code = `
            teOruko("femi");
        `;

        expect(() => mainInterpreter.interpreteProgram(parser)).toThrow();
    });

    test("it should maintain scope within nested ise node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} sname = "karounwi";

            ${constants.KW.KAZI} teOruko(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;

                ${constants.KW.KAZI} tePhoneNoPeluOruko(no) {
                    ${constants.KW.ANDIKA} sname +" "+ fname +" "+no;
                }
                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi 0812035532");
    });

    test("it should call an ise function in a parent scope", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} sname = "karounwi";

            ${constants.KW.KAZI} tePhoneNoPeluOruko(no) {
                ${constants.KW.ANDIKA} no;
            }

            ${constants.KW.KAZI} teOruko(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;

                tePhoneNoPeluOruko("0812035532");
            }

            teOruko("femi");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("karounwi femi");
        expect(global.console.log).toHaveBeenCalledWith("0812035532");
    });

    test("it should return a value from an se block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} gbaOruko(fname) {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.KAMA} (c > b[0]) {
                    ${constants.KW.PADA} b[0] +" "+ fname;
                } ${constants.KW.BASI} {
                    ${constants.KW.PADA} "a o ni fun e loruko";
                }
            }

            ${constants.KW.HIFADHI} a = gbaOruko("femi");
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("1 femi");
    });

    test("it should return a value from a nigbati block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} gbaOnka() {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.WAKATI} (c < 6) {
                    ${constants.KW.PADA} c;
                }
            }

            ${constants.KW.HIFADHI} a = gbaOnka();
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should return a value from a fun block within an ise function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} gbaOnka() {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
                    ${constants.KW.PADA} i;
                }
            }

            ${constants.KW.HIFADHI} a = gbaOnka();
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(0);
    });

    test("Capture the state of parameters of type variable before passing them as params to function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} output(i) {
                ${constants.KW.ANDIKA} i;
            }

            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 1; i <= 3; ${constants.KW.HIFADHI} i = i + 1) { 
                output(i);
            }
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(1);
        expect(global.console.log).toHaveBeenCalledWith(2);
        expect(global.console.log).toHaveBeenCalledWith(3);
    });

    test("Make sure ise can take negative values as parameters", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} teAropoNonba(a, b) {
                ${constants.KW.ANDIKA} a + b;
            }

            teAropoNonba(-3, 2);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(-1);
    });
});
