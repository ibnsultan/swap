// Join array elements into a single string, e.g. unganisha([1,2,3], "-") -> "1-2-3"
function unganisha (args) {
    if (Array.isArray(args)) {
        const [ orodha, kitenganishi, ] = args;
        if (Array.isArray(orodha)) return orodha.join(typeof kitenganishi === "string" ? kitenganishi : ",");

        throw new Error("system error: invalid param given to helper kazi unganisha");
    }

    throw new Error("system error");
}

module.exports = unganisha;
