# Swahili Programming Language
**SWAP** was created to help non-English speaking natives to have a much easier understanding in Programming (i.e SWAHILI) in Tanzania.

![Screenshot](https://raw.githubusercontent.com/ibnsultan/swap-vsce/main/assets/screen.png?token=AGZG7Y3AVUL6Z55JUO7DOVK7WQF7Q)

## Feature List
- Variable Declaration
- Conditionals & Loops
- Variable functions, Functions & Arrays
- recursion
- Basic arithmetic operations

## Author
- Abdulbasit S Rubeiyya- @ibnsultan

## License
- [MIT](https://github.com/)

[**JOIN THE SWAP COMMUNITY TODAY, CLICK HERE**](https://wanda.buzz/swapcommunity)

# TUTORIAL

#### INSTALLATION

Getting Started with Swap you need to have [node runtime](https://nodejs.org/en/download/) installed on your machine. After making sure that node runtime works on your machine run the following command

`npm install -g swapro`

After installation download run the command

`swap -h`

if your installation was successful the following result will show up

    λ swap -h
    Usage: cli [options] [file]

    Options:
      -v, --version  output the version number

      -h, --help     output usage information
        _________              _________  ________
       /          /          //        //        /
      /          /          //        //        / Swahili
     /_________ /          //________//________/  programming
              //    /     //        //            Language
             //    /     //        // author: Abdulbasit Rubeiyya
    ________//____/_____//        //
    Examples:
      $ swap file.sw
      $ swap -h
      $ swap -v

Dowload [Visual studio code](https://code.visualstudio.com/) editor and install the [swap extension](https://marketplace.visualstudio.com/items?itemName=abdulbasit.swap-vsce) for syntax higlighting
![Screenshot](https://raw.githubusercontent.com/ibnsultan/swap-vsce/main/assets/ext.png)

1.  Linux and MAC : no more configurations start right away
2.  Windows: for every swap project, create a folder with a name `.vscode` and in that folder create file `settings.json` and add the following lines
    `{"files.eol": "\n",}` and you'll be ready to go
    
![Screenshot](https://raw.githubusercontent.com/ibnsultan/swap-vsce/main/assets/setts.png)
    

**NOTE: The file extension for a swap file is .sw**

First Program:

Swap does not use any preprocessors, It uses the constant `andika` to print out the desired content, `andika` literally means "write"

**eg.1**
 `andika "habari yako";`

Result:
 `habari yako`

Every line of code has and must be terminated by a delimiter which is a `semicolon(;)`

To run your program initiate a CMD or Terminal in your project directory and run the command
 `swap file.sw`

File should be replaced with the name of your file.

**VARIABLE DECLARATION**
 Variables can only be declared in Swap using the keyword `hifadhi` which means to store something.

**eg. 2**

    hifadhi a = 10;
    hifadhi b = 20;
    andika a + b;

Result
 `30`

**eg. 3**

    hifadhi jina= "Juma";
    hifadhi umri = 5 ;
    andika jina + " " + "is" + " " + umri + " " + "years old" ;

Result
 `Juma is 5 years old`

 **REQUESTING USER INPUT**

Swap also supports the program interactive programming by requesting inputs from the user, the input request constant is `dai` which means "request".

**eg. 4**

    hifadhi jina = dai("andika jina lako: ");

**DISPLAYING USER INPUT**

**eg. 5**

    hifadhi jina = dai("andika jina lako: ");
    andika "Habari " + jina;

assuming after running the program the user provided it with input "Abdulbasit"

then the Results will be
 `Habari Abdulbasit`. Conditionals like if, else, else if and switch statements are also defined and used in Swap language

**IF ELSE IF CONDITIONS:**

`if` is denoted by `kama`
 `else` is denoted by `basi`
 `else if` as `basi kama`

**eg. 6**

    hifadhi umri = 20;
    kama ( umri < 18 ){
        hifadhi makamo = "mtoto" ;}
        basi kama ( umri > 18 && umri < 50){
        hifadhi makamo = "kijana" ;}
    basi {
        hifadhi makamo = "mzee" ;}
    andika "juma ni " + makamo ;

Result
 `juma ni kijana`

**Explanation:** The above program is used to show from which age group does a person belong whether young, youth or an old person

**SWITCH CASE:**

Also, switch case expressions are included. The switch case is only evaluated once, the value of each expression is always compared with the values of each case. if there is a match, the associated code block is run and then escapes the sequence.
 With exceptional to loops the use of `break;` which is presented by `vunja;` statement in Swap, to kill or escape a switch case sequence will result to a fatal error. In normal cases (without loops) the switch case automatically escapes the sequence after executing the true match of a case.

The switch case values are presented as follows;
 `switch` - `badilisha`
 `case` - `chaguo`
 `break` - `vunja`
 `default` - `zaidi`

**eg. 7**

``` {style="color: red;"}
andika "1. cct basic";
andika "2. cct ordinary";
hifadhi teule = beba ("weka chaguo lako hapa: ");
wakati (teule > 0){
    badilisha (teule){
        chaguo 1 :
        andika "chaguo lako ni: " + teule ;
        vunja;
        chaguo 2 :
        andika "chaguo lako ni: " + teule ;
        vunja;
        zaidi :
        andika "umekosea tafadhali chagua tena";
    }
    hifadhi teule = beba ("weka chagua lako hapa: ");
}
```

**Explanation:** The following program prompts a user to choose a tv package if a program chose is present and is matched with the associated case, the program will echo the user's input and exits else if the input value is not matched the program will continue to loop until a right input is given or the program is manually terminated.

**INCREMENT and DECREMENTS**

Increments and decrements like `i++` or `i--` are not valid and would throw out a fatal error when used, to declare an increment or decrement normal mathematical expressions are used

i.e.
 `hifadhi a = a + 1;` for increment or
 `hifadhi a = a - 1;` for decrement.

**LOOPS**

**for Loop**

In Swap, "for" loop in implemented by **`hakika`** statement and expressed as

    hakika(hifadhi a = 0; a < 10; hifadhi a = a+1){
        //statement
    }

**while - loop**
 In Swap, the while loop is represented by `wakati()` statement and is expressed as

    wakati(hali/condition){
        //staement;
    }

**eg. 8**

    hifadhi a = 10;
    wakati(a!=0){
        a = a-1;
    } 

Results
 The program will continue to run until variable "a" decreases to 0 `vunja;` keyword can be used to escape loops when necessary

**FUNCTIONS**

A function is a code-block that performs a certain task. In Swap, a function can be a group of a procedure which performs a certain work or can be used to return a value.

Functions in Swap can be defined *as independent modules of code blocks that perform certain work.*

**eg. 9**

`function` keyword in held by `njia `

    njia hesabu (a,b){
        rejesha a+b;
    }
    hifadhi x = hesabu(12,6);
    andika x;

or

    njia hesabu (a,b){
        andika a+b;
    }
    hesabu(12,6);

or

    njia hesabu (a,b){
        rejesha a+b;
    }
    andika = hesabu(12,6);

Result
 `18`

in swap there is no pre-declaration of functional prototypes, therefore the use of functions have to be fully declared before they are executed.
**IMPORT**

The import keyword is supplemented by the constant `lete` which literally means "bring", the import(`lete`) constant is used to import other files into the main program file.

The constant is followed by a string value which should contain the path to the imported file and this path must be provided as a suffix to the absolute path of the needed file

**eg. 10
** `lete "file.swap"`
 the command will bring a file.swap into your program.

Suppose you want to import a file from another directory
 `lete "PATH/file.swap"`

**VARIABLE SCOPES**

a variable scope is the settings within which the variable is declared. All the inner functions (`njia`) have access to the variables that are from the outer function, unlikely the inner functions the outer functions do not have access to their Inner functions.

**eg. 11**

    hifadhi a=3;
    njia namba(){
        hifadhi a=a+10;
        andika a;
    }
    andika a;

Result:
 `13`
 `3`

To adopt the changes of a variable in inner functions, a variable must be declared with `ita`, this will make all changes in the inner function to the outer function noticeable,

**eg. 12**

     hifadhi a=3;
     njia namba(){
          ita a=a+10;
          andika a; 
     }
     andika a;

Result:
 `13 13`

**ARRAYS**

An array is a data structure that stores multiple elements in a single variable. and in most cases these elements are all of the same types, like integer or string.

Swap supports two types of arrays,

-   the one-dimensional array and
-   the multi-dimensional array.

**ONE DIMENSIONAL ARRAY**

It is also known as the linear array, all elements stored can be accessed through a single subscript which either represents a row or a column,

**eg. 13**

    hifadhi array = ["moja","mbili"];
    andika array;
    andika array[0]

Results

`moja, mbili moja `

**MULTI-DIMENSIONAL ARRAY**

It is an array that stores data on more than one level, a multi-dimensional array is used to store several data groups in one variable.

**eg. 14**

    hifadhi array = [["macho","pua","mdomo","sikio"],[1, 2, 3]]
    andika array;
    andika array[0];
    andika array[1][2];

Results:
 `'macho', 'pua', 'mdomo', 'sikio', 1, 2, 3 'macho', 'pua', 'mdomo', 'sikio' 3`

Elements can be added to a swap array by the last position of an index empty

**eg. 15**

    hifadhi array = [[1, 2, 3]];
    andika array;
    hifadhi array[]=4;
    andika array;

Result:

`1, 2, 3 1, 2, 3, 4`

**BUILT IN FUNCTIONS**

Swap has several Helper functions, the following is a list of those helper functions.

**BADILI:**
 `BADILI` constant is used to convert a string value of a variable into uppercase letters. The constant must be written in uppercase.

**eg. 16**
 `andika BADILI("herufi");`

Result
 `HERUFI`

**badili:**
 `badili` this is an inverse of `BADILI` constant, it transforms or converts a string value of a variable into lowercase letters. The constant must be written in lowercase.

**eg. 17**
 `andika BADILI("HerUFI");`

Result
 `herufi`

**Kaunta:**
 `kaunta`This is used to count the length of an array

**eg. 18**
 `andika kaunta([26,78,75,"mango"]);`

Result
 `4`

**hariri:**
 `hariri` constant is used to edit a part of a string or substring of a string

**eg. 19**

`andika hariri ("wewe ni mbaya", "mbaya", "mzuri");`

Result
 `wewe ni mzuri`

It has replaced string mbaya in a sentence with a string mzuri.

**tafuta:**
 `tafuta` constant is used to find a substring in a string

**eg. 20**

`andika tafuta ("wewe ni mbaya", "mbaya");`

Result
 `boolean - kweli`

if the substring does not exist in the main string then it would have returned
 `boolean - sikweli`

Assuming we have two variable A and B where A=15 and B=20

FULL DOCUMENTATION CAN BE OBTAINED [HERE](http://edtech.co.tz/swap/25/page)
