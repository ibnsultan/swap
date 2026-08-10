const ramanisha = require("../../../helperkazi/array_helpers/ramanisha.js");

describe("Ramanisha Test suite", () => {
    test("It should build a new array from calling the given function on each element", () => {
        const kazi = {};
        const callSwapFunction = jest.fn((k, [ x, ]) => x * 2);

        expect(ramanisha([ [ 1, 2, 3, ], kazi, ], callSwapFunction)).toEqual([ 2, 4, 6, ]);
        expect(callSwapFunction).toHaveBeenCalledTimes(3);
        expect(callSwapFunction).toHaveBeenCalledWith(kazi, [ 1, ]);
    });

    test("It should fail when the first param is not an array", () => {
        expect(() => ramanisha([ "not an array", {}, ], jest.fn())).toThrow();
    });

    test("It should fail because ramanisha expects an array as argument", () => {
        expect(() => ramanisha(1, jest.fn())).toThrow("system error");
    });
});
