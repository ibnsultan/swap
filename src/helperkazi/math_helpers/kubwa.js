// Largest of the given numbers, e.g. kubwa(3, 7, 2) -> 7
function kubwa (args) {
    if (Array.isArray(args)) {
        if (args.length && args.every((namba) => typeof namba === "number")) return Math.max(...args);

        throw new Error("system error: invalid param given to helper kazi kubwa");
    }

    throw new Error("system error");
}

module.exports = kubwa;
