// Convert String to lower case
function herufiNdogo (args) {
    if (Array.isArray(args)) {
        const [ param, ] = args;
        if (typeof param === "string") return param.toLowerCase();

        throw new Error("Invalid param given to helper kazi herufiNdogo.");
    }

    throw new Error("system error");
}

module.exports = herufiNdogo;
