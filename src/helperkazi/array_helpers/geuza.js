// Reverse an array in place and return it
function geuza (args) {
    if (Array.isArray(args)) {
        const [ orodha, ] = args;
        if (Array.isArray(orodha)) return orodha.reverse();

        throw new Error("system error: invalid param given to helper kazi geuza");
    }

    throw new Error("system error");
}

module.exports = geuza;
