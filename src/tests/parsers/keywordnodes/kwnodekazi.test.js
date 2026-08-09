jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const kwNodeKazi = require("../../../parsers/keywordnodes/kwnodekazi.js");
const Parser = require("../../../parsers/parser.js");
const lexer = require("../../../lexer.js");
const InputStream = require("../../../inputstream.js");
const constants = require("../../../constants.js");

describe("KwNodeKazi test suite", () => {
    let parser;

    beforeEach(() => {
        parser = new Parser(new lexer(new InputStream()));
    });

    test("it should return valid kazi node", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} wekaJina(a,b) {}`;

        const expectedNode = {
            body: [],
            name: "wekaJina",
            operation: constants.KW.NJIA,
            paramTokens: [
                {
                    type: constants.VARIABLE,
                    value: "a",
                },
                {
                    type: constants.VARIABLE,
                    value: "b",
                },
            ],
        };

        expect(kwNodeKazi.getNode.call(parser)).toEqual(expectedNode);
    });

    test("it should return valid kazi node for nested blocks", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} andikaJina(jinaLangu) {
            ${constants.KW.HIFADHI} jina = jinaLangu;
            
            ${constants.KW.HAKIKA} (${constants.KW.HIFADHI} i =0; i < 10; ${constants.KW.HIFADHI} i = i + 1) {
                ${constants.KW.ANDIKA} i;
            }
        
            ${constants.KW.NJIA} wekaKichwa() {
                ${constants.KW.ANDIKA} "asante";
            }
        
            ${constants.KW.REJESHA} wekaKichwa();
        }`;

        expect(kwNodeKazi.getNode.call(parser)).toBeTruthy();
    });

    test("it should fail to create a kazi node within an invalid block", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} andikaJina(jinaLangu) {
            ${constants.KW.HIFADHI} jina = jinaLangu;
            
            ${constants.KW.HAKIKA} (tí i =0; i < 10; tí i = i + 1;) {
                ${constants.KW.ANDIKA} i;

                ${constants.KW.NJIA} wekaKichwa() {
                    ${constants.KW.ANDIKA} "asante";
                }
            }
        
            ${constants.KW.REJESHA} wekaKichwa();
        }`;

        expect(() => kwNodeKazi.getNode.call(parser)).toThrow();
    });

    test("it should throw an error when given invalid kazi", () => {
        parser.lexer().inputStream.code = `${constants.KW.NJIA} (wekaJina(a,b) {}`;

        expect(() => {
            kwNodeKazi.getNode.call(parser);
        }).toThrow();
    });
});
