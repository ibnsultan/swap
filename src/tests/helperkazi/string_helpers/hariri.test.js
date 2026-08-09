const hariri = require("../../../helperkazi/string_helpers/hariri.js");

describe("Hariri Test Suite", () => {
    test("It should return a new string", ()=> {
        const jina = "Swahili ni nzuri sana";
        expect(hariri([jina, "nzuri", "tamu"])).toBe("Swahili ni tamu sana");
    });

    test("It should fail because helper function takes only 3 strings", ()=> {
        expect(()=> hariri(["swahili ni nzuri", 47, 56])).toThrow();
    });

    test("It should fail because helper function hariri expects an array as argument", () => {
        expect(() => hariri(1)).toThrow("system error");
    });

});
