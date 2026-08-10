// Round a number to the nearest integer
function zungusha (args) {
    if (Array.isArray(args)) {
        const [ namba, ] = args;
        if (typeof namba === "number") return Math.round(namba);

        throw new Error("system error: invalid param given to helper kazi zungusha");
    }

    throw new Error("system error");
}

module.exports = zungusha;
