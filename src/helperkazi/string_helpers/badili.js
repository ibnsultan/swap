/**
 * str_replace equivalent for Swap. Supports several replacement styles:
 *
 * - Simple:  badili(neno, kutafuta, badala)
 *            replaces the first occurrence of `kutafuta` in `neno`.
 *
 * - Multi:   badili(neno, [kutafuta1, kutafuta2, ...], [badala1, badala2, ...])
 *            replaces every occurrence of each `kutafuta[i]` with `badala[i]`.
 *            The two arrays must be the same length.
 *
 * - Global:  badili(neno, kutafuta, badala, "yote")
 *            replaces every occurrence of `kutafuta` in `neno`.
 *
 * - Regex:   badili(neno, mfumo, badala, "regex", bendera)
 *            treats `mfumo` as a regular expression pattern, with an
 *            optional `bendera` string of regex flags (e.g. "g", "gi").
 *
 * @param args receives (neno, kutafuta, badala, mtindo?, bendera?)
 * @returns string
 */
function badili (args) {
    if (!Array.isArray(args)) throw new Error("system error");

    const [ neno, kutafuta, badala, mtindo, bendera, ] = args;

    if (typeof neno !== "string") {
        throw new Error("system error: the first argument given to helper kazi badili must be a string");
    }

    if (Array.isArray(kutafuta) || Array.isArray(badala)) {
        return badiliMulti(neno, kutafuta, badala);
    }

    if (typeof kutafuta !== "string" || typeof badala !== "string") {
        throw new Error("system error: kutafuta and badala must be strings, or equal-length arrays of strings");
    }

    if (mtindo === undefined) return neno.replace(kutafuta, badala);
    if (mtindo === "yote") return neno.split(kutafuta).join(badala);
    if (mtindo === "regex") return badiliRegex(neno, kutafuta, badala, bendera);

    throw new Error(`system error: unknown replacement mode "${mtindo}" given to helper kazi badili`);
}

function badiliMulti (neno, kutafuta, badala) {
    if (!Array.isArray(kutafuta) || !Array.isArray(badala)) {
        throw new Error("system error: kutafuta and badala must both be arrays for multi replacement");
    }
    if (kutafuta.length !== badala.length) {
        throw new Error("system error: kutafuta and badala arrays must have the same length");
    }
    if (!kutafuta.every(s => typeof s === "string") || !badala.every(s => typeof s === "string")) {
        throw new Error("system error: kutafuta and badala arrays must contain only strings");
    }

    return kutafuta.reduce((result, target, i) => result.split(target).join(badala[i]), neno);
}

function badiliRegex (neno, mfumo, badala, bendera) {
    if (bendera !== undefined && typeof bendera !== "string") {
        throw new Error("system error: bendera (regex flags) given to helper kazi badili must be a string");
    }

    let pattern;
    try {
        pattern = new RegExp(mfumo, bendera || "");
    } catch (error) {
        throw new Error("system error: invalid regex pattern given to helper kazi badili");
    }

    return neno.replace(pattern, badala);
}

module.exports = badili;
