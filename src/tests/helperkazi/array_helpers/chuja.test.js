const constants = require("../../../constants.js");
const chuja = require("../../../helperkazi/array_helpers/chuja.js");

describe("Chuja Test suite", () => {
    test("It should keep only elements where the given function is truthy", () => {
        const kazi = {};
        const callSwapFunction = jest.fn((k, [ x, ]) => (x > 2 ? constants.KW.KWELI : constants.KW.SIKWELI));

        expect(chuja([ [ 1, 2, 3, 4, ], kazi, ], callSwapFunction)).toEqual([ 3, 4, ]);
    });

    test("It should treat any value other than sikweli as truthy", () => {
        const callSwapFunction = jest.fn(() => 5); // a non-boolean-shaped truthy return

        expect(chuja([ [ 1, 2, ], {}, ], callSwapFunction)).toEqual([ 1, 2, ]);
    });

    test("It should fail when the first param is not an array", () => {
        expect(() => chuja([ "not an array", {}, ], jest.fn())).toThrow();
    });

    test("It should fail because chuja expects an array as argument", () => {
        expect(() => chuja(1, jest.fn())).toThrow("system error");
    });
});
