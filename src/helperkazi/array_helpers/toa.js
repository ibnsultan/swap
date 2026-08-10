// Remove and return the last element of an array (mutates it in place)
function toa (args) {
    if (Array.isArray(args)) {
        const [ orodha, ] = args;
        if (Array.isArray(orodha)) {
            if (orodha.length === 0) throw new Error("system error: cannot use helper kazi toa on an empty array");
            return orodha.pop();
        }

        throw new Error("system error: invalid param given to helper kazi toa");
    }

    throw new Error("system error");
}

module.exports = toa;
