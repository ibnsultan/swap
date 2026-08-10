// Trim leading/trailing whitespace from a string
function pogoa (args) {
    if (Array.isArray(args)) {
        const [ neno, ] = args;
        if (typeof neno === "string") return neno.trim();

        throw new Error("system error: invalid param given to helper kazi pogoa");
    }

    throw new Error("system error");
}

module.exports = pogoa;
