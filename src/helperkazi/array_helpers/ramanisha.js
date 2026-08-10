// Map: build a new array by calling kazi(kipengele) for every element,
// e.g. ramanisha([1,2,3], njia(x){ rejesha x*2; }) -> [2,4,6]
function ramanisha (args, callSwapFunction) {
    if (Array.isArray(args)) {
        const [ orodha, kazi, ] = args;
        if (Array.isArray(orodha) && typeof callSwapFunction === "function") {
            return orodha.map((kipengele) => callSwapFunction(kazi, [ kipengele, ]));
        }

        throw new Error("system error: invalid param given to helper kazi ramanisha");
    }

    throw new Error("system error");
}

module.exports = ramanisha;
