// Return the Swap type name of a value: "namba" (number), "neno" (string) or
// "orodha" (array). NOTE: kweli/sikweli (boolean) values are represented
// internally as plain strings identical to any other string, so ainaYa
// cannot currently distinguish a boolean from a regular string - it reports
// "neno" for both. Distinguishing them would need a dedicated boolean type.
function ainaYa (args) {
    if (Array.isArray(args)) {
        const [ thamani, ] = args;
        if (Array.isArray(thamani)) return "orodha";
        if (typeof thamani === "number") return "namba";
        if (typeof thamani === "string") return "neno";

        throw new Error("system error: unsupported value given to helper kazi ainaYa");
    }

    throw new Error("system error");
}

module.exports = ainaYa;
