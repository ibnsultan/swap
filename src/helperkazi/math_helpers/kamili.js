// Absolute value (thamani kamili) of a number
function kamili (args) {
    if (Array.isArray(args)) {
        const [ namba, ] = args;
        if (typeof namba === "number") return Math.abs(namba);

        throw new Error("system error: invalid param given to helper kazi kamili");
    }

    throw new Error("system error");
}

module.exports = kamili;
