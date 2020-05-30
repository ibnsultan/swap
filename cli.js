#!/usr/bin/env node

const packageJson = require("./package.json");
const path = require("path");
const constants = require("./src/constants.js");
const commander = require("commander");

commander.on("--help", function () {
    console.log("    _________              _________  ________");
    console.log("   /          /          //        //        /");
    console.log("  /          /          //        //        / swahili");
    console.log(" /_________ /          //________//________/  programming");
    console.log("          //    /     //        //            Language");
    console.log("         //    /     //        // author: Abdulbasit Rubeiyya");
    console.log("________//____/_____//        //   ");
    console.log("Examples:");
    console.log("  $ swap test.swap");
    console.log("  $ swap -h");
    console.log("  $ swap -v");
});

commander.version(packageJson.version, "-v, --version");

commander.arguments("[file]")
    .option("-l, --lang [lang]", "Select language to use")
    .action((file, options) => {
        if (path.extname(file) === constants.YL_EXT) {
            setGlobalVars(options);
            startYorlangProcess(file);
        } else {
            throw new Error("Invalid file extension used, only swap file can be used");
        }
    });

commander.parse(process.argv);

function setGlobalVars (options) {
    const lang = [ "english", "kiswahili", ];
    global.defaultLang = lang.includes(options.lang) ? options.lang : "english";
}

function startYorlangProcess (file) {
    const InputStream = require("./src/inputstream.js");
    const Lexer = require("./src/lexer.js");
    const Parser = require("./src/parsers/parser.js");
    const Environment = require("./src/environment.js");
    const MainInterpreter = require("./src/interpreters/maininterpreter.js");

    const parser = new Parser(new Lexer(new InputStream(file)));
    new MainInterpreter(new Environment(), parser).interpreteProgram();
}
