const constants = require("../../constants.js");

class ItaHelper {
    static isItaVariable (context, hifadhiName) {
        const itaList = context.environment().getHifadhi(context.getCurrentScope(), constants.KW.ITA);
        return itaList && itaList.includes(hifadhiName);
    }
}

module.exports = ItaHelper;
