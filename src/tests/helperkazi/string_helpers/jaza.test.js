const jaza = require("../../../helperkazi/string_helpers/jaza.js");

describe("Jaza Test suite", () => {
    test("It should pad the start of a string by default", () => {
        expect(jaza([ "5", 3, "0", ])).toBe("005");
    });

    test("It should pad the end of a string when mahali is 'mwisho'", () => {
        expect(jaza([ "5", 3, "0", "mwisho", ])).toBe("500");
    });

    test("It should fail when given invalid param types", () => {
        expect(() => jaza([ 5, 3, "0", ])).toThrow();
    });

    test("It should fail because jaza expects an array as argument", () => {
        expect(() => jaza("5")).toThrow("system error");
    });
});
