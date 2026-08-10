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

    test("it should call a lambda value assigned to a variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} ongeza = ${constants.KW.NJIA} (a, b) { ${constants.KW.REJESHA} a + b; };
            ${constants.KW.ANDIKA} ongeza(2, 3);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(5);
    });

    test("it should pass a lambda as an argument and call it inside the callee", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} ongezaMaraMbili = ${constants.KW.NJIA} (a) { ${constants.KW.REJESHA} a * 2; };

            ${constants.KW.NJIA} tumia(kazi, x) {
                ${constants.KW.REJESHA} kazi(x);
            }

            ${constants.KW.ANDIKA} tumia(ongezaMaraMbili, 10);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(20);
    });

    test("it should call a lambda returned from another function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} pataOngeza() {
                ${constants.KW.REJESHA} ${constants.KW.NJIA} (a, b) { ${constants.KW.REJESHA} a + b; };
            }

            ${constants.KW.HIFADHI} ongeza = pataOngeza();
            ${constants.KW.ANDIKA} ongeza(4, 5);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(9);
    });

    test("it should fail to call a value that is not a function", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} x = 5;
            x(3);
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should call a lambda recursively without corrupting the caller's scope", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} fact = ${constants.KW.NJIA} (n) {
                ${constants.KW.KAMA} (n <= 1) {
                    ${constants.KW.REJESHA} 1;
                }
                ${constants.KW.REJESHA} n * fact(n - 1);
            };

            ${constants.KW.ANDIKA} fact(5);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(120);
    });

    test("it should test integration of closure-taking helper ramanisha (map)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} maradufu = ${constants.KW.NJIA} (x) { ${constants.KW.REJESHA} x * 2; };
            ${constants.KW.ANDIKA} ramanisha([1, 2, 3], maradufu);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith([ 2, 4, 6, ]);
    });

    test("it should test integration of closure-taking helper chuja (filter)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} kubwaKulikoMbili = ${constants.KW.NJIA} (x) { ${constants.KW.REJESHA} x > 2; };
            ${constants.KW.ANDIKA} chuja([1, 2, 3, 4], kubwaKulikoMbili);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith([ 3, 4, ]);
    });

    test("it should test integration of closure-taking helper punguza (reduce)", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} jumlisha = ${constants.KW.NJIA} (jumla, x) { ${constants.KW.REJESHA} jumla + x; };
            ${constants.KW.ANDIKA} punguza([1, 2, 3, 4], jumlisha, 0);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(10);
    });

    test("it should test integration of closure-taking helper kilamoja (forEach) with an inline lambda", () => {
        parser.lexer().inputStream.code = `
            kilamoja([1, 2, 3], ${constants.KW.NJIA} (x) { ${constants.KW.ANDIKA} x; });
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
