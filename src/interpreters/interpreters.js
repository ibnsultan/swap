const constants = require("../constants.js");

const interpreters = {};
interpreters[constants.SYM.PLUS] = require("./inodeplus.js");
interpreters[constants.SYM.MINUS] = require("./inodeminus.js");
interpreters[constants.SYM.DIVIDE] = require("./inodedivide.js");
interpreters[constants.SYM.MULTIPLY] = require("./inodemultiply.js");
interpreters[constants.SYM.REMAINDER] = require("./inoderemainder.js");
interpreters[constants.SYM.ASSIGN] = require("./inodehifadhi.js");
interpreters[constants.SYM.EQ] = require("./inodeequals.js");
interpreters[constants.SYM.G_THAN] = require("./inodegthan.js");
interpreters[constants.SYM.OR] = require("./inodeor.js");
interpreters[constants.SYM.AND] = require("./inodeand.js");
interpreters[constants.SYM.L_THAN] = require("./inodelthan.js");
interpreters[constants.SYM.G_THAN_OR_EQ] = require("./inodegthanoreq.js");
interpreters[constants.SYM.L_THAN_OR_EQ] = require("./inodelthanoreq.js");
interpreters[constants.SYM.NOT_EQ] = require("./inodenoteq.js");
interpreters[constants.SYM.EXCLAMATION_POINT] = require("./inodenotoperator.js");

interpreters[constants.KW.ANDIKA] = require("./inodeandika.js");
interpreters[constants.KW.KAMA] = require("./inodekama.js");
interpreters[constants.KW.WAKATI] = require("./inodewakati.js");
interpreters[constants.KW.VUNJA] = require("./inodevunja.js");
interpreters[constants.KW.HAKIKA] = require("./inodehakika.js");
interpreters[constants.KW.CHAGUA] = require("./inodechagua.js");
interpreters[constants.KW.NJIA] = require("./inodekazi.js");
interpreters[constants.KW.REJESHA] = require("./inoderejesha.js");
interpreters[constants.KW.LETE] = require("./inodelete.js");
interpreters[constants.KW.ITA] = require("./inodeita.js");

interpreters[constants.CALL_KAZI] = require("./inodecallkazi.js");
interpreters[constants.GET_HIFADHI] = require("./inodegethifadhi.js");
interpreters[constants.ARRAY] = require("./inodearray.js");
interpreters[constants.ARRAY_ELEM] = require("./inodearrayelem.js");
interpreters[constants.NEGATE_EXPRESSION] = require("./inodenegateexpression.js");

module.exports = interpreters;
