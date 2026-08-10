const constants = require("../../constants.js");

const KwNodes = {};
KwNodes[constants.KW.HIFADHI] = require("./kwnodehifadhi.js");
KwNodes[constants.KW.ANDIKA] = require("./kwnodeandika.js");
KwNodes[constants.KW.KAMA] = require("./kwnodekama");
KwNodes[constants.KW.WAKATI] = require("./kwnodewakati.js");
KwNodes[constants.KW.HAKIKA] = require("./kwnodehakika.js");
KwNodes[constants.KW.REJESHA] = require("./kwnoderejesha.js");
KwNodes[constants.KW.VUNJA] = require("./kwnodevunja.js");
KwNodes[constants.KW.NJIA] = require("./kwnodekazi.js");
KwNodes[constants.KW.CHAGUA] = require("./kwnodechagua.js");
KwNodes[constants.KW.LETE] = require("./kwnodelete.js");
KwNodes[constants.KW.ITA] = require("./kwnodeita.js");
KwNodes[constants.KW.JARIBU] = require("./kwnodejaribu.js");

module.exports = KwNodes;
