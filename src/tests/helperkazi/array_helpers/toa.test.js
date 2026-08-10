const toa = require("../../../helperkazi/array_helpers/toa.js");

describe("Toa Test suite", () => {
    test("It should remove and return the last element of the array", () => {
        const orodha = [ 1, 2, 3, ];
        expect(toa([ orodha, ])).toBe(3);
        expect(orodha).toEqual([ 1, 2, ]);
    });

    test("It should fail when the array is empty", () => {
        expect(() => toa([ [], ])).toThrow();
    });

    test("It should fail because toa expects an array as its first param", () => {
        expect(() => toa([ "not an array", ])).toThrow();
    });

    test("It should fail because toa expects an array as argument", () => {
        expect(() => toa(1)).toThrow("system error");
    });
});
