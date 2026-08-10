const kamili = require("../../../helperkazi/math_helpers/kamili.js");

describe("Kamili Test suite", () => {
    test("It should return the absolute value of a negative number", () => {
        expect(kamili([ -7, ])).toBe(7);
    });

    test("It should return the absolute value of a positive number unchanged", () => {
        expect(kamili([ 7, ])).toBe(7);
    });

    test("It should fail when given a non-number", () => {
        expect(() => kamili([ "-7", ])).toThrow();
    });

    test("It should fail because kamili expects an array as argument", () => {
        expect(() => kamili(-7)).toThrow("system error");
    });
});
