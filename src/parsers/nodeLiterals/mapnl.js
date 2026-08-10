const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

// ramani(key: value, ...) literal, and mtu.key single-level property access -
// modeled on arraynl.js's dual literal/element-access shape. Map keys are
// restricted to bare identifiers (no string-literal or computed keys) in v1,
// and property access is single-level only (no mtu.anwani.mtaa chaining).
class MapNl extends BaseNode {
    getNode (mapNameToken) {
        return (!mapNameToken) ? MapNl.getParsedMapLiteral(this)
            : MapNl.getParsedMapElement(this, mapNameToken);
    }

    static getParsedMapLiteral (context) {
        context.skipKeyword(constants.KW.RAMANI);

        return {
            operation: constants.MAP,
            body: MapNl.getMapEntries(context),
        };
    }

    static getMapEntries (context) {
        const entries = []; let firstEntry = true;

        context.skipPunctuation(constants.SYM.L_BRACKET);
        while (context.isNotEndOfFile() && !context.isNextTokenPunctuation(constants.SYM.R_BRACKET)) {
            if (firstEntry) firstEntry = false; else context.skipPunctuation(constants.SYM.COMMA);
            if (context.isNextTokenPunctuation(constants.SYM.R_BRACKET)) break; // optional trailing comma

            const key = context.parseVarname();
            context.skipPunctuation(constants.SYM.COLON);
            entries.push({ key, valueNode: context.parseExpression(), });
        }
        context.skipPunctuation(constants.SYM.R_BRACKET);

        return entries;
    }

    static getParsedMapElement (context, mapNameToken) {
        context.skipPunctuation(constants.SYM.PERIOD);

        return {
            operation: constants.MAP_ELEM,
            name: mapNameToken.value,
            key: context.parseVarname(),
        };
    }
}

module.exports = new MapNl();
