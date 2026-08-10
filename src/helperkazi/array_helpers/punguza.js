// Reduce: fold the array down to a single value via
// kazi(jumla, kipengele), starting from the required initial value awali,
// e.g. punguza([1,2,3,4], njia(jumla,x){ rejesha jumla+x; }, 0) -> 10
function punguza (args, callSwapFunction) {
    if (Array.isArray(args)) {
        const [ orodha, kazi, awali, ] = args;
        if (Array.isArray(orodha) && typeof callSwapFunction === "function" && awali !== undefined) {
            return orodha.reduce((jumla, kipengele) => callSwapFunction(kazi, [ jumla, kipengele, ]), awali);
        }

        throw new Error("system error: invalid param given to helper kazi punguza");
    }

    throw new Error("system error");
}

module.exports = punguza;
