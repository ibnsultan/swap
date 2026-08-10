const kata = require("../../../helperkazi/array_helpers/kata.js");

describe("Kata Test suite", () => {
    test("It should return a slice between the given start and end index", () => {
        expect(kata([ [ 1, 2, 3, 4, 5, ], 1, 3, ])).toEqual([ 2, 3, ]);
    });

    test("It should slice to the end of the array when no end index is given", () => {
        expect(kata([ [ 1, 2, 3, 4, 5, ], 2, ])).toEqual([ 3, 4, 5, ]);
    });

    test("It should not mutate the original array", () => {
        const orodha = [ 1, 2, 3, ];
        kata([ orodha, 1, ]);
        expect(orodha).toEqual([ 1, 2, 3, ]);
    });

    test("It should fail because kata expects an array as its first param", () => {
        expect(() => kata([ "not an array", 1, ])).toThrow();
    });

    test("It should fail because kata expects an array as argument", () => {
        expect(() => kata(1)).toThrow("system error");
    });
});
