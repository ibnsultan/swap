const gawa = require("../../../helperkazi/string_helpers/gawa.js");

describe("Gawa Test suite", () => {
    test("It should split a string using the given separator", () => {
        expect(gawa([ "moja,mbili,tatu", ",", ])).toEqual([ "moja", "mbili", "tatu", ]);
    });

    test("It should split into individual characters when no separator is given", () => {
        expect(gawa([ "abc", ])).toEqual([ "a", "b", "c", ]);
    });

    test("It should fail when given a non-string", () => {
        expect(() => gawa([ 5, ])).toThrow();
    });

    test("It should fail because gawa expects an array as argument", () => {
        expect(() => gawa("abc")).toThrow("system error");
    });
});
