#!/usr/bin/env node

const packageJson = require("./package.json");
const path = require("path");
const constants = require("./src/constants.js");
const commander = require("commander");
const printBanner = require("./src/banner.js");

printBanner(packageJson.version);

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
            throw new Error("Invalid file extension used, only swap file can be used");
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
