const punguza = require("../../../helperkazi/array_helpers/punguza.js");

describe("Punguza Test suite", () => {
    test("It should fold the array down to a single value starting from awali", () => {
        const kazi = {};
        const callSwapFunction = jest.fn((k, [ jumla, x, ]) => jumla + x);

        expect(punguza([ [ 1, 2, 3, 4, ], kazi, 0, ], callSwapFunction)).toBe(10);
        expect(callSwapFunction).toHaveBeenCalledWith(kazi, [ 0, 1, ]);
    });

    test("It should use awali even when the array is empty", () => {
        expect(punguza([ [], {}, 42, ], jest.fn())).toBe(42);
    });

    test("It should fail when awali is not given", () => {
        expect(() => punguza([ [ 1, 2, ], {}, ], jest.fn())).toThrow();
    });

    test("It should fail because punguza expects an array as argument", () => {
        expect(() => punguza(1, jest.fn())).toThrow("system error");
    });
});
