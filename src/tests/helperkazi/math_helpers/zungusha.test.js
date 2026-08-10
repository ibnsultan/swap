const zungusha = require("../../../helperkazi/math_helpers/zungusha.js");

describe("Zungusha Test suite", () => {
    test("It should round a number to the nearest integer", () => {
        expect(zungusha([ 4.5, ])).toBe(5);
        expect(zungusha([ 4.4, ])).toBe(4);
    });

    test("It should fail when given a non-number", () => {
        expect(() => zungusha([ "4.5", ])).toThrow();
    });

    test("It should fail because zungusha expects an array as argument", () => {
        expect(() => zungusha(4.5)).toThrow("system error");
    });
});
