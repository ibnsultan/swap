jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const InputStream = require("../inputstream.js");
const constants = require("../constants.js");

describe("InputStream Tests", () => {
    let inputStream;

    beforeEach(() => {
        inputStream = new InputStream();
    });

    test("Peek - It should peek at the next character without discarding it from the stream", () => {
        inputStream.code = "tí";
        expect(inputStream.peek()).toBe("t");
        expect(inputStream.next()).toBe("t");
    });

    test("Next - It should read in the next character and discard it from the stream", () => {
        inputStream.code = "tí";

        expect(inputStream.next()).toBe("t");
        expect(inputStream.peek()).toBe("í");
    });

    test("ThrowError - It should throw an error message while specifying the location of the error accurately", () => {
        inputStream.code = `${constants.SYM.NEW_LINE}`;
        inputStream.next(); // read in the new line character
        const errorMsg = "Testing error msg";

        expect(() => {
            inputStream.throwError(errorMsg);
        }).toThrow();
    });

    test("peekNext - it should look one character further ahead than peek without discarding anything", () => {
        inputStream.code = "ab";

        expect(inputStream.peekNext()).toBe("b");
        expect(inputStream.peek()).toBe("a"); // unaffected
        expect(inputStream.next()).toBe("a");
    });

    test("peekNext - it should return an empty string past the end of the stream", () => {
        inputStream.code = "a";

        expect(inputStream.peekNext()).toBe("");
    });

    test("isNotEndOfFile - It should confirm that the inputstream has not read in the last char in the file", () => {
        inputStream.code = "tí";

        expect(inputStream.isNotEndOfFile()).toBe(true);
    });

    test("isEndOfFile - It should confirm that the inputstream has read in the last char in the file", () => {
        inputStream.code = "";

        expect(inputStream.isEndOfFile()).toBe(true);
    });

    test("normalizeLineEndings - it should convert CRLF (Windows) line endings to LF", () => {
        expect(inputStream.normalizeLineEndings("hifadhi a = 1;\r\nandika a;\r\n"))
            .toBe("hifadhi a = 1;\nandika a;\n");
    });

    test("normalizeLineEndings - it should convert legacy CR (old Mac) line endings to LF", () => {
        expect(inputStream.normalizeLineEndings("hifadhi a = 1;\randika a;\r"))
            .toBe("hifadhi a = 1;\nandika a;\n");
    });

    test("normalizeLineEndings - it should leave LF (Unix) line endings unchanged", () => {
        expect(inputStream.normalizeLineEndings("hifadhi a = 1;\nandika a;\n"))
            .toBe("hifadhi a = 1;\nandika a;\n");
    });

    test("normalizeLineEndings - it should return non-string values as-is", () => {
        expect(inputStream.normalizeLineEndings(undefined)).toBe(undefined);
    });

    test("rawSource option - it should use in-memory source text instead of reading a file", () => {
        const fs = require("fs");
        fs.readFileSync.mockClear();
        const replStream = new InputStream(null, { rawSource: "andika 1;\r\n", displayName: "<repl>", });

        expect(fs.readFileSync).not.toHaveBeenCalled();
        expect(replStream.code).toBe("andika 1;\n");
        expect(replStream.fileName).toBe("<repl>");
    });

    test("rawSource option - it should default the display name to <repl> when none is given", () => {
        const replStream = new InputStream(null, { rawSource: "andika 1;", });

        expect(replStream.fileName).toBe("<repl>");
    });
});
