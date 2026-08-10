/**
 * Pad a string to a target length.
 * @param neno the string to pad
 * @param urefu target length
 * @param tabia the character to pad with
 * @param mahali optional - "mwisho" pads at the end, anything else (default) pads at the start
 */
function jaza (args) {
    if (Array.isArray(args)) {
        const [ neno, urefu, tabia, mahali, ] = args;
        if (typeof neno === "string" && typeof urefu === "number" && typeof tabia === "string") {
            return mahali === "mwisho" ? neno.padEnd(urefu, tabia) : neno.padStart(urefu, tabia);
        }

        throw new Error("system error: invalid param given to helper kazi jaza");
    }

    throw new Error("system error");
}

module.exports = jaza;
