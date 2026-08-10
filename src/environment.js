const helperKaziDeclarations = require("./helperkazi/registeredHelperKazi.js");

class Environment {
    constructor () {
        this.vars = {};
        this.kaziDeclarations = {};
    }

    setHifadhi (scope, name, value) {
        if (!this.vars[scope]) {
            this.vars[scope] = {};
        }

        this.vars[scope][name] = value;
    }

    getHifadhi (scope, name) {
        if (this.vars[scope]) { return this.vars[scope][name]; }
    }

    setKazi (scope, kaziName, kaziNode) {
        if (!this.kaziDeclarations[scope]) {
            this.kaziDeclarations[scope] = {};
        }

        this.kaziDeclarations[scope][kaziName] = kaziNode;
    }

    getKazi (scope, kaziName) {
        if (this.kaziDeclarations[scope]) {
            return this.kaziDeclarations[scope][kaziName];
        }
    }

    isExistHelperKazi (kaziName) {
        return helperKaziDeclarations[kaziName] !== undefined;
    }

    // callSwapFunction is only used by closure-taking helpers (e.g.
    // ramanisha/chuja/punguza/kilamoja) to invoke a Swap closure value they
    // received as an argument - every other helper just ignores it.
    runHelperKazi (kaziName, kaziArgs, callSwapFunction) {
        if (this.isExistHelperKazi(kaziName)) {
            return helperKaziDeclarations[kaziName](kaziArgs, callSwapFunction);
        }
    }

    andika (value) {
        console.log(value);
    }
}

module.exports = Environment;
