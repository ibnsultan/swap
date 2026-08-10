// Parse a JSON string into a number/string/array/ramani value, e.g.
// kutokaJson('{"jina":"Juma"}') -> ramani(jina: "Juma")
// NOTE: a top-level JSON true/false/null has no direct Swap equivalent
// (kweli/sikweli are represented as plain strings, and there is no "null"
// value) and is rejected rather than silently misrepresented.
function kutokaJson (args) {
    if (Array.isArray(args)) {
        const [ maandishi, ] = args;
        if (typeof maandishi === "string") {
            let value;
            try {
                value = JSON.parse(maandishi);
            } catch (e) {
                throw new Error("system error: invalid JSON string given to helper kazi kutokaJson");
            }

            if (typeof value === "number" || typeof value === "string" || Array.isArray(value) ||
                (typeof value === "object" && value !== null)) {
                return value;
            }
        }

        throw new Error("system error: invalid param given to helper kazi kutokaJson");
    }

    throw new Error("system error");
}

module.exports = kutokaJson;
