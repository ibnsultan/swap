const badiliHerufiNdogo = require("../../../helperkazi/string_helpers/badiliHerufiNdogo.js");

describe("BadiliHerufiNdogo Test suite", () => {
    test("It should return lowercase version of string", () => {
        const array = ["SAWA", ];
        expect(badiliHerufiNdogo(array)).toBe("sawa");
    });

    test("It should fail to convert invalid string to lowercase", () => {
        const array = [1, ];
        expect(() => badiliHerufiNdogo(array)).toThrow();
    });

    test("It should fail because helper function badiliHerufiNdogo expects an array as argument", () => {
        const array = 2;
        expect(() => badiliHerufiNdogo(array)).toThrow("system error");
    });
});
