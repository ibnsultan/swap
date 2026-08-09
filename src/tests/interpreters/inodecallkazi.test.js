jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeCallKazi test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should call an already declared kazi function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} fname;
            }

            wekaJina("juma");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("juma");
    });

    test("it should fail to print a variable that is out of scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} fname;
            }

            wekaJina("juma");
            ${constants.KW.ANDIKA} fname;
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should have access to variables in a parent scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} sname = "asha";

            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;
            }

            wekaJina("juma");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("asha juma");
    });

    test("it should fail to call a kazi function that hasn't been declared", () => {
        parser.lexer().inputStream.code = `
            wekaJina("juma");
        `;

        expect(() => mainInterpreter.interpreteProgram(parser)).toThrow();
    });

    test("it should maintain scope within nested kazi node", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} sname = "asha";

            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;

                ${constants.KW.NJIA} pataNamberaNaJina(no) {
                    ${constants.KW.ANDIKA} sname +" "+ fname +" "+no;
                }
                pataNamberaNaJina("0812035532");
            }

            wekaJina("juma");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("asha juma");
        expect(global.console.log).toHaveBeenCalledWith("asha juma 0812035532");
    });

    test("it should call a kazi function in a parent scope", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.HIFADHI} sname = "asha";

            ${constants.KW.NJIA} pataNamberaNaJina(no) {
                ${constants.KW.ANDIKA} no;
            }

            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} sname +" "+ fname;

                pataNamberaNaJina("0812035532");
            }

            wekaJina("juma");
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("asha juma");
        expect(global.console.log).toHaveBeenCalledWith("0812035532");
    });

    test("it should return a value from an se block within a kazi function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} pataJina(fname) {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.KAMA} (c > b[0]) {
                    ${constants.KW.REJESHA} b[0] +" "+ fname;
                } ${constants.KW.BASI} {
                    ${constants.KW.REJESHA} "sijui jina lako";
                }
            }

            ${constants.KW.HIFADHI} a = pataJina("juma");
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("1 juma");
    });

    test("it should return a value from a wakati block within a kazi function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} pataNamba() {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.WAKATI} (c < 6) {
                    ${constants.KW.REJESHA} c;
                }
            }

            ${constants.KW.HIFADHI} a = pataNamba();
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should return a value from a hakika block within a kazi function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} pataNamba() {
                ${constants.KW.HIFADHI} b = [1,2,3];
                ${constants.KW.HIFADHI} c = 4;

                ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i = 0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
                    ${constants.KW.REJESHA} i;
                }
            }

            ${constants.KW.HIFADHI} a = pataNamba();
            ${constants.KW.ANDIKA} a;
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(0);
    });

    test("Capture the state of parameters of type variable before passing them as params to function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} output(i) {
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

    test("Make sure kazi can take negative values as parameters", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} jumlishaNamba(a, b) {
                ${constants.KW.ANDIKA} a + b;
            }

            jumlishaNamba(-3, 2);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(-1);
    });
});
