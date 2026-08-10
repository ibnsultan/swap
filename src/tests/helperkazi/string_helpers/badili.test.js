const badili = require("../../../helperkazi/string_helpers/badili.js");

describe("Badili Test suite", () => {
    describe("simple replacement", () => {
        test("It should replace the first occurrence of a substring", () => {
            expect(badili(["Swahili ni nzuri sana", "nzuri", "tamu", ])).toBe("Swahili ni tamu sana");
        });

        test("It should only replace the first occurrence", () => {
            expect(badili(["nzuri nzuri nzuri", "nzuri", "tamu", ])).toBe("tamu nzuri nzuri");
        });
    });

    describe("multi replacement", () => {
        test("It should replace every pair of kutafuta/badala across the whole string", () => {
            expect(badili(["mbwa na paka", ["mbwa", "paka", ], ["ng'ombe", "kuku", ], ])).toBe("ng'ombe na kuku");
        });

        test("It should replace every occurrence of each kutafuta entry", () => {
            expect(badili(["a a b b", ["a", "b", ], ["x", "y", ], ])).toBe("x x y y");
        });

        test("It should fail if kutafuta and badala are not both arrays", () => {
            expect(() => badili(["neno", ["a", ], "b", ])).toThrow("system error");
        });

        test("It should fail if kutafuta and badala arrays have different lengths", () => {
            expect(() => badili(["neno", ["a", "b", ], ["x", ], ])).toThrow("system error");
        });

        test("It should fail if kutafuta or badala arrays contain non-string entries", () => {
            expect(() => badili(["neno", ["a", 1, ], ["x", "y", ], ])).toThrow("system error");
        });
    });

    describe("global (\"yote\") replacement", () => {
        test("It should replace all occurrences of a substring", () => {
            expect(badili(["nzuri nzuri nzuri", "nzuri", "tamu", "yote", ])).toBe("tamu tamu tamu");
        });
    });

    describe("regex replacement", () => {
        test("It should replace the first match by default", () => {
            expect(badili(["a1 b2 c3", "[0-9]", "#", "regex", ])).toBe("a# b2 c3");
        });

        test("It should replace every match when given the global flag", () => {
            expect(badili(["a1 b2 c3", "[0-9]", "#", "regex", "g", ])).toBe("a# b# c#");
        });

        test("It should support case-insensitive matching via flags", () => {
            expect(badili(["Nzuri nzuri", "nzuri", "tamu", "regex", "gi", ])).toBe("tamu tamu");
        });

        test("It should fail given an invalid regex pattern", () => {
            expect(() => badili(["neno", "(", "x", "regex", ])).toThrow("system error");
        });
    });

    test("It should fail with an unknown replacement mode", () => {
        expect(() => badili(["neno", "a", "b", "haijulikani", ])).toThrow("system error");
    });

    test("It should fail because the first argument must be a string", () => {
        expect(() => badili([1, "a", "b", ])).toThrow("system error");
    });

    test("It should fail because helper function badili expects an array as argument", () => {
        expect(() => badili(1)).toThrow("system error");
    });
});
