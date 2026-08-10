// Convert String to upper case
function herufiKubwa (args) {
    if (Array.isArray(args)) {
        const [ param, ] = args;
        if (typeof param === "string") return param.toUpperCase();

        throw new Error("Invalid param given to helper kazi herufiKubwa.");
    }

    throw new Error("system error");
}

module.exports = herufiKubwa;
