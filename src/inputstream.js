const constants = require("./constants.js");
const fs = require("fs");

class InputStream {
    // options.rawSource lets a caller (e.g. the REPL, src/repl.js) feed
    // in-memory source text directly instead of reading a .sw file off disk -
    // options.displayName is what shows up in place of a filename in error
    // messages (InputStream#throwError) for that case.
    constructor (fileName, options = {}) {
        if (options.rawSource != null) {
            this.code = this.normalizeLineEndings(options.rawSource);
            this.fileName = options.displayName || "<repl>";
        } else {
            this.code = this.readProgramFile(fileName);
            this.fileName = fileName;
        }
        this.line = 1;
        this.column = 0;
        this.position = 0;
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

    // look one character further ahead than peek() without discarding
    // anything - used by the lexer to distinguish "/" (divide) from the
    // start of a "//" or "/*" comment.
    peekNext () {
        return this.code.charAt(this.position + 1);
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
