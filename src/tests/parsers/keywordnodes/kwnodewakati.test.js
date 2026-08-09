jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeWakati = require("../../../parsers/keywordnodes/kwnodewakati.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeWakati test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a wakati node", () => {
        parser.lexer().inputStream.code = `${constants.KW.WAKATI} ((pili < jumla) && (pili > 0)) {
            ${constants.KW.ANDIKA} "hii ni jaribio la mfano";
            ${constants.KW.HIFADHI} pili = pili + 1;
        }`;

        const expectedNode = {
            body: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "hii ni jaribio la mfano",
                    },
                    operation: constants.KW.ANDIKA,
                },
                {
                    left: "pili",
                    operation: constants.SYM.ASSIGN,
                    right: {
                        left: {
                            name: "pili",
                            operation: constants.GET_HIFADHI,
                        },
                        operation: "+",
                        right: {
                            left: null,
                            operation: null,
                            right: null,
                            value: 1,
                        },
                        value: null,
                    },
                },
            ],
            condition: {
                left: {
                    left: {
                        name: "pili",
                        operation: constants.GET_HIFADHI,
                    },
                    operation: constants.SYM.L_THAN,
                    right: {
                        name: "jumla",
                        operation: constants.GET_HIFADHI,
                    },
                    value: null,
                },
                operation: constants.SYM.AND,
                right: {
                    left: {
                        name: "pili",
                        operation: constants.GET_HIFADHI,
                    },
                    operation: constants.SYM.G_THAN,
                    right: {
                        left: null,
                        operation: null,
                        right: null,
                        value: 0,
                    },
                    value: null,
                },
                value: null,
            },
            operation: constants.KW.WAKATI,
        };

        expect(kwNodeWakati.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return valid wakati node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.WAKATI} ((pili < jumla) && (pili > 0)) {
            ${constants.KW.ANDIKA} "hii ni jaribio la mfano";
            ${constants.KW.HIFADHI} pili = pili + 1;
            ${constants.KW.WAKATI} ((pili < jumla) && (pili > 0)) {
                ${constants.KW.ANDIKA} "hii ni jaribio la mfano";
                ${constants.KW.HIFADHI} pili = pili + 1;
            }
        }`;

        expect(kwNodeWakati.getNode.call(parser)).toBeTruthy();
    });

    test("it should throw an error when given invalid construct", () => {
        parser.lexer().inputStream.code = `${constants.KW.WAKATI} pili < jumla) && (pili > 0)) {
            ${constants.KW.ANDIKA} "hii ni jaribio la mfano";
            ${constants.KW.HIFADHI} pili = pili + 1;
        }`;

        expect(() => {
            kwNodeWakati.getNode.call(parser);
        }).toThrow();
    });
});
