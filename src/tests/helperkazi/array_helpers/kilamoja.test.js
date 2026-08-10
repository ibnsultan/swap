const kilamoja = require("../../../helperkazi/array_helpers/kilamoja.js");

describe("Kilamoja Test suite", () => {
    test("It should call the given function once per element and return the array unchanged", () => {
        const kazi = {};
        const callSwapFunction = jest.fn();
        const orodha = [ 1, 2, 3, ];

        expect(kilamoja([ orodha, kazi, ], callSwapFunction)).toBe(orodha);
        expect(callSwapFunction).toHaveBeenCalledTimes(3);
        expect(callSwapFunction).toHaveBeenNthCalledWith(2, kazi, [ 2, ]);
    });

    test("It should fail when the first param is not an array", () => {
        expect(() => kilamoja([ "not an array", {}, ], jest.fn())).toThrow();
    });

    test("It should fail because kilamoja expects an array as argument", () => {
        expect(() => kilamoja(1, jest.fn())).toThrow("system error");
    });
});
