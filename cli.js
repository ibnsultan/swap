#!/usr/bin/env node

const packageJson = require("./package.json");
const path = require("path");
const constants = require("./src/constants.js");
const commander = require("commander");
const printBanner = require("./src/banner.js");

// Mirror how PHP keeps its own internal (C) stack out of a script's error
// output: swap errors are already user-facing messages (see feedbackMessages.js
// and InputStream#throwError), so surface just that message here instead of
// letting Node's raw JS stack trace leak out of the interpreter. Set
// SWAP_DEBUG=1 to see the full stack while working on the interpreter itself.
process.on("uncaughtException", (error) => {
    if (process.env.SWAP_DEBUG) throw error;
    console.error(`Error: ${error.message}`);
    process.exit(1);
});

// The art banner is an info/help affordance, not part of a running program's
// output - only show it when no file is being executed (bare invocation,
// -h/--help, -v/--version).
const cliArgs = process.argv.slice(2);
const isInfoRequest = cliArgs.length === 0 ||
    [ "-h", "--help", "-v", "--version", ].some((flag) => cliArgs.includes(flag));

if (isInfoRequest) printBanner(packageJson.version);

commander.on("--help", function () {
    console.log("author: Abdulbasit Sultan Rubeiyya");
    console.log("Examples:");
    console.log("  $ swap file.sw");
    console.log("  $ swap -h");
    console.log("  $ swap -v");
});

commander.version(packageJson.version, "-v, --version");

commander.arguments("[file]")
    .option("-l, --lang <lang>", "language for error messages (english|swahili)")
    .action((file, options) => {
        if (!file) {
            commander.help();
        } else if (path.extname(file) === constants.SWAP_EXT) {
            setGlobalVars(options);
            startSwapProcess(file);
        } else {
            console.log("Invalid file extension used, only swap file can be used\n");
            commander.help();
        }
    });

commander.parse(process.argv);

function setGlobalVars (options) {
    const lang = [ "english", "swahili", ];
    global.defaultLang = lang.includes(options.lang) ? options.lang : "english";
}

function startSwapProcess (file) {
    const InputStream = require("./src/inputstream.js");
    const Lexer = require("./src/lexer.js");
    const Parser = require("./src/parsers/parser.js");
    const Environment = require("./src/environment.js");
    const MainInterpreter = require("./src/interpreters/maininterpreter.js");

    const parser = new Parser(new Lexer(new InputStream(file)));
    new MainInterpreter(new Environment(), parser).interpreteProgram();
}
