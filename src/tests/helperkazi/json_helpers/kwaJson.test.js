const kwaJson = require("../../../helperkazi/json_helpers/kwaJson.js");

describe("KwaJson Test suite", () => {
    test("It should serialize an array to a JSON string", () => {
        expect(kwaJson([ [ 1, 2, 3, ], ])).toBe("[1,2,3]");
    });

    test("It should serialize a number to a JSON string", () => {
        expect(kwaJson([ 5, ])).toBe("5");
    });

    test("It should serialize a string to a JSON string", () => {
        expect(kwaJson([ "habari", ])).toBe("\"habari\"");
    });

    test("It should serialize a ramani (plain object) to a JSON string", () => {
        expect(kwaJson([ { jina: "Juma", umri: 25, }, ])).toBe('{"jina":"Juma","umri":25}');
    });

    test("It should fail because kwaJson expects an array as argument", () => {
        expect(() => kwaJson(5)).toThrow("system error");
    });
});
