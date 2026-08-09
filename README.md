# Swap

## Swahili Programming Language

**SWAP** was created so as to help non-English speaking natives to have a much easier understanding in Programming (i.e SWAHILI) in Tanzania.
It is a programming Language that allows programmers to write codes in the Swahili Language construct.

## Author
- Abdulbasit Rubeiyya- @ibnsultan

## Credits
- node js
- jScript

## TUTORIAL

#### INSTALLATION

Getting Started with Swap you need to have [node runtime](https://nodejs.org/en/download/) installed on your machine, After making sure that node runtime works on your machine run the following command

`npm install -g swapro`

After installation download run the command

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

The banner is only shown for these info commands (bare `swap`, `-h`/`--help`, `-v`/`--version`) - it's skipped while a `.sw` file is running so it doesn't clutter your program's output, and it's drawn in a random color gradient each time, so don't worry if the colors look different between runs.

Runtime errors are reported as a single clean message (e.g. `Error: There's an error at line 3 near column 10 in file example.sw : ...`) rather than a raw Node.js stack trace. If you're working on the interpreter itself and want the full JS stack trace, run with `SWAP_DEBUG=1`, e.g. `SWAP_DEBUG=1 swap file.sw`.

To program using swap we will be using vscode, so open the program and install the swap extension <br>

<img src="https://raw.githubusercontent.com/ibnsultan/swap-vsce/main/assets/swap.jpg" width="100%">

1.  Linux : no more configurations start right away
2.  Windows: no extra configuration needed either — swap accepts LF (Unix), CRLF (Windows), and legacy CR (old Mac) end-of-line formats and normalizes them automatically, so your editor's default line ending just works.



**NOTE: The file extension for a swap file is .sw**

### First Program

Swap does not use any preprocessors, It uses the constant `andika` to print out the desired content, `andika` literally means "write"

**eg. 1**
```swap
andika "habari yako";
```

Result:
```txt
habari yako
```

Every line of code has and must be terminated by a delimiter which is a `semicolon(;)`

To run your program initiate a CMD in your project directory and run the command
 `swap file.sw`

File should be replaced with the name of your file.

### Variable Declaration

Variables can only be declared in Swap using the keyword `hifadhi` which means to store something.

**eg. 2**
```swap
hifadhi a = 10;
hifadhi b = 20;
andika a + b;
```

Result
```txt
30
```

**eg. 3**
```swap
hifadhi jina= "juma";
hifadhi umri = 5 ;
andika jina + " " + "is" + " " + umri + " " + "years old" ;
```

Result
```txt
Juma is 5 years old
```

### Requesting User Input

Swap also supports the program interactive programming by requesting inputs from the user, the input request constant is `dai` which means "request".

**eg. 4**

```swap
hifadhi jina = dai("andika jina lako: ");
```

### Displaying User Input

**eg. 5**
```swap
hifadhi jina = dai("andika jina lako: ");
andika "Habari " + jina;
```

Assuming after running the program the user provided it with input "Abdulbasit", then the results will be
```txt
Habari Abdulbasit
```

Conditionals like if, else, else if and switch statements are also defined and used in Swap language.

### If / Else If Conditions

`if` is denoted by `kama`
`else` is denoted by `basi`
`else if` as `basi kama`

**eg. 6**
```swap
hifadhi umri = 20;
kama ( umri < 18 ){
    hifadhi makamo = "mtoto" ;}
    basi kama ( umri > 18 && umri < 50){
    hifadhi makamo = "kijana" ;}
basi {
    hifadhi makamo = "mzee" ;}
andika "juma ni " + makamo ;
```

Result
```txt
juma ni kijana
```

**Explanation:** The above program is used to show from which age group does a person belong whether young, youth or an old person.

### Switch Case

Also, switch case expressions are included. The switch case is only evaluated once, the value of each expression is always compared with the values of each case. If there is a match, the associated code block is run and then escapes the sequence.
Unlike loops, `chagua` already stops as soon as the matching `kesi` (or `zaidi`) block finishes running - there's no fall-through to the next case, so the `vunja;` (`break;`) statement is neither needed nor valid inside a `chagua` block; using it there will throw a parse error. `vunja;` is only for escaping `wakati`/`hakika` loops early.

The switch case values are presented as follows:

| Concept | Swap keyword |
|---|---|
| switch | `chagua` |
| case | `kesi` |
| default | `zaidi` |

**eg. 7**

```swap
andika "1. cct basic";
andika "2. cct ordinary";
hifadhi teule = dai("weka chaguo lako hapa: ");
wakati (teule > 0){
    chagua (teule){ 
        kesi 1 :
        andika "chaguo lako ni: " + teule ;
        kesi 2 :
        andika "chaguo lako ni: " + teule ;
        zaidi :
        andika "umekosea tafadhali chagua tena";
    }
    hifadhi teule = dai("weka chagua lako hapa: ");
}
```

**Explanation:** The following program prompts a user to choose a tv package. If a program choice is present and is matched with the associated case, the program will echo the user's input and exit, else if the input value is not matched the program will continue to loop until a right input is given or the program is manually terminated.

### Increments and Decrements

Increments and decrements like `i++` or `i--` are not valid and would throw out a fatal error when used. To declare an increment or decrement, normal mathematical expressions are used, i.e.

```swap
hifadhi a = a + 1; // for increment
hifadhi a = a - 1; // for decrement
```

### Loops

#### for Loop

In Swap, the "for" loop is implemented by the **`hakika`** statement and expressed as

```swap
hakika(hifadhi a = 0; a < 10; hifadhi a = a+1){
    //statement
}
```

#### while Loop

In Swap, the while loop is represented by the `wakati()` statement and is expressed as

```swap
wakati(hali/condition){
    //statement;
}
```

**eg. 8**

```swap
hifadhi a = 10;
wakati(a!=0){
    a = a-1;
}
```

Result:
The program will continue to run until variable "a" decreases to 0. The `vunja;` keyword can be used to escape loops when necessary.

### Functions

A function is a code-block that performs a certain task. In Swap, a function can be a group of a procedure which performs a certain work or can be used to return a value.

Functions in Swap can be defined *as independent modules of code blocks that perform certain work.*

**eg. 9**

The `function` keyword is held by `njia`.

```swap
njia hesabu (a, b){
    rejesha a+b;
}
hifadhi x = hesabu(12,6);
andika x;
```

or

```swap
njia hesabu (a, b){
    andika a+b;
}
hesabu(12,6);
```

or

```swap
njia hesabu (a, b){
    rejesha a+b;
}
andika hesabu(12,6);
```

Result
```txt
18
```

In Swap there is no pre-declaration of functional prototypes as in languages like C++, therefore the use of functions have to be fully declared before they are called.

### Import

The import keyword is supplemented by the constant `lete` which literally means "bring". The import (`lete`) constant is used to import other files into the main program file.

The constant is followed by a string value which should contain the path to the imported file, and this path must be provided as a suffix to the absolute path of the needed file.

**eg. 10**
```swap
lete "file.sw";
```
The command will bring a file.sw into your program.

Suppose you want to import a file from another directory:
```swap
lete "PATH/file.sw";
```

### Variable Scopes

A variable scope is the setting within which the variable is declared. All the inner functions (`njia`) have access to the variables that are from the outer function, unlike the inner functions - the outer functions do not have access to their inner functions.

**eg. 11**

```swap
hifadhi a=3;
njia namba(){
    hifadhi a=a+10;
    andika a;
}
namba();
andika a;
```

Result:
```txt
13
3
```

To adopt the changes of a variable in inner functions, a variable must be marked with `ita`, giving it the backtick-quoted variable name(s) to link to the outer scope. This will make all changes in the inner function to the outer function noticeable.

**eg. 12**

```swap
hifadhi a=3;
njia namba(){
     ita `a`;
     hifadhi a=a+10;
     andika a;
}
namba();
andika a;
```

Result:
```txt
13 13
```

### Arrays

An array is a data structure that stores multiple elements in a single variable, and in most cases these elements are all of the same types, like integer or string.

Swap supports two types of arrays:

- the one-dimensional array and
- the multi-dimensional array.

#### One Dimensional Array

It is also known as the linear array. All elements stored can be accessed through a single subscript which either represents a row or a column.

**eg. 13**

```swap
hifadhi array = ["moja","mbili"];
andika array;
andika array[0];
```

Result:
```txt
[ 'moja', 'mbili' ]
moja
```

#### Multi-Dimensional Array

It is an array that stores data with more than one array level. A multi-dimensional array is used to store several data groups in one variable.

**eg. 14**

```swap
hifadhi array = [["macho","pua","mdomo","sikio"],[1, 2, 3]];
andika array;
andika array[0];
andika array[1][2];
```

Result:
```txt
[ [ 'macho', 'pua', 'mdomo', 'sikio' ], [ 1, 2, 3 ] ]
[ 'macho', 'pua', 'mdomo', 'sikio' ]
3
```

Elements can be added to a swap array by leaving the index empty in the last position.

**eg. 15**

```swap
hifadhi array = [1, 2, 3];
andika array;
hifadhi array[]=4;
andika array;
```

Result:
```txt
[ 1, 2, 3 ]
[ 1, 2, 3, 4 ]
```

### Built-in Functions

Swap has several helper functions, the following is a list of those helper functions.

#### BADILI

`BADILI` constant is used to convert a string value of a variable into uppercase letters. The constant must be written in uppercase.

**eg. 16**
```swap
andika BADILI("herufi");
```

Result
```txt
HERUFI
```

#### badili

`badili` is the inverse of the `BADILI` constant. It converts a string value of a variable into lowercase letters. The constant must be written in lowercase.

**eg. 17**
```swap
andika badili("HerUFI");
```

Result
```txt
herufi
```

#### kaunta

`kaunta` is used to count the length of an array.

**eg. 18**
```swap
andika kaunta([26,78,75,"mango"]);
```

Result
```txt
4
```

#### hariri

`hariri` constant is used to edit a part of a string or substring of a string.

**eg. 19**
```swap
andika hariri("wewe ni mbaya", "mbaya", "mzuri");
```

The function `hariri` takes in three arguments. Assuming the parameters used by the function `hariri` are x, y and z, then:
- x will be the initial input
- y is the string to find and replace in the input of x
- z is the string value to replace the input of y

Result
```txt
wewe ni mzuri
```

It has replaced the string "mbaya" in a sentence with the string "mzuri".

#### tafuta

`tafuta` constant is used to find a substring in a string.

**eg. 20**
```swap
andika tafuta ("wewe ni mbaya", "mbaya");
```

Result
```txt
kweli
```

If the substring does not exist in the main string then it would have returned
```txt
sikweli
```

[**THE FULL TUTORIAL CAN BE FOUND HERE**](http://edtech.co.tz/swap/25/page)
