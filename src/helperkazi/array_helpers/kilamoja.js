// forEach: call kazi(kipengele) once per element, for side effects (e.g.
// andika inside kazi). Returns the original array unchanged.
function kilamoja (args, callSwapFunction) {
    if (Array.isArray(args)) {
        const [ orodha, kazi, ] = args;
        if (Array.isArray(orodha) && typeof callSwapFunction === "function") {
            orodha.forEach((kipengele) => callSwapFunction(kazi, [ kipengele, ]));
            return orodha;
        }

        throw new Error("system error: invalid param given to helper kazi kilamoja");
    }

    throw new Error("system error");
}

module.exports = kilamoja;
