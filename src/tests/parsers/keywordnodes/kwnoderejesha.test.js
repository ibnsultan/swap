jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeRejesha = require("../../../parsers/keywordnodes/kwnoderejesha.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeRejesha test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return node with body.value of type number", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} 2;`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                value: 2,
                left: null,
                right: null,
                operation: null,
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return node with body.value of type string", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} "sawa";`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                value: "sawa",
                left: null,
                right: null,
                operation: null,
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type getTi i.e return a variable", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} sum;`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                name: "sum",
                operation: constants.GET_HIFADHI,
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type callKazi i.e return the value of a function call", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} sum(1,a);`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                operation: constants.CALL_KAZI,
                name: "sum",
                paramValues: [
                    { left: null, operation: null, right: null, value: 1, },
                    { name: "a", operation: constants.GET_HIFADHI, },
                ],
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation of type array element i.e return the value of an array element", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} sum[1];`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                operation: constants.ARRAY_ELEM,
                name: "sum",
                indexNodes: [{ "left": null, "operation": null, "right": null, "value": 1, }, ],
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.value of type bool", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} ${constants.KW.SIKWELI};`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                value: `${constants.KW.SIKWELI}`,
                left: null,
                right: null,
                operation: null,
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation 'array' ", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} [1,2];`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                operation: constants.ARRAY,
                body: [
                    { left: null, operation: null, right: null, value: 1, },
                    { left: null, operation: null, right: null, value: 2, }, ],
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should return node with body.operation 'array' when array is empty", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} [];`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        const expectedNode = {
            operation: constants.KW.REJESHA,
            body: {
                operation: constants.ARRAY,
                body: [],
            },
        };

        expect(kwNodeRejesha.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should skip the semicolon after the keyword padà", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} iró;`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);
        kwNodeRejesha.getNode.call(parser);

        expect(parser.lexer().peek()).toBe(null);
    });

    test("It should throw an error when given invalid rejesha node", () => {
        parser.lexer().inputStream.code = `${constants.KW.REJESHA} );`;
        parser.pushToBlockTypeStack(constants.KW.NJIA);

        expect(() => {
            kwNodeRejesha.getNode.call(parser);
        }).toThrow();
    });
});
