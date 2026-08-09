const tafuta = require("../../../helperkazi/string_helpers/tafuta.js");

describe("Tafuta Test Suite", () => {
    test("It should return the boolean if the parent string contains the substring", ()=> {
        const jina = "Swahili ni nzuri sana";
        expect(tafuta([jina, "nzuri"])).toBe(true);
    });

    test("It should fail because helper function tafuta takes only 2 strings", ()=> {
        expect(()=> tafuta(["swahili ni nzuri", 47])).toThrow();
    });

    test("It should fail because helper function tafuta expects an array as argument", () => {
        expect(() => tafuta(1)).toThrow("system error");
    });

});
