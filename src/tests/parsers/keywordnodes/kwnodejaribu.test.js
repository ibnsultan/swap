jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeJaribu = require("../../../parsers/keywordnodes/kwnodejaribu.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeJaribu test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return a valid jaribu/kamata node", () => {
        parser.lexer().inputStream.code = `${constants.KW.JARIBU} {
            ${constants.KW.ANDIKA} "ndani";
        } ${constants.KW.KAMATA} (hitilafu) {
            ${constants.KW.ANDIKA} hitilafu;
        }`;

        const expectedNode = {
            operation: constants.KW.JARIBU,
            tryBlock: [
                {
                    body: {
                        left: null,
                        operation: null,
                        right: null,
                        value: "ndani",
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
            catchVarName: "hitilafu",
            catchBlock: [
                {
                    body: {
                        name: "hitilafu",
                        operation: constants.GET_HIFADHI,
                    },
                    operation: constants.KW.ANDIKA,
                },
            ],
        };

        expect(kwNodeJaribu.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return a valid node when both blocks are empty", () => {
        parser.lexer().inputStream.code = `${constants.KW.JARIBU} {} ${constants.KW.KAMATA} (hitilafu) {}`;

        const expectedNode = {
            operation: constants.KW.JARIBU,
            tryBlock: [],
            catchVarName: "hitilafu",
            catchBlock: [],
        };

        expect(kwNodeJaribu.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should throw when kamata is missing", () => {
        parser.lexer().inputStream.code = `${constants.KW.JARIBU} {}`;

        expect(() => kwNodeJaribu.getNode.call(parser)).toThrow();
    });

    test("it should throw when the catch variable is missing", () => {
        parser.lexer().inputStream.code = `${constants.KW.JARIBU} {} ${constants.KW.KAMATA} () {}`;

        expect(() => kwNodeJaribu.getNode.call(parser)).toThrow();
    });
});
