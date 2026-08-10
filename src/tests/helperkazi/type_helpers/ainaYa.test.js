const ainaYa = require("../../../helperkazi/type_helpers/ainaYa.js");

describe("AinaYa Test suite", () => {
    test("It should identify a number", () => {
        expect(ainaYa([ 5, ])).toBe("namba");
    });

    test("It should identify a string", () => {
        expect(ainaYa([ "habari", ])).toBe("neno");
    });

    test("It should identify an array", () => {
        expect(ainaYa([ [ 1, 2, ], ])).toBe("orodha");
    });

    test("It should fail because ainaYa expects an array as argument", () => {
        expect(() => ainaYa(5)).toThrow("system error");
    });
});
