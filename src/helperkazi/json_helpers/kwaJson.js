// Serialize a number/string/array/ramani value to a JSON string, e.g.
// kwaJson([1,2,3]) -> "[1,2,3]"
function kwaJson (args) {
    if (Array.isArray(args)) {
        const [ thamani, ] = args;
        if (typeof thamani === "number" || typeof thamani === "string" ||
            (typeof thamani === "object" && thamani !== null)) { // covers both arrays and ramani (map) objects
            return JSON.stringify(thamani);
        }

        throw new Error("system error: unsupported value given to helper kazi kwaJson");
    }

    throw new Error("system error");
}

module.exports = kwaJson;
