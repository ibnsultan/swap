// Sort an array in place (ascending) and return it. Numbers sort numerically,
// anything else sorts as text.
function panga (args) {
    if (Array.isArray(args)) {
        const [ orodha, ] = args;
        if (Array.isArray(orodha)) {
            const isAllNumbers = orodha.every((kipengele) => typeof kipengele === "number");
            orodha.sort(isAllNumbers ? (a, b) => a - b : (a, b) => String(a).localeCompare(String(b)));
            return orodha;
        }

        throw new Error("system error: invalid param given to helper kazi panga");
    }

    throw new Error("system error");
}

module.exports = panga;
