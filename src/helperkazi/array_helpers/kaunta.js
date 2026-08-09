// Get array length
function kaunta (args) {
    if (Array.isArray(args)) {
        const [ param, ] = args;
        if (Array.isArray(param)) return param.length;

        throw new Error("Invalid param given to helper kazi kaunta.");
    }

    throw new Error("system error");
}

module.exports = kaunta;
