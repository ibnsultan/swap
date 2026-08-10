const sakafu = require("../../../helperkazi/math_helpers/sakafu.js");

describe("Sakafu Test suite", () => {
    test("It should round a number down to the nearest integer", () => {
        expect(sakafu([ 4.9, ])).toBe(4);
    });

    test("It should fail when given a non-number", () => {
        expect(() => sakafu([ "4.9", ])).toThrow();
    });

    test("It should fail because sakafu expects an array as argument", () => {
        expect(() => sakafu(4.9)).toThrow("system error");
    });
});
