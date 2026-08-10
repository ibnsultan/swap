// Square root (mzizi = root), e.g. mzizi(9) -> 3
function mzizi (args) {
    if (Array.isArray(args)) {
        const [ namba, ] = args;
        if (typeof namba === "number" && namba >= 0) return Math.sqrt(namba);

        throw new Error("system error: invalid param given to helper kazi mzizi");
    }

    throw new Error("system error");
}

module.exports = mzizi;
