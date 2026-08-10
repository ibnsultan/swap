const ndogo = require("../../../helperkazi/math_helpers/ndogo.js");

describe("Ndogo Test suite", () => {
    test("It should return the smallest of the given numbers", () => {
        expect(ndogo([ 3, 7, 2, ])).toBe(2);
    });

    test("It should fail when given a non-number", () => {
        expect(() => ndogo([ 3, "7", 2, ])).toThrow();
    });

    test("It should fail because ndogo expects an array as argument", () => {
        expect(() => ndogo(3)).toThrow("system error");
    });
});
