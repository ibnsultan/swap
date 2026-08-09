const kaunta = require("../../../helperkazi/array_helpers/kaunta.js");

describe("Kaunta Test suite", () => {
    test("It should return the length of the array", () => {
        const array = [[1, 2, 3, ], ];
        expect(kaunta(array)).toBe(3);
    });

    test("It should fail because kaunta expects a multidimensional array", () => {
        const array = [1, 2, 3, ];
        expect(() => kaunta(array)).toThrow();
    });

    test("It should fail because kaunta expects an array as argument", () => {
        const array = 2;
        expect(() => kaunta(array)).toThrow("system error");
    });
});
