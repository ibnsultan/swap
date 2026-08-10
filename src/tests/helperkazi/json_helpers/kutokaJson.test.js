const kutokaJson = require("../../../helperkazi/json_helpers/kutokaJson.js");

describe("KutokaJson Test suite", () => {
    test("It should parse a JSON array", () => {
        expect(kutokaJson([ "[1,2,3]", ])).toEqual([ 1, 2, 3, ]);
    });

    test("It should parse a JSON object into a plain ramani-shaped object", () => {
        expect(kutokaJson([ '{"jina":"Juma","umri":25}', ])).toEqual({ jina: "Juma", umri: 25, });
    });

    test("It should parse a JSON number", () => {
        expect(kutokaJson([ "5", ])).toBe(5);
    });

    test("It should parse a JSON string", () => {
        expect(kutokaJson([ '"habari"', ])).toBe("habari");
    });

    test("It should fail when given malformed JSON", () => {
        expect(() => kutokaJson([ "{not valid json", ])).toThrow();
    });

    test("It should fail when given a non-string", () => {
        expect(() => kutokaJson([ 5, ])).toThrow();
    });

    test("It should fail because kutokaJson expects an array as argument", () => {
        expect(() => kutokaJson("[]")).toThrow("system error");
    });
});
