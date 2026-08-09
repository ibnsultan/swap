const mda = require("../../../helperkazi/datetime_helpers/mda.js");

describe("Mda Test suite", () => {
    test("It should return current date", () => {
        const date = new Date();
        const mdaList = mda([]);
        expect(mdaList[0]).toBe(date.getFullYear());
        expect(mdaList[1]).toBe(date.getMonth() + 1)
        expect(mdaList[2]).toBe(date.getDate())
        expect(mdaList[3]).toBe(date.getHours())
        expect(mdaList[4]).toBe(date.getMinutes())
        expect(mdaList[5]).toBe(date.getSeconds())
    });

    test("It should return year, month and day", () => {
        const date = new Date(2017, 11, 30);
        const mdaList = mda([2017, 11, 30]);
        expect(mdaList[0]).toBe(date.getFullYear());
        expect(mdaList[1]).toBe(date.getMonth())
        expect(mdaList[2]).toBe(date.getDate())
        expect(mdaList[3]).toBe(date.getHours())
        expect(mdaList[4]).toBe(date.getMinutes())
        expect(mdaList[5]).toBe(date.getSeconds())
    });

    test("It should return hour, minutes, seconds, and milliseconds", () => {
        const date = new Date(2017, 11, 30, 9, 15, 15, 150);
        const mdaList = mda([2017, 11, 30, 9, 15, 15, 150]);
        expect(mdaList[0]).toBe(date.getFullYear());
        expect(mdaList[1]).toBe(date.getMonth())
        expect(mdaList[2]).toBe(date.getDate())
        expect(mdaList[3]).toBe(date.getHours())
        expect(mdaList[4]).toBe(date.getMinutes())
        expect(mdaList[5]).toBe(date.getSeconds())
        expect(mdaList[6]).toBe(date.getMilliseconds())
    });

    test("It should fail to return date because the swap system fails to pass it an array as parameter", () => {
        expect(() => mda()).toThrow();
    });

    describe('Array as First Argument', () => {
        test("It should return current date", () => {
            const date = new Date();
            const mdaList = mda([[]]);
            expect(mdaList[0]).toBe(date.getFullYear());
            expect(mdaList[1]).toBe(date.getMonth() + 1)
            expect(mdaList[2]).toBe(date.getDate())
            expect(mdaList[3]).toBe(date.getHours())
            expect(mdaList[4]).toBe(date.getMinutes())
            expect(mdaList[5]).toBe(date.getSeconds())
        });

        test("It should return year, month and day", () => {
            const date = new Date(2017, 11, 30);
            const mdaList = mda([[2017, 11, 30]]);
            expect(mdaList[0]).toBe(date.getFullYear());
            expect(mdaList[1]).toBe(date.getMonth())
            expect(mdaList[2]).toBe(date.getDate())
            expect(mdaList[3]).toBe(date.getHours())
            expect(mdaList[4]).toBe(date.getMinutes())
            expect(mdaList[5]).toBe(date.getSeconds())
        });

        test("It should return hour, minutes, seconds, and milliseconds", () => {
            const date = new Date(2017, 11, 30, 9, 15, 15, 150);
            const mdaList = mda([[2017, 11, 30, 9, 15, 15, 150]]);
            expect(mdaList[0]).toBe(date.getFullYear());
            expect(mdaList[1]).toBe(date.getMonth())
            expect(mdaList[2]).toBe(date.getDate())
            expect(mdaList[3]).toBe(date.getHours())
            expect(mdaList[4]).toBe(date.getMinutes())
            expect(mdaList[5]).toBe(date.getSeconds())
            expect(mdaList[6]).toBe(date.getMilliseconds())
        });
    })
});
