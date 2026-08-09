const constants = require("../../constants.js");

function getFormattedReturnValue (returnedValue) {
    switch (typeof returnedValue) {
    case "string":
    case "number": return returnedValue;
    case "boolean": return (returnedValue) ? constants.KW.KWELI : constants.KW.SIKWELI;
    case "object": if (Array.isArray(returnedValue)) return returnedValue;
    }

    throw new Error("system error: invalid result returned from helper function");
}

module.exports = getFormattedReturnValue;
