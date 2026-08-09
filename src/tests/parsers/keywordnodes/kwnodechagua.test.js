jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeChagua = require("../../../parsers/keywordnodes/kwnodechagua.js");
const Parser = require("../../../parsers/parser.js");
const Lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeChagua test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
    });

    test("it should return a valid yi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.CHAGUA} (firstname) {
            ${constants.KW.KESI} "sawa":
                ${constants.KW.ANDIKA} "it is sawa";
            ${constants.KW.KESI} "juma": 
                ${constants.KW.ANDIKA} "it juma";
            ${constants.KW.ZAIDI}: 
                ${constants.KW.ANDIKA} "sijui";      
        }`;

        const expectedNode = {
            chaguabody: [
                {
                    kesibody: [
                        {
                            body: {
                                left: null,
                                operation: null,
                                right: null,
                                value: "it is sawa",
                            },
                            operation: constants.KW.ANDIKA,
                        },
                    ],
                    kesivalue: {
                        value: "sawa",
                        left: null,
                        right: null,
                        operation: null,
                    },
                    operation: constants.KW.KESI,
                },
                {
                    kesibody: [
                        {
                            body: {
                                left: null,
                                operation: null,
                                right: null,
                                value: "it juma",
                            },
                            operation: constants.KW.ANDIKA,
                        },
                    ],
                    kesivalue: {
                        value: "juma",
                        left: null,
                        right: null,
                        operation: null,
                    },
                    operation: constants.KW.KESI,
                },
            ],
            operation: constants.KW.CHAGUA,
            zaidi: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "sijui",
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
            chaguavalue: {
                name: "firstname",
                operation: constants.GET_HIFADHI,
            },
        };

        expect(kwNodeChagua.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw an error when an invalid yi node is given", () => {
        parser.lexer().inputStream.code = `${constants.KW.CHAGUA} name) {
            ${constants.KW.KESI} "sawa":
                ${constants.KW.ANDIKA} "it is sawa";
                ${constants.KW.VUNJA};
            ${constants.KW.KESI} "juma": 
                ${constants.KW.ANDIKA} "it juma";
                ${constants.KW.VUNJA};
            ${constants.KW.ZAIDI}: 
                ${constants.KW.ANDIKA} "sijui";      
        }`;

        expect(() => {
            kwNodeChagua.getNode.call(parser);
        }).toThrow();
    });
});
