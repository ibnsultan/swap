jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const lambdaNl = require("../../../parsers/nodeLiterals/lambdanl.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("LambdaNodeLiteral test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("It should parse a lambda literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} (a, b) { ${constants.KW.REJESHA} a + b; }`;

        const expectedNode = {
            operation: constants.LAMBDA,
            paramTokens: [
                { type: constants.VARIABLE, value: "a", },
                { type: constants.VARIABLE, value: "b", },
            ],
            body: [
                {
                    operation: constants.KW.REJESHA,
                    body: {
                        left: { name: "a", operation: constants.GET_HIFADHI, },
                        operation: constants.SYM.PLUS,
                        right: { name: "b", operation: constants.GET_HIFADHI, },
                        value: null,
                    },
                },
            ],
        };

        expect(lambdaNl.getNode.call(parser)).toEqual(expectedNode);
    });

    test("It should parse a lambda literal with no params and an empty body", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} () {}`;

        expect(lambdaNl.getNode.call(parser)).toEqual({
            operation: constants.LAMBDA,
            paramTokens: [],
            body: [],
        });
    });

    test("It should throw an error while parsing an invalid lambda literal", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} (1) {}`;

        expect(() => lambdaNl.getNode.call(parser)).toThrow();
    });
});
