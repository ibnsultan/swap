const kubwa = require("../../../helperkazi/math_helpers/kubwa.js");

describe("Kubwa Test suite", () => {
    test("It should return the largest of the given numbers", () => {
        expect(kubwa([ 3, 7, 2, ])).toBe(7);
    });

    test("It should fail when given a non-number", () => {
        expect(() => kubwa([ 3, "7", 2, ])).toThrow();
    });

    test("It should fail because kubwa expects an array as argument", () => {
        expect(() => kubwa(3)).toThrow("system error");
    });
});
