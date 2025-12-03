# Advent of Code 2025

Here are my solutions for the [Advent of Code 2025](https://adventofcode.com/2025) challenges, written in JavaScript.

## Setup

If, for some reason, you'd like to run them locally, you'll need to have Node.js installed, and also provide your own input files for the scripts.

### Checking if Node.js is installed on your system / installing Node.js

In the terminal, enter:

```bash
node -v
```

If you get output similar to `v24.11.1`, you're (probably) good to go!
I'm using version 24 - the scripts don't depend on anything other than `fs.readFileSync()`, so it will most likely run on any Node.js version, but if they don't (or you don't have Node already installed), please follow the instructions on [Node.js download page](https://nodejs.org/en/download).

### Providing inputs

Each script will need an input file from Advent of Code to run - all of them should be located inside `inputs` directory in the main repository. Input for each day should be named `dayXX.txt`, where `XX` is the day number (with a leading zero for the days 01-09).

### Running the scripts

in the terminal, to run the script for a specific day, either enter:

```bash
node scripts/dayXX.js
```

or move to the `scripts` folder first

```bash
cd scripts
```

and _then_ run the script you want with

```bash
node dayXX.js
```

Same as for input files, `XX` in the file name is the day number (with a leading zero for the days 01-09).
