const panga = require("../../../helperkazi/array_helpers/panga.js");

describe("Panga Test suite", () => {
    test("It should sort an array of numbers ascending, numerically", () => {
        const orodha = [ 10, 2, 33, 4, ];
        expect(panga([ orodha, ])).toEqual([ 2, 4, 10, 33, ]);
    });

    test("It should sort an array of strings ascending", () => {
        const orodha = [ "banana", "apple", "cherry", ];
        expect(panga([ orodha, ])).toEqual([ "apple", "banana", "cherry", ]);
    });

    test("It should fail because panga expects an array as argument", () => {
        expect(() => panga(1)).toThrow("system error");
    });
});
