const herufiNdogo = require("../../../helperkazi/string_helpers/herufiNdogo.js");

describe("HerufiNdogo Test suite", () => {
    test("It should return lowercase version of string", () => {
        const array = ["SAWA", ];
        expect(herufiNdogo(array)).toBe("sawa");
    });

    test("It should fail to convert invalid string to lowercase", () => {
        const array = [1, ];
        expect(() => herufiNdogo(array)).toThrow();
    });

    test("It should fail because helper function herufiNdogo expects an array as argument", () => {
        const array = 2;
        expect(() => herufiNdogo(array)).toThrow("system error");
    });
});
