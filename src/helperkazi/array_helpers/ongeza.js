// Push a value onto the end of an array (mutates it in place) and return the array
function ongeza (args) {
    if (Array.isArray(args)) {
        const [ orodha, thamani, ] = args;
        if (Array.isArray(orodha)) {
            orodha.push(thamani);
            return orodha;
        }

        throw new Error("system error: invalid param given to helper kazi ongeza");
    }

    throw new Error("system error");
}

module.exports = ongeza;
