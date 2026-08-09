jest.mock("readline-sync", () => ({
    question: jest.fn(),
}));

const readlineSync = require("readline-sync");
const dai = require("../../../helperkazi/input_output/dai.js");

describe("Dai Test suite", () => {
    test("It should read user input as string", () => {
        readlineSync.question.mockReturnValueOnce("sawa");

        const array = ["What is your name?", ];
        expect(dai(array)).toBe("sawa");
    });

    test("It should read user input as number", () => {
        readlineSync.question.mockReturnValueOnce("2");

        const array = ["What is your age?", ];
        expect(dai(array)).toBe(2);
    });

    test("It should fail to read user input", () => {
        const array = [1, ];
        expect(() => dai(array)).toThrow();
    });

    test("It should fail because helper function dai expects an array as argument", () => {
        const array = 2;
        expect(() => dai(array)).toThrow("system error");
    });
});
