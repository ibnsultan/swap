const constants = require("../../constants.js");

// Filter: keep elements where kazi(kipengele) is truthy (anything other
// than sikweli, matching kama/wakati's own truthiness rule), e.g.
// chuja([1,2,3,4], njia(x){ rejesha x > 2; }) -> [3,4]
function chuja (args, callSwapFunction) {
    if (Array.isArray(args)) {
        const [ orodha, kazi, ] = args;
        if (Array.isArray(orodha) && typeof callSwapFunction === "function") {
            return orodha.filter((kipengele) => callSwapFunction(kazi, [ kipengele, ]) !== constants.KW.SIKWELI);
        }

        throw new Error("system error: invalid param given to helper kazi chuja");
    }

    throw new Error("system error");
}

module.exports = chuja;
