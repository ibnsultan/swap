const geuza = require("../../../helperkazi/array_helpers/geuza.js");

describe("Geuza Test suite", () => {
    test("It should reverse the array", () => {
        expect(geuza([ [ 1, 2, 3, ], ])).toEqual([ 3, 2, 1, ]);
    });

    test("It should fail because geuza expects an array as its first param", () => {
        expect(() => geuza([ "not an array", ])).toThrow();
    });

    test("It should fail because geuza expects an array as argument", () => {
        expect(() => geuza(1)).toThrow("system error");
    });
});
