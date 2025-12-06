const fs = require("fs");

const inputData = fs.readFileSync("./inputs/day05.txt", {
  encoding: "utf8",
  flag: "r",
});
const inputArray = inputData.split("\n");
const [rangesArray, idArray] = [...divideInput(inputArray)];

function findAllFreshIngredients(rangesArray, idArray) {
  let foundFresh = [];
  
  for (let range of rangesArray) {
    const [rangeStart, rangeEnd] = [...range.split("-")];
    
    for (let id of idArray) {
      if (Number(id) >= Number(rangeStart) && Number(id) <= Number(rangeEnd)) {
        if (!foundFresh.includes(id)) {
          foundFresh.push(id);
          continue;
        }
      }
    }
  }
  return foundFresh.length;
}

function findAllFreshIds(rangesArray) {
  let idRanges = [];

  for (let newRange in rangesArray) {
   let [newRangeStart, newRangeEnd] = [...rangesArray[Number(newRange)].split("-")];

    idRanges.push({start: Number(newRangeStart), end: Number(newRangeEnd)});
  }

  // Join the old ranges if they're overlapping
  let canMerge;
  do {
    canMerge = false;
    for (let firstToMerge = 0; firstToMerge < idRanges.length; firstToMerge++){
      for (let secondToMerge = 0; secondToMerge < idRanges.length; secondToMerge++) {
        if (firstToMerge === secondToMerge) {
          continue;
        }
        let tryToMerge = compareAndJoinRanges(idRanges[firstToMerge], idRanges[secondToMerge]);
        if (tryToMerge) {
          canMerge = true;
          idRanges.splice(firstToMerge, 1, tryToMerge);
          idRanges.splice(secondToMerge, 1);
        }
      }
    }
  } while (canMerge);
  
  let numbersAmount = 0;
  for (let idRange of idRanges) {
    numbersAmount += (idRange.end - idRange.start + 1);
  }
  return numbersAmount;
}

// Add up the overlaying arrays
// Returns joined ranges if they can be joined or false if they cannot
function compareAndJoinRanges(range1, range2) {
  // If both ranges are equal, or second range fits within the first, return first range - first wholly includes second
  if (range2.start >= range1.start && range2.end <= range1.end) {
    return range1;
  }

  // If the second range begins before the first one but before the end of the first one:
  if (range2.start <= range1.start && range2.end >= range1.start && range2.end <= range1.end) {
    // - and if the second range ends after the first one, return the second range second wholly includes first
    if (range2.end >= range1.end) {
      return range2;
    }
    // - and if the second range ends within the first one, return a range that starts at the start or second, and ends at the end of first
    if (range2.end <= range2.end) {
      return {start: range2.start, end: range1.end};
    }
  }

  // If the second range begins within the first one, but ends after it
  if (range2.start >= range1.start && range2.start <= range1.end) {
    //if (range2.end >= range1.end) {
      return {start: range1.start, end: range2.end};
    //}
  }
  return false;
}

function divideInput(array) {
  const rangesArray = [];
  const idArray = [];
  let dividerFound = false;

  for(let item in array) {
    if(array[item] === "") {
      dividerFound = true;
      continue;
    }
    if (dividerFound) {
      idArray.push(array[item]);
    } else{
      rangesArray.push(array[item]);
    }
  }
  return [rangesArray, idArray];
}

console.log("Answer to Part 1 is:", findAllFreshIngredients(rangesArray, idArray))
console.log("Answer to Part 2 is:", findAllFreshIds(rangesArray))
