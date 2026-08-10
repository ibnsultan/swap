const mzizi = require("../../../helperkazi/math_helpers/mzizi.js");

describe("Mzizi Test suite", () => {
    test("It should return the square root of a number", () => {
        expect(mzizi([ 9, ])).toBe(3);
    });

    test("It should fail when given a negative number", () => {
        expect(() => mzizi([ -9, ])).toThrow();
    });

    test("It should fail when given a non-number", () => {
        expect(() => mzizi([ "9", ])).toThrow();
    });

    test("It should fail because mzizi expects an array as argument", () => {
        expect(() => mzizi(9)).toThrow("system error");
    });
});
