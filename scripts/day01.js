const fs = require("fs");

const dialMaxPos = 99;
const dialMinPos = 0;
const dialStartPos = 50;

const inputData = fs.readFileSync("./inputs/day01.txt", {
  encoding: "utf8",
  flag: "r",
});
const inputDataArray = inputData.split("\n");

const answers = safeDecoder(inputDataArray, dialStartPos);
console.log(`Answer to part one: ${answers[0]}`);
console.log(`Answer to part two: ${answers[1]}`);

function safeDecoder(arr, startPoint) {
  let turns = mapInput(arr);
  let currentPosition = startPoint;
  let wentThroughZero = 0;
  let stoppedAtZero = 0;

  for (let turn in turns) {
    afterTurning = turnDial(
      dialMaxPos,
      dialMinPos,
      currentPosition,
      turns[turn]
    );
    currentPosition = afterTurning[0];
    wentThroughZero += afterTurning[1];

    if (currentPosition === 0) {
      stoppedAtZero++;
    }
  }

  return [stoppedAtZero, wentThroughZero];
}

function mapInput(arr) {
  return arr.map((element) => {
    const clicks = element.slice(1);
    return element[0] === "L" ? clicks * -1 : +clicks;
  });
}

function turnDial(maxPos, minPos, currentPos, turn) {
  let newPos = currentPos;
  let clicks = 0;

  for (let i = 0; i < Math.abs(turn); i++) {
    if (turn > 0) {
      newPos++;
    } else if (turn < minPos) {
      newPos--;
    }

    if (newPos < 0) {
      newPos = 99;
    } else if (newPos > maxPos) {
      newPos = 0;
    }

    if (newPos === 0) {
      clicks++;
    }
  }

  return [newPos, clicks];
}
