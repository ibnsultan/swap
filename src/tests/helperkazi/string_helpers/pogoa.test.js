const pogoa = require("../../../helperkazi/string_helpers/pogoa.js");

describe("Pogoa Test suite", () => {
    test("It should trim leading and trailing whitespace", () => {
        expect(pogoa([ "  habari  ", ])).toBe("habari");
    });

    test("It should fail when given a non-string", () => {
        expect(() => pogoa([ 5, ])).toThrow();
    });

    test("It should fail because pogoa expects an array as argument", () => {
        expect(() => pogoa("habari")).toThrow("system error");
    });
});
