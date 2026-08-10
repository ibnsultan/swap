const constants = require("../../constants.js");

const variableNlTypes = {};
variableNlTypes[constants.SYM.L_BRACKET] = require("./callKaziNl.js"); // when current variable is a function call
variableNlTypes[constants.SYM.L_SQ_BRACKET] = require("./arraynl.js"); // when current variable is an array element
variableNlTypes[constants.SYM.PERIOD] = require("./mapnl.js"); // when current variable is a ramani (map) property access

module.exports = variableNlTypes;
