/**
 * @param args receives two strings parent string and the substring
 * @returns boolean
 */
function tafuta (args) {
    if (Array.isArray(args)) {
        const [ parentString, subString, ] = args;
        if ((typeof parentString === "string") && (typeof subString === "string")) {
            return parentString.includes(subString);
        }
        throw new Error("system error: arguments should be two strings");
    }
    throw new Error("system error");
}
module.exports = tafuta;
