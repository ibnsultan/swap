jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeYi = require("../../../parsers/keywordnodes/kwnodeyi.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeYi test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid yi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.BAD} (firstname) {
            ${constants.KW.KESI} "anu":
                ${constants.KW.ANDIKA} "it is anu";
            ${constants.KW.KESI} "femi": 
                ${constants.KW.ANDIKA} "it femi";
            ${constants.KW.PADASI}: 
                ${constants.KW.ANDIKA} "mi o mo";      
        }`;

        const expectedNode = {
            yibody: [
                {
                    IRUbody: [
                        {
                            body: {
                                left: null,
                                operation: null,
                                right: null,
                                value: "it is anu",
                            },
                            operation: constants.KW.ANDIKA,
                        },
                    ],
                    IRUvalue: {
                        value: "anu",
                        left: null,
                        right: null,
                        operation: null,
                    },
                    operation: constants.KW.KESI,
                },
                {
                    IRUbody: [
                        {
                            body: {
                                left: null,
                                operation: null,
                                right: null,
                                value: "it femi",
                            },
                            operation: constants.KW.ANDIKA,
                        },
                    ],
                    IRUvalue: {
                        value: "femi",
                        left: null,
                        right: null,
                        operation: null,
                    },
                    operation: constants.KW.KESI,
                },
            ],
            operation: constants.KW.BAD,
            padasi: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "mi o mo",
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
            yivalue: {
                name: "firstname",
                operation: constants.GET_JEKI,
            },
        };

        expect(kwNodeYi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when an invalid yi node is given", () => {
        parser.lexer().inputStream.code = `${constants.KW.BAD} name) {
            ${constants.KW.KESI} "anu":
                ${constants.KW.ANDIKA} "it is anu";
                ${constants.KW.VUNJA};
            ${constants.KW.KESI} "femi": 
                ${constants.KW.ANDIKA} "it femi";
                ${constants.KW.VUNJA};
            ${constants.KW.PADASI}: 
                ${constants.KW.ANDIKA} "mi o mo";      
        }`;

        expect(() => {
            kwNodeYi.getNode.call(parser);
        }).toThrow();
    });
});
