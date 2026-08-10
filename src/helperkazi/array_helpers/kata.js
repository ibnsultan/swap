// Return a shallow slice of an array, e.g. kata([1,2,3,4,5], 1, 3) -> [2,3]
// (does not mutate the original array)
function kata (args) {
    if (Array.isArray(args)) {
        const [ orodha, mwanzo, mwisho, ] = args;
        if (Array.isArray(orodha) && typeof mwanzo === "number") {
            return typeof mwisho === "number" ? orodha.slice(mwanzo, mwisho) : orodha.slice(mwanzo);
        }

        throw new Error("system error: invalid param given to helper kazi kata");
    }

    throw new Error("system error");
}

module.exports = kata;
