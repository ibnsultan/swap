// Round a number down to the nearest integer (floor)
function sakafu (args) {
    if (Array.isArray(args)) {
        const [ namba, ] = args;
        if (typeof namba === "number") return Math.floor(namba);

        throw new Error("system error: invalid param given to helper kazi sakafu");
    }

    throw new Error("system error");
}

module.exports = sakafu;
