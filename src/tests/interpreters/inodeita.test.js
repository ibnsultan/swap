jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeWoke test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        global.console.log = jest.fn();
        parser = new Parser(new lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should set global(woke) variables properly within local context", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} count() {
                ${constants.KW.HIFADHI} counter = 3;
                ${constants.KW.HIFADHI} i = 15;  
                ${constants.KW.HIFADHI} j = [6,7];  
            
                ${constants.KW.KAZI} incrementCounter() { 
                    ${constants.KW.ITA} \`counter, j\`;

                    ${constants.KW.HIFADHI} counter = counter + 1;
                    ${constants.KW.HIFADHI} i = i + 1;
                    ${constants.KW.HIFADHI} j[0] = j[0] + 8;
                    ${constants.KW.ANDIKA} i;
                }
                incrementCounter();

                ${constants.KW.ANDIKA} j[0];
                ${constants.KW.ANDIKA} i;
                ${constants.KW.PADA} counter;
            
            }
            
            ${constants.KW.ANDIKA} count();
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(16);
        expect(global.console.log).toHaveBeenCalledWith(14);
        expect(global.console.log).toHaveBeenCalledWith(15);
        expect(global.console.log).toHaveBeenCalledWith(4);
    });

    test("it should set global(woke) variables properly within local context - second example", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.KAZI} count() {
                ${constants.KW.HIFADHI} i = 15;  
            
                ${constants.KW.KAZI} incrementCounter() {
                    ${constants.KW.ITA} \`i\`;
                    ${constants.KW.HIFADHI} i = i + 1;
                    
                    ${constants.KW.KAZI} increase() { 
                        ${constants.KW.ITA} \`i\`;
    
                        ${constants.KW.HIFADHI} i = i + 2;
                    }
                    increase();
                }
                
                incrementCounter();

                ${constants.KW.ANDIKA} i;
            }
            
            count();
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith(18);
    });
});
