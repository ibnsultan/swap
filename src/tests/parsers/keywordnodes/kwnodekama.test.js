jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeKama = require("../../../parsers/keywordnodes/kwnodekama.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeKama test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid se node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (kunaJina) {
            ${constants.KW.ANDIKA} "o ni jina";
        }`;

        const expectedNode = {
            condition: {
                name: "kunaJina",
                operation: constants.GET_HIFADHI,
            },
            operation: constants.KW.KAMA,
            then: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "o ni jina",
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
        };

        expect(kwNodeKama.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node when body is empty", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (kunaJina) {}`;

        const expectedNode = {
            condition: {
                name: "kunaJina",
                operation: constants.GET_HIFADHI,
            },
            operation: constants.KW.KAMA,
            then: [],
        };

        expect(kwNodeKama.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (kunaJina) {
            ${constants.KW.KAMA} (kunaJina) {}
        }`;

        expect(kwNodeKama.getNode.call(parser)).toBeTruthy();
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (jumla && ${constants.KW.KWELI}) {} ${constants.KW.BASI} {}`;

        const expectedNode = {
            condition: {
                left: {
                    name: "jumla",
                    operation: constants.GET_HIFADHI,
                },
                operation: constants.SYM.AND,
                right: {
                    left: null,
                    operation: null,
                    right: null,
                    value: constants.KW.KWELI,
                },
                value: null,
            },
            else: [],
            operation: constants.KW.KAMA,
            then: [],
        };

        expect(kwNodeKama.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when given an invalid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} jumla && ${constants.KW.KWELI}) {} au {}`;

        expect(() => {
            kwNodeKama.getNode.call(parser);
        }).toThrow();
    });

    test("it should parse tabi se (else if) statements", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAMA} (jumla && ${constants.KW.KWELI}) {} 
            ${constants.KW.BASI} ${constants.KW.KAMA} (kunaJina) {}
            ${constants.KW.BASI} ${constants.KW.KAMA} (${constants.KW.KWELI}) {}
            ${constants.KW.BASI} {}
        `;

        const expectedNode = {
            "condition": {
                "left": {
                    "name": "jumla",
                    "operation": constants.GET_HIFADHI,
                },
                "operation": "&&",
                "right": {
                    "left": null,
                    "operation": null,
                    "right": null,
                    "value": constants.KW.KWELI,
                },
                "value": null,
            },
            "else": {
                "condition": {
                    "name": "kunaJina",
                    "operation": constants.GET_HIFADHI,
                },
                "else": {
                    "condition": {
                        "left": null,
                        "operation": null,
                        "right": null,
                        "value": constants.KW.KWELI,
                    },
                    "else": [],
                    "operation": constants.KW.KAMA,
                    "then": [],
                },
                "operation": constants.KW.KAMA,
                "then": [],
            },
            "operation": constants.KW.KAMA,
            "then": [],
        };

        expect(kwNodeKama.getNode.call(parser)).toEqual(expectedNode);
    });
});
