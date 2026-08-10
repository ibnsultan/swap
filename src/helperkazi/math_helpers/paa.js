// Round a number up to the nearest integer (ceiling)
function paa (args) {
    if (Array.isArray(args)) {
        const [ namba, ] = args;
        if (typeof namba === "number") return Math.ceil(namba);

        throw new Error("system error: invalid param given to helper kazi paa");
    }

    throw new Error("system error");
}

module.exports = paa;
