const herufiKubwa = require("../../../helperkazi/string_helpers/herufiKubwa.js");

describe("HerufiKubwa Test suite", () => {
    test("It should return uppercase version of string", () => {
        const array = ["sawa", ];
        expect(herufiKubwa(array)).toBe("SAWA");
    });

    test("It should fail to convert invalid string to upper case", () => {
        const array = [1, ];
        expect(() => herufiKubwa(array)).toThrow();
    });

    test("It should fail because helper function herufiKubwa expects an array as argument", () => {
        const array = 2;
        expect(() => herufiKubwa(array)).toThrow("system error");
    });
});
