const unganisha = require("../../../helperkazi/array_helpers/unganisha.js");

describe("Unganisha Test suite", () => {
    test("It should join array elements using the given separator", () => {
        expect(unganisha([ [ 1, 2, 3, ], "-", ])).toBe("1-2-3");
    });

    test("It should default to a comma separator when none is given", () => {
        expect(unganisha([ [ "moja", "mbili", ], ])).toBe("moja,mbili");
    });

    test("It should fail because unganisha expects an array as its first param", () => {
        expect(() => unganisha([ "not an array", "-", ])).toThrow();
    });

    test("It should fail because unganisha expects an array as argument", () => {
        expect(() => unganisha(1)).toThrow("system error");
    });
});
