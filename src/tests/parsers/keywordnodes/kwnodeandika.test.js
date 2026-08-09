jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeAndika = require("../../../parsers/keywordnodes/kwnodeandika.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeAndika test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return node with operation andika with body of token number", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} 2;`;
        const expectedNode = {
            operation: constants.KW.ANDIKA,
            body: {
                value: 2,
                left: null,
                right: null,
                operation: null,
            },
        };

        expect(kwNodeAndika.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation andika with body of token string", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} "beautiful";`;
        const expectedNode = {
            operation: constants.KW.ANDIKA,
            body: {
                value: "beautiful",
                left: null,
                right: null,
                operation: null,
            },
        };

        expect(kwNodeAndika.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation andika with body of token variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} name;`;
        const expectedNode = {
            operation: constants.KW.ANDIKA,
            body: {
                name: "name",
                operation: constants.GET_HIFADHI,
            },
        };

        expect(kwNodeAndika.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation andika with body of node callKazi", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} sum(1,2);`;
        const expectedNode = {
            operation: constants.KW.ANDIKA,
            body: {
                operation: constants.CALL_KAZI,
                name: "sum",
                paramValues: [{ left: null, operation: null, right: null, value: 1, }, { left: null, operation: null, right: null, value: 2, }, ],
            },
        };

        expect(kwNodeAndika.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with operation andika with body of node array element", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} a[1];`;
        const expectedNode = {
            operation: constants.KW.ANDIKA,
            body: {
                operation: constants.ARRAY_ELEM,
                name: "a",
                indexNodes: [{ "left": null, "operation": null, "right": null, "value": 1, }, ],
            },
        };

        expect(kwNodeAndika.getNode.call(parser)).toEqual(expectedNode);
    });

    test(`It should skip the semicolon after the keyword ${constants.KW.ANDIKA}`, () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} a;`;
        kwNodeAndika.getNode.call(parser);

        expect(parser.lexer().peek()).toBe(null);
    });

    test("it should return node with operation andika with body of node array literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} [2,3];`;

        expect(kwNodeAndika.getNode.call(parser)).toBeTruthy();
    });

    test("it should return node with operation andika with body of an expression", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} 2 + 2;`;

        expect(kwNodeAndika.getNode.call(parser)).toBeTruthy();
    });

    test("It should throw an error when given invalid input", () => {
        parser.lexer().inputStream.code = `${constants.KW.ANDIKA} (2,3);`;

        expect(() => {
            kwNodeAndika.getNode.call(parser);
        }).toThrow();
    });
});
