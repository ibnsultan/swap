const badiliHerufiKubwa = require("../../../helperkazi/string_helpers/badiliHerufiKubwa.js");

describe("BadiliHerufiKubwa Test suite", () => {
    test("It should return uppercase version of string", () => {
        const array = ["sawa", ];
        expect(badiliHerufiKubwa(array)).toBe("SAWA");
    });

    test("It should fail to convert invalid string to upper case", () => {
        const array = [1, ];
        expect(() => badiliHerufiKubwa(array)).toThrow();
    });

    test("It should fail because helper function badiliHerufiKubwa expects an array as argument", () => {
        const array = 2;
        expect(() => badiliHerufiKubwa(array)).toThrow("system error");
    });
});
