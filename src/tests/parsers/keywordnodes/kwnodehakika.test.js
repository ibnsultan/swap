jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeHakika = require("../../../parsers/keywordnodes/kwnodehakika.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeHakika test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid hakika node", () => {
        const expectedNode = {
            body: [],
            condition: {
                left: {
                    name: "i",
                    operation: constants.GET_HIFADHI,
                },
                operation: constants.SYM.L_THAN,
                right: {
                    left: null,
                    operation: null,
                    right: null,
                    value: 10,
                },
                value: null,
            },
            increment: {
                left: "i",
                operation: constants.SYM.ASSIGN,
                right: {
                    left: {
                        name: "i",
                        operation: constants.GET_HIFADHI,
                    },
                    operation: constants.SYM.PLUS,
                    right: {
                        left: null,
                        operation: null,
                        right: null,
                        value: 1,
                    },
                    value: null,
                },
            },
            init: {
                left: "i",
                operation: constants.SYM.ASSIGN,
                right: {
                    left: null,
                    operation: null,
                    right: null,
                    value: 0,
                },
            },
            operation: constants.KW.HAKIKA,
        };

        parser.lexer().inputStream.code = `${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {}`;

        expect(kwNodeHakika.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid hakika node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {}
        }`;

        expect(kwNodeHakika.getNode.call(parser)).toBeTruthy();
    });

    test("it should throw an error when given invalid hakika node", () => {
        parser.lexer().inputStream.code = `${constants.KW.HAKIKA} ${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
            ${constants.KW.ANDIKA} i;
        }`;

        expect(() => {
            kwNodeHakika.getNode.call(parser);
        }).toThrow();
    });

    test("it should throw an error when given invalid hakika increment node", () => {
        parser.lexer().inputStream.code = `${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = j + 1) {
            ${constants.KW.ANDIKA} i;
        }`;

        expect(() => {
            kwNodeHakika.getNode.call(parser);
        }).toThrow();
    });
});
