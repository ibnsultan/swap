jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeTi = require("../../interpreters/inodehifadhi.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodehifadhi.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeHifadhi test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should assign expression to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = ((5 + 2) * (2 - 4)) / 2;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toBe(-7);
    });

    test("it should assign floating point number to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 3.142;`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toBe(3.142);
    });

    test("it should assign string to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = "sawa";`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toBe("sawa");
    });

    test("it should assign an array literal to a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = [1,2];`;
        const node = kwNodeTi.getNode.call(parser);
        iNodeTi.interpreteNode.call(mainInterpreter, node);
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual([1, 2, ]);
    });

    test("it should interprete expression that contains a variable reference", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 5;
            ${constants.KW.HIFADHI} b = ((a + 2) * (2 - 4)) / 2;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "b")).toBe(-7);
    });

    test("it should assign value to an array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [1,2];
            ${constants.KW.HIFADHI} a[0] = "fatuma";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual(["fatuma", 2, ]);
    });

    test("it should assign value to the last position of an array element with empty index", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [1,2];
            ${constants.KW.HIFADHI} a[] = "fatuma";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual([1, 2, "fatuma", ]);
    });

    test("it should assign value to the last position of a multidimensional array element with empty index", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [1,[2]];
            ${constants.KW.HIFADHI} a[1][] = "fatuma";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual([1, [2, "fatuma", ], ]);
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.HIFADHI} a[1][0][0] = "fatuma";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual([ [1, 2, ], [["fatuma", 4, ], 5, ], ]);
    });

    test("it should fail to assign value to an invalid multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [[1,2], [[3,4], 5]];
            ${constants.KW.HIFADHI} a[1][0][0][0] = "fatuma";
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should fail to assign undefined to variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.NJIA} wekaJina(fname) {
                ${constants.KW.ANDIKA} fname;
            }
            
            ${constants.KW.HIFADHI} a = wekaJina("name");
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should assign value to a multi-dimensional array element", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = [[1,2], [3,4], 5];
            ${constants.KW.HIFADHI} a[1] = "fatuma";
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toEqual([[1, 2, ], "fatuma", 5, ]);
    });

    test("it should assign transformed (uppercase) string to variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = herufiKubwa("fatuma");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toBe("FATUMA");
    });

    test("it should assign transformed (lowercase) string to variable", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = herufiNdogo("FATUMA");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "a")).toBe("fatuma");
    });

    test("it should test integration of helper badili", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} text = badili("Kiswahili ni kizuri", "kizuri", "kabisa");
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "text")).toBe("Kiswahili ni kabisa");
    });

    test("it should test integration of helper hariri", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} text = hariri("Kiswahili ni kizuri", "kizuri", "kabisa");

        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "text")).toBe("Kiswahili ni kabisa");
    });

    test("it should test integration of helper tafuta", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} text = tafuta("Kiswahili ni kizuri", "kizuri");

        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "text")).toBe("kweli");
    });

    test("it should test integration of helper mda", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} time = mda();
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getHifadhi(mainInterpreter.getCurrentScope(), "time")).toBeTruthy();
    });
});
