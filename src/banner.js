// Chunky 5x7 pixel-block font, just enough letters to spell "SWAP".
const FONT = {
    S: [ "01110", "10001", "10000", "01110", "00001", "10001", "01110", ],
    W: [ "10001", "10001", "10001", "10101", "10101", "11011", "10001", ],
    A: [ "01110", "10001", "10001", "11111", "10001", "10001", "10001", ],
    P: [ "11110", "10001", "10001", "11110", "10000", "10000", "10000", ],
};

const WORD = "SWAP";
const PIXEL = "██";
const GAP = "  ";

function buildLogoLines () {
    const rows = FONT[WORD[0]].length;
    const lines = [];
    for (let row = 0; row < rows; row++) {
        let line = "";
        for (const letter of WORD) {
            line += FONT[letter][row].split("").map((bit) => (bit === "1" ? PIXEL : GAP)).join("");
            line += GAP;
        }
        lines.push(line);
    }
    return lines;
}

const LOGO_LINES = buildLogoLines();

// Vivid palette a gradient pair is randomly drawn from on every run,
// Laravel-style - the banner comes out a different color combo each time.
const PALETTE = [
    [ 255, 62, 165, ],
    [ 255, 99, 71, ],
    [ 255, 179, 71, ],
    [ 247, 213, 84, ],
    [ 126, 231, 135, ],
    [ 72, 219, 199, ],
    [ 64, 190, 255, ],
    [ 123, 104, 238, ],
    [ 186, 85, 211, ],
];

function supportsColor () {
    if (process.env.NO_COLOR) return false;
    if (process.env.FORCE_COLOR) return true;
    return Boolean(process.stdout && process.stdout.isTTY);
}

function randomPaletteColor () {
    return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function lerp (start, end, t) {
    return Math.round(start + ((end - start) * t));
}

function lerpColor (from, to, t) {
    return [ lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t), ];
}

function colorize (text, [ r, g, b, ]) {
    return `[38;2;${r};${g};${b}m${text}[0m`;
}

function printBanner (version) {
    const colorEnabled = supportsColor();
    const from = randomPaletteColor();
    let to = randomPaletteColor();
    while (to === from) to = randomPaletteColor();

    LOGO_LINES.forEach((line, index) => {
        if (!colorEnabled) {
            console.log(line);
            return;
        }
        const t = index / (LOGO_LINES.length - 1);
        console.log(colorize(line, lerpColor(from, to, t)));
    });

    const versionLine = `v${version}`;

    console.log(`\nswahili programming language ${colorEnabled ? colorize(versionLine, to) : versionLine}`);
    console.log("by Abdulbasit Rubeya \n");
}

module.exports = printBanner;
