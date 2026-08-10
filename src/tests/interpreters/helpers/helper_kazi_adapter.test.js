const getFormattedReturnValue = require("../../../interpreters/helpers/helper_kazi_adapter.js");

describe("GetFormattedReturnValue test suite", () => {
    test("It should return the valid swap input - array", () => {
        expect(getFormattedReturnValue([])).toEqual([]);
    });

    test("It should return the valid swap input - string", () => {
        expect(getFormattedReturnValue("sawa")).toBe("sawa");
    });

    test("It should return the valid swap input - number", () => {
        expect(getFormattedReturnValue(3)).toBe(3);
    });

    test("It should return the valid swap input - boolean true", () => {
        expect(getFormattedReturnValue(true)).toBe("kweli");
    });

    test("It should return the valid swap input - boolean false", () => {
        expect(getFormattedReturnValue(false)).toBe("sikweli");
    });

    test("It should return the valid swap input - plain object (ramani/map)", () => {
        expect(getFormattedReturnValue({ jina: "Juma", })).toEqual({ jina: "Juma", });
    });

    test("It should throw an error when given an input that can't be formatted to a swap input", () => {
        expect(() => getFormattedReturnValue(null)).toThrow();
        expect(() => getFormattedReturnValue(undefined)).toThrow();
        expect(() => getFormattedReturnValue(() => {})).toThrow();
    });
});
