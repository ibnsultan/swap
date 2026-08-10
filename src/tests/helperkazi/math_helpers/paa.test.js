const paa = require("../../../helperkazi/math_helpers/paa.js");

describe("Paa Test suite", () => {
    test("It should round a number up to the nearest integer", () => {
        expect(paa([ 4.1, ])).toBe(5);
    });

    test("It should fail when given a non-number", () => {
        expect(() => paa([ "4.1", ])).toThrow();
    });

    test("It should fail because paa expects an array as argument", () => {
        expect(() => paa(4.1)).toThrow("system error");
    });
});
