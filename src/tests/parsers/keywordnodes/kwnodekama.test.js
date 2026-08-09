jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeSe = require("../../../parsers/keywordnodes/kwnodese.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeSe test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid se node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (niOruko) {
            ${constants.KW.ANDIKA} "o ni oruko";
        }`;

        const expectedNode = {
            condition: {
                name: "niOruko",
                operation: constants.GET_JEKI,
            },
            operation: constants.KW.KAMA,
            then: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "o ni oruko",
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node when body is empty", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (niOruko) {}`;

        const expectedNode = {
            condition: {
                name: "niOruko",
                operation: constants.GET_JEKI,
            },
            operation: constants.KW.KAMA,
            then: [],
        };

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid se node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (niOruko) {
            ${constants.KW.KAMA} (niOruko) {}
        }`;

        expect(kwNodeSe.getNode.call(parser)).toBeTruthy();
    });

    test("it should return a valid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} (aropo && ${constants.KW.KWELI}) {} ${constants.KW.BASI} {}`;

        const expectedNode = {
            condition: {
                left: {
                    name: "aropo",
                    operation: constants.GET_JEKI,
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

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when given an invalid se and tabi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.KAMA} aropo && ${constants.KW.KWELI}) {} tàbí {}`;

        expect(() => {
            kwNodeSe.getNode.call(parser);
        }).toThrow();
    });

    test("it should parse tabi se (else if) statements", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAMA} (aropo && ${constants.KW.KWELI}) {} 
            ${constants.KW.BASI} ${constants.KW.KAMA} (niOruko) {}
            ${constants.KW.BASI} ${constants.KW.KAMA} (${constants.KW.KWELI}) {}
            ${constants.KW.BASI} {}
        `;

        const expectedNode = {
            "condition": {
                "left": {
                    "name": "aropo",
                    "operation": constants.GET_JEKI,
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
                    "name": "niOruko",
                    "operation": constants.GET_JEKI,
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

        expect(kwNodeSe.getNode.call(parser)).toEqual(expectedNode);
    });
});
