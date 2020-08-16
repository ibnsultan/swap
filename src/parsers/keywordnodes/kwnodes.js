const constants = require("../../constants.js");

const KwNodes = {};
KwNodes[constants.KW.HIFADHI] = require("./kwnodejeki.js");
KwNodes[constants.KW.ANDIKA] = require("./kwnodesope.js");
KwNodes[constants.KW.KAMA] = require("./kwnodese");
KwNodes[constants.KW.WAKATI] = require("./kwnodenigbati.js");
KwNodes[constants.KW.HAKIKA] = require("./kwnodefun.js");
KwNodes[constants.KW.PADA] = require("./kwnodepada.js");
KwNodes[constants.KW.VUNJA] = require("./kwnodekuro.js");
KwNodes[constants.KW.KAZI] = require("./kwnodeise.js");
KwNodes[constants.KW.BAD] = require("./kwnodeyi.js");
KwNodes[constants.KW.LETE] = require("./kwnodegbewole.js");
KwNodes[constants.KW.ITA] = require("./kwnodewoke.js");

module.exports = KwNodes;
