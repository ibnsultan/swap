const kipeo = require("../../../helperkazi/math_helpers/kipeo.js");

describe("Kipeo Test suite", () => {
    test("It should raise the base to the given exponent", () => {
        expect(kipeo([ 2, 10, ])).toBe(1024);
    });

    test("It should fail when given non-numbers", () => {
        expect(() => kipeo([ "2", 10, ])).toThrow();
    });

    test("It should fail because kipeo expects an array as argument", () => {
        expect(() => kipeo(2)).toThrow("system error");
    });
});
