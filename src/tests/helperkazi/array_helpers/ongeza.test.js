const ongeza = require("../../../helperkazi/array_helpers/ongeza.js");

describe("Ongeza Test suite", () => {
    test("It should push a value onto the end of the array and return it", () => {
        const orodha = [ 1, 2, 3, ];
        expect(ongeza([ orodha, 4, ])).toEqual([ 1, 2, 3, 4, ]);
    });

    test("It should mutate the original array in place", () => {
        const orodha = [ 1, 2, ];
        ongeza([ orodha, 3, ]);
        expect(orodha).toEqual([ 1, 2, 3, ]);
    });

    test("It should fail because ongeza expects an array as its first param", () => {
        expect(() => ongeza([ "not an array", 4, ])).toThrow();
    });

    test("It should fail because ongeza expects an array as argument", () => {
        expect(() => ongeza(1)).toThrow("system error");
    });
});
