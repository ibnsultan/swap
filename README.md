# Swap

## Swahili Programming Language (SWAP)

SWAP is a programming language that uses Swahili keywords to represent common programming constructs. It is designed to be simple and easy to learn, making it accessible for beginners and those who are more comfortable with the Swahili language.

It was the first of its kind to bring programming concepts to Swahili speakers in a native language context, and it has inpired to the creation of other programming languages in Swahili, such as pyswahili and swahili-lang.

## Credits
Lots of credit to the author of yorlang @anoniscoding, he's the one who inspired me to create this programming language, and also for his great work on yorlang which was the base foundation for the initial version of swap.

## TUTORIAL

#### INSTALLATION

To write and run Swap code in VS Code, you only need to install the [Swap extension](https://marketplace.visualstudio.com/items?itemName=ibnsultan.swap) — it ships with the `swapro` language engine bundled in, so there's no separate `npm install -g swapro` step and no need to have Node.js on your `PATH` just to run a file from the editor. Clicking the ▶ button (or pressing `Ctrl+F5`) runs your file directly using the bundled engine — see [Running a file from VS Code](#running-a-file-from-vs-code) below.

If you also want to use the `swap` CLI from a terminal (for example to script things outside the editor), you'll need [node runtime](https://nodejs.org/en/download/) installed, after which you can install the CLI globally:

`npm install -g swapro`

After installation run the command

`swap -h`

if your installation was successful the following result will show up

```txt
  ██████    ██      ██    ██████    ████████
██      ██  ██      ██  ██      ██  ██      ██
██          ██      ██  ██      ██  ██      ██
  ██████    ██  ██  ██  ██████████  ████████
        ██  ██  ██  ██  ██      ██  ██
██      ██  ████  ████  ██      ██  ██
  ██████    ██      ██  ██      ██  ██

swahili programming language v3.0.0
by Abdulbasit Rubeya

Usage: cli [options] [file]

Options:
  -v, --version      output the version number
  -l, --lang <lang>  language for error messages (english|swahili)
  -h, --help         output usage information
author: Abdulbasit Sultan Rubeiyya
Examples:
  $ swap file.sw
  $ swap -h
  $ swap -v
```

The banner is only shown for these info commands (bare `swap`, `-h`/`--help`, `-v`/`--version`, `-i`/`--interactive`) - it's skipped while a `.sw` file is running so it doesn't clutter your program's output, and it's drawn in a random color gradient each time, so don't worry if the colors look different between runs.

#### INTERACTIVE REPL

Run `swap -i` (or `swap --interactive`) to start an interactive session instead of running a file - useful for trying out small snippets of Swap without creating a `.sw` file. Variables and functions you declare stay available for the rest of the session, so you can build on earlier lines:

```txt
$ swap -i
swap> hifadhi x = 5;
swap> andika x + 10;
15
swap> toka;
Kwaheri!
```

Statements are evaluated one at a time as you press Enter, same as in a file - each one still needs its own terminating `;`. A block that spans multiple lines (`wakati`, `kama`, `njia`, `jaribu`, ...) is buffered and only run once its closing `}` is typed, shown with a continuation prompt (`...>`). Type `toka;` to exit the session.

Unlike Node's REPL, a bare expression like `1 + 2` on its own is not valid syntax (same as in a `.sw` file) - use `andika ...;` to print a value.

Runtime errors are reported as a single clean message (e.g. `Error: There's an error at line 3 near column 10 in file example.sw : ...`) rather than a raw Node.js stack trace. If you're working on the interpreter itself and want the full JS stack trace, run with `SWAP_DEBUG=1`, e.g. `SWAP_DEBUG=1 swap file.sw`.

To program using swap we will be using vscode, so open the program and install the swap extension <br>

<img src="https://raw.githubusercontent.com/ibnsultan/swap-vsce/main/assets/swap.jpg" width="100%">

1.  Linux : no more configurations start right away
2.  Windows: no extra configuration needed either — swap accepts LF (Unix), CRLF (Windows), and legacy CR (old Mac) end-of-line formats and normalizes them automatically, so your editor's default line ending just works.

#### Running a file from VS Code

Once the extension is installed, click the ▶ button in the editor title bar (or press `Ctrl+F5`, or run "Swap: Run File" from the Command Palette) while a `.sw` file is open — this runs the file directly using the extension's bundled Swap engine, with no separate install or global `swap` command needed. If your workspace has a `main.sw` at its root and it isn't already the file you're viewing, you'll be prompted to choose whether to run `main.sw` or your current file. The file is saved first if it has unsaved changes, and `dai()` input prompts work interactively in the integrated terminal, same as running `swap file.sw` from a terminal yourself.

**NOTE: The file extension for a swap file is .sw**

### Language Tour

Swap statements are terminated with a semicolon (`;`), and comments can use `#`, `//`, or `/* ... */`.

```swap
andika "habari yako"; // prints: habari yako

hifadhi jina = "Juma";
hifadhi umri = 20;
andika jina + " ana miaka " + umri;

kama (umri < 18) {
    andika "mtoto";
} basi kama (umri < 50) {
    andika "kijana";
} basi {
    andika "mzee";
}

hakika (hifadhi i = 0; i < 3; hifadhi i = i + 1) {
    andika i;
}

njia jumlisha (a, b) {
    rejesha a + b;
}
andika jumlisha(2, 3);
```

| Keyword | Meaning |
|---|---|
| `hifadhi` | declare a variable |
| `andika` | print a value |
| `kama` / `basi kama` / `basi` | if / else if / else |
| `wakati` | while loop |
| `hakika` | for loop |
| `vunja` | break (only valid inside `wakati`/`hakika`) |
| `chagua` / `kesi` / `zaidi` | switch / case / default (no fall-through, `vunja` not needed/valid here) |
| `njia` | declare a function (or, used as a value, an anonymous lambda) |
| `rejesha` | return a value |
| `kweli` / `sikweli` | true / false |
| `lete` | import another `.sw` file |
| `ita` | link a variable to its outer/enclosing scope inside a function |
| `jaribu` / `kamata` | try/catch: `jaribu { ... } kamata (err) { ... }` |
| `ramani` | map/dict literal: `ramani(ufunguo: thamani, ...)` (access/set with `mtu.ufunguo`) |
| `dai` | prompt for user input |

Swap also ships a set of built-in helper functions for strings, arrays, math, JSON, and functional-style array operations (`ramanisha`/map, `chuja`/filter, `punguza`/reduce, `kilamoja`/forEach), plus closures via lambdas passed as values.

For the full tutorial with runnable code for every feature — variables, conditionals, loops, functions and lambdas, imports, error handling, variable scopes, arrays, maps, and every built-in helper — see the [examples](examples/) directory and its [README](examples/README.md).
