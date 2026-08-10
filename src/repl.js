const readlineSync = require("readline-sync");
const packageJson = require("../package.json");
const printBanner = require("./banner.js");
const InputStream = require("./inputstream.js");
const Lexer = require("./lexer.js");
const Parser = require("./parsers/parser.js");
const Environment = require("./environment.js");
const MainInterpreter = require("./interpreters/maininterpreter.js");
const constants = require("./constants.js");

const EXIT_COMMAND = "toka";
const OPEN_BRACKETS = [ constants.SYM.L_PAREN, constants.SYM.L_BRACKET, constants.SYM.L_SQ_BRACKET, ];
const CLOSE_BRACKETS = [ constants.SYM.R_PAREN, constants.SYM.R_BRACKET, constants.SYM.R_SQ_BRACKET, ];

// How many more open brackets/parens/square-brackets `text` has than closed
// ones, ignoring characters inside a string literal or a "#" comment. Used to
// decide whether a wakati/kama/njia/jaribu/... block still spans further
// lines, so the REPL keeps buffering instead of parsing a half-typed block.
function getBracketDepth (text) {
    let depth = 0;
    let inString = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (inString) {
            if (ch === constants.SYM.STR_QUOTE) inString = false;
            continue;
        }

        if (ch === constants.SYM.STR_QUOTE) { inString = true; continue; }

        if (ch === constants.SYM.COMMENT) {
            const newlineIndex = text.indexOf(constants.SYM.NEW_LINE, i);
            i = newlineIndex === -1 ? text.length : newlineIndex;
            continue;
        }

        if (OPEN_BRACKETS.includes(ch)) depth++;
        else if (CLOSE_BRACKETS.includes(ch)) depth--;
    }

    return depth;
}

function isExitCommand (buffer, line) {
    if (buffer !== "") return false; // only honor 'toka' as the start of a fresh entry, not mid-block
    const trimmed = line.trim();
    return trimmed === EXIT_COMMAND || trimmed === `${EXIT_COMMAND}${constants.SYM.STATEMENT_TERMINATOR}`;
}

// Runs one accumulated chunk of source against the persistent REPL
// environment - mirrors MainInterpreter#interpreteImportedProgram's pattern
// of reusing one Environment across multiple fresh Parser instances.
function runChunk (environment, source) {
    const parser = new Parser(new Lexer(new InputStream(null, { rawSource: source, displayName: "<repl>", })));
    new MainInterpreter(environment, parser).interpreteProgram();
}

function start () {
    printBanner(packageJson.version);
    console.log("Swap REPL - andika amri moja moja, kila moja ikiishia kwa ';'.");
    console.log(`Andika '${EXIT_COMMAND};' kuondoka.\n`);

    const environment = new Environment();
    let buffer = "";

    for (;;) {
        const prompt = buffer ? "...> " : "swap> ";
        let line;

        try {
            line = readlineSync.question(prompt);
        } catch (e) {
            break; // EOF / interrupted input stream - exit gracefully
        }

        if (line == null) break;
        if (isExitCommand(buffer, line)) break;

        buffer += `${line}\n`;
        if (getBracketDepth(buffer) > 0) continue; // still inside a block - keep buffering
        if (!buffer.trim()) { buffer = ""; continue; }

        try {
            runChunk(environment, buffer);
        } catch (err) {
            console.error(err.message);
        }

        buffer = "";
    }

    console.log("Kwaheri!");
}

module.exports = { start, getBracketDepth, runChunk, };
