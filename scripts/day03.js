const fs = require("fs");

const inputData = fs.readFileSync("./inputs/sample03.txt", {
  encoding: "utf8",
  flag: "r",
});
const inputArray = inputData.split("\n");

//console.log(`Answer to 1 is: ${findMaxArrayJolts(inputArray, 2)}`)
console.log(`Answer to 2 is: ${findMaxArrayJolts(inputArray, 12)}`)

function findMaxArrayJolts(array, requiredCells) {
  const joltagePerBank = [];

  for(let bank in array) {
    bankBatteries = array[bank].split("");
    joltagePerBank.push(Number(findMaxBankJolts(bankBatteries, requiredCells)))
  }
  console.log(joltagePerBank)
  return joltagePerBank.reduce((sum, current) => sum + current, 0);
}

function findMaxBankJolts(array, requiredCells) {
  const highestValues = findNArraysHighest(array, requiredCells);
  
  highestValues.sort((a, b) => a.position < b.position ? -1 : 1);
  const maxBankJolts = highestValues.reduce((returnVal, current) => returnVal + String(current.value), "");
  return maxBankJolts
}

function findNArraysHighest(array, n) {
  const arrayValues = [];
  const arrayTakenPositions = [];
  

  for (let i = 0; i < n; i++) {
    let currentHighest = {
      position: 0, 
      value: 0
    };
    
    let startPos = 0;
    let endPosition = array.length;
    if (arrayValues.length !== 0 && !arrayTakenPositions.includes(array.length - 1)) {
      startPos = arrayValues[arrayValues.length - 1].position;
    }
    for (let pos = startPos; pos < array.length; pos++) {
      if (array[pos] > Number(currentHighest.value)) {
        if (arrayTakenPositions.includes(pos)) {
          continue;
        }
        currentHighest.position = pos;
        currentHighest.value = String(array[pos]);
        
      }
    }
    arrayValues.push(currentHighest);
    arrayTakenPositions.push(currentHighest.position);
  }
  console.log("found values:", arrayValues)
  return arrayValues;
}
