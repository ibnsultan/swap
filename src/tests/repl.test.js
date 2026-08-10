jest.mock("readline-sync", () => ({
    question: jest.fn(),
}));

const readlineSync = require("readline-sync");
const repl = require("../repl.js");

describe("Repl test suite", () => {
    beforeEach(() => {
        global.console.log = jest.fn();
        global.console.error = jest.fn();
        readlineSync.question.mockReset();
    });

    test("it should execute a single-line statement and exit on 'toka;'", () => {
        readlineSync.question
            .mockReturnValueOnce("andika 1 + 2;")
            .mockReturnValueOnce("toka;");

        repl.start();

        expect(global.console.log).toHaveBeenCalledWith(3);
    });

    test("state should persist across separate lines within the same session", () => {
        readlineSync.question
            .mockReturnValueOnce("hifadhi x = 5;")
            .mockReturnValueOnce("andika x + 10;")
            .mockReturnValueOnce("toka;");

        repl.start();

        expect(global.console.log).toHaveBeenCalledWith(15);
    });

    test("a block spanning multiple lines should only run once fully buffered", () => {
        readlineSync.question
            .mockReturnValueOnce("hifadhi i = 0;")
            .mockReturnValueOnce("wakati (i < 3) {")
            .mockReturnValueOnce("andika i;")
            .mockReturnValueOnce("hifadhi i = i + 1;")
            .mockReturnValueOnce("}")
            .mockReturnValueOnce("toka;");

        repl.start();

        expect(global.console.log).toHaveBeenCalledWith(0);
        expect(global.console.log).toHaveBeenCalledWith(1);
        expect(global.console.log).toHaveBeenCalledWith(2);
    });

    test("a runtime error in one line should be reported without ending the session", () => {
        readlineSync.question
            .mockReturnValueOnce("andika 10 / 0;")
            .mockReturnValueOnce("andika 42;")
            .mockReturnValueOnce("toka;");

        repl.start();

        expect(global.console.error).toHaveBeenCalledWith(expect.stringContaining("cannot divide by zero"));
        expect(global.console.log).toHaveBeenCalledWith(42);
    });

    test("it should stop reading once readlineSync throws (EOF/interrupt)", () => {
        readlineSync.question.mockImplementationOnce(() => {
            throw new Error("EOF");
        });

        repl.start();

        expect(readlineSync.question).toHaveBeenCalledTimes(1);
    });
});

describe("Repl#getBracketDepth", () => {
    test("it should count unclosed brackets, ignoring string contents and comments", () => {
        expect(repl.getBracketDepth("wakati (i < 3) {")).toBe(1);
        expect(repl.getBracketDepth("wakati (i < 3) {}")).toBe(0);
        expect(repl.getBracketDepth('andika "{ not a block }";')).toBe(0);
        expect(repl.getBracketDepth("# a comment with a { in it\nandika 1;")).toBe(0);
    });
});
