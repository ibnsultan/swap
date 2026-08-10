// Smallest of the given numbers, e.g. ndogo(3, 7, 2) -> 2
function ndogo (args) {
    if (Array.isArray(args)) {
        if (args.length && args.every((namba) => typeof namba === "number")) return Math.min(...args);

        throw new Error("system error: invalid param given to helper kazi ndogo");
    }

    throw new Error("system error");
}

module.exports = ndogo;
