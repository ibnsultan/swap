jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const constants = require("../../constants.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");

describe("INodeMapElement test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should read a ramani property", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} mtu = ${constants.KW.RAMANI}(jina: "Juma", umri: 25);
            ${constants.KW.ANDIKA} mtu.jina;
        `;
        global.console.log = jest.fn();

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("Juma");
    });

    test("it should throw when the key does not exist", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} mtu = ${constants.KW.RAMANI}(jina: "Juma");
            ${constants.KW.ANDIKA} mtu.umri;
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });

    test("it should throw when accessing a property on a non-map value", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} mtu = [1,2];
            ${constants.KW.ANDIKA} mtu.jina;
        `;

        expect(() => mainInterpreter.interpreteProgram()).toThrow();
    });
});
