const kisia = require("../../../helperkazi/random_helpers/kisia.js");

describe("Kisia Test suite", () => {
    test("It should return a random number between 0 and 1", () => {
        for (let i = 1; i <= 5; i++) {
            expect(kisia([])).toBeGreaterThan(0);
            expect(kisia([])).toBeLessThan(1);
        }
    });

    test("It should return a random number between 1 and 2", () => {
        for (let i = 1; i <= 5; i++) {
            expect(kisia([1, 2])).toBeGreaterThan(1);
            expect(kisia([1, 2])).toBeLessThan(2);
        }
    });

    test("It should return a random number between 0 and 7", () => {
        for (let i = 1; i <= 5; i++) {
            expect(kisia([7])).toBeGreaterThan(0);
            expect(kisia([7])).toBeLessThan(7);
        }
    });
});
