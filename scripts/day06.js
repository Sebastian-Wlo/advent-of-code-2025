const fs = require("fs");

const inputData = fs.readFileSync("./inputs/day06.txt", {
  encoding: "utf8",
  flag: "r",
});
const inputArray = inputData.split("\n");

// Added after everytinh else... forgot to add the empty line for the "sample" input,
// And didn't feel like rewriting the rest to make the part 2 work
if (inputArray[inputArray.length - 1] === "") {
  inputArray.pop();
}

function getSumOfAllEquations(array) {
  const equationsArray = getEquationsArray(array);
  let sum = 0;
  for (let equation in equationsArray) {
    const equationOutcome = getEquationOutcome(equationsArray[equation]);
    sum += equationOutcome;
  }

  return sum;
}

function getSumOfAllCelaphodEquations(array) {
  const equationsArray = getCelaphodEquations(array);
  let sum = 0;
  for (let equation in equationsArray) {
    const equationOutcome = getEquationOutcome(equationsArray[equation]);
    sum += equationOutcome;
  }

  return sum;
}

function getEquationOutcome(equationObject) {
  if (equationObject.operatorSymbol === "*") {
    let outcome = 1;
    for (let number in equationObject.equationNumbers) {
      outcome *= Number(equationObject.equationNumbers[number]);
    }
    
    return outcome;
  }
  if (equationObject.operatorSymbol === "+") {
    let outcome = 0;
    for (let number in equationObject.equationNumbers) {
      outcome += Number(equationObject.equationNumbers[number]);
    }

    return outcome;
  }
}

function getCelaphodEquations(array) {
  const columnWidths = getColumnWidths(array[array.length - 1]);
  const equationsArray = [];

  for (let colNum = 0; colNum < columnWidths.length; colNum++) {
    const capturedNumbers = Array(columnWidths[colNum]["width"]).fill("");
    for (let rowNum = 0; rowNum < array.length; rowNum++) {
      const capturedEquation = {};

      if (rowNum === array.length - 1) {
        capturedEquation["operatorSymbol"] = array[rowNum]
          .substr(columnWidths[colNum]["index"], columnWidths[colNum]["width"])
          .trim();
        capturedEquation["equationNumbers"] = capturedNumbers;
        equationsArray.push(capturedEquation);
        continue;
      }

      for (
        let innerCol = 0;
        innerCol < columnWidths[colNum]["width"];
        innerCol++
      ) {
        capturedNumbers[innerCol] += String(
          array[rowNum].substr(columnWidths[colNum]["index"])[innerCol]
        ).trim();
      }
    }
  }

  return equationsArray;
}

function getColumnWidths(string) {
  const columnWidthRegex = /(?<=^| )([\*\+] +)(?=$| \+| \*)/g;
  const captured = [...string.matchAll(columnWidthRegex)];
  const colWidths = captured.map((x) => {
    return { index: x.index, width: x[0].length };
  });

  return colWidths;
}

function getEquationsArray(array) {
  const splitArray = [];
  const equationsArray = [];

  for (lineNum in array) {
    splitArray.push(array[lineNum].trim(/[ ]*/).split(/[ ]+/));
  }

  for (let colNum = 0; colNum < splitArray[0].length; colNum++) {
    const equationNumbers = [];
    let operatorSymbol = "";
    for (let rowNum = 0; rowNum < splitArray.length; rowNum++) {
      if (/[\*\+]/.test(splitArray[rowNum][colNum])) {
        operatorSymbol = splitArray[rowNum][colNum];
      } else if (/\d+/.test(splitArray[rowNum][colNum])) {
        equationNumbers.push(splitArray[rowNum][colNum]);
      }
    }
    equationsArray.push({ equationNumbers, operatorSymbol });
  }
  return equationsArray;
}

console.log("Answer to Part 1 is:", getSumOfAllEquations(inputArray));
console.log("Answer to Part 2 is:", getSumOfAllCelaphodEquations(inputArray));
