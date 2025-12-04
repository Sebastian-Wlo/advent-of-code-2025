const fs = require("fs");

const inputData = fs.readFileSync("./inputs/day04.txt", {
  encoding: "utf8",
  flag: "r",
});
const inputArray = inputData.split("\n");

// Check each row for moveable rolls and sum up the result
function getAllMoveableRolls(array, allowedNeighbors, charToCount) {
  let totalMoveable = 0;
  for (let posY in array) {
    totalMoveable+= checkRowForMoveableRolls(array, posY, allowedNeighbors, charToCount);
  }
  return totalMoveable;
}

function clearUpMoveableRolls(array, allowedNeighbors, charToCount) {
  let clonedArray = array.map(x => x);
  let moved = 0;
  let stillPossible = getAllMoveableRolls(clonedArray, 4, "@");

  while (stillPossible > 0) {
    let newArray = [];
    stillPossible = getAllMoveableRolls(clonedArray, 4, "@");;
    
    for (let posY in clonedArray) {
      const rowMoveableRolls = returnRowMoveableRolls(clonedArray, posY, allowedNeighbors, charToCount);
      let newRow = clonedArray[posY].split("");
      if (rowMoveableRolls.length > 0) {
        for (let posX in rowMoveableRolls) {
          newRow[rowMoveableRolls[posX]] = ".";
          moved++;
        }
      }
      newArray.push(newRow.join(""));
    }
    clonedArray = newArray;
  }
  return moved;
}

function returnRowMoveableRolls(array, posY, allowedNeighbors, charToCount) {
  let moveableRolls = [];

  for (let posX in array[posY]) {
    if (!isSpaceOccupied(array, Number(posY), Number(posX))) {
      continue;
    }
    if (canRollBeMoved(array, Number(posY), Number(posX), Number(allowedNeighbors), charToCount)) {
      moveableRolls.push(Number(posX));
    }
  }
  return moveableRolls;
}

function checkRowForMoveableRolls(array, posY, allowedNeighbors, charToCount) {
  let moveableRolls = 0;

  for (let posX in array[posY]) {
    if (!isSpaceOccupied(array, Number(posY), Number(posX))) {
      continue;
    }
    if (canRollBeMoved(array, Number(posY), Number(posX), Number(allowedNeighbors), charToCount)) {
      moveableRolls++;
    }
  }
  return moveableRolls;
}

function isSpaceOccupied (array, posY, posX) {
  return array[posY][posX] === "." ? false : true;
}

function canRollBeMoved (array, posY, posX, allowedNeighbors, charToCount) {
  const neighborhood = getAllPosNeighbors(array, posY, posX);
  const stringNeighborhood =getNestedArraysAsString(neighborhood);
  const occupiedSpacesAround = countCharInString(stringNeighborhood, charToCount);
  return  allowedNeighbors > occupiedSpacesAround;
}

function getAllPosNeighbors (array, posY, posX) {
  const neighborhood = [];

  for (let neighboringY = posY - 1; neighboringY <= posY + 1; neighboringY++) {
    const currentRow = [];
    for (let neighboringX = posX - 1; neighboringX <= posX + 1; neighboringX++) {
      // Treat all positions outside the array as empty spaces
      if (
        neighboringY < 0 ||
        neighboringY >= array.length ||
        neighboringX < 0 ||
        neighboringX >= array[posY].length
      ) {
        currentRow.push(".");
        continue;
      }
      // Don't include the actual position (middle) 
      if (neighboringX === posX && neighboringY === posY) {
        currentRow.push("X");
        continue;
      }
      currentRow.push(array[neighboringY][neighboringX]);
    }
    neighborhood.push(currentRow);
  }
  return neighborhood;
}

function getNestedArraysAsString (arr) {
  let returnString = "";
  for (let nested of arr) {
    returnString += nested.reduce((item, acc) => acc + item, "");
  }
  return returnString;
}

function countCharInString (string, char) {
  let counter = 0;
  for (let c in string) {
    if (string[c] === char) {
      counter++;
    }
  }
  return counter;
}

console.log("Answer to Part 1 is:", getAllMoveableRolls(inputArray, 4, "@"))
console.log("Answer to Part 2 is:", clearUpMoveableRolls(inputArray, 4, "@"))