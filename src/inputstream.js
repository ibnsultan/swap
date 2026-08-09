const constants = require("./constants.js");
const fs = require("fs");

class InputStream {
    constructor (fileName) {
        this.code = this.readProgramFile(fileName);
        this.line = 1;
        this.column = 0;
        this.position = 0;
        this.fileName = fileName;
    }

    readProgramFile (fileName) {
        try {
            return this.normalizeLineEndings(fs.readFileSync(process.cwd() + "/" + fileName, "utf8"));
        } catch (e) {
            throw new Error(`Could not read file: ${fileName}`);
        }
    }

    // normalize CRLF (Windows) and legacy CR (old Mac) line endings to LF
    // so swap files aren't restricted to a single EOL format.
    normalizeLineEndings (code) {
        return typeof code === "string" ? code.replace(/\r\n|\r/g, constants.SYM.NEW_LINE) : code;
    }

    // return the next value and also discard it from the stream
    next () {
        const character = this.code.charAt(this.position++);

        if (character === constants.SYM.NEW_LINE) {
            this.column = 0; this.line++;
        } else {
            this.column++;
        }

        return character;
    }

    // return the next value without discarding it from the stream
    peek () {
        return this.code.charAt(this.position);
    }

    throwError (msg) {
        throw new Error(`There's an error at line ${this.line} near column ${this.column} in file ${this.fileName} :\n ${msg}`);
    }

    isEndOfFile () {
        return this.peek() === "";
    }

    isNotEndOfFile () {
        return this.peek() !== "";
    }
}

module.exports = InputStream;
