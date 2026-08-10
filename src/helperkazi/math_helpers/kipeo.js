// Power (kipeo = exponent), e.g. kipeo(2, 10) -> 1024
function kipeo (args) {
    if (Array.isArray(args)) {
        const [ msingi, kiwango, ] = args;
        if (typeof msingi === "number" && typeof kiwango === "number") return Math.pow(msingi, kiwango);

        throw new Error("system error: invalid param given to helper kazi kipeo");
    }

    throw new Error("system error");
}

module.exports = kipeo;
