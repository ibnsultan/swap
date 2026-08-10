// Split a string into an array. If no separator is given, splits into
// individual characters, e.g. gawa("moja,mbili", ",") -> ["moja", "mbili"]
function gawa (args) {
    if (Array.isArray(args)) {
        const [ neno, kitenganishi, ] = args;
        if (typeof neno === "string") return neno.split(typeof kitenganishi === "string" ? kitenganishi : "");

        throw new Error("system error: invalid param given to helper kazi gawa");
    }

    throw new Error("system error");
}

module.exports = gawa;
