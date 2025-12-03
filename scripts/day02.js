const fs = require("fs");

const doubledNumbersRegex = /^(?<patt>\d+)\k<patt>$/;
const doubledNumbersRegexStep2 = /^(?<patt>\d+)\k<patt>+$/;

const inputData = fs.readFileSync("./inputs/day02.txt", {
  encoding: "utf8",
  flag: "r",
});

const answer1 = sumInvalidInString(inputData, doubledNumbersRegex);
const answer2 = sumInvalidInString(inputData, doubledNumbersRegexStep2);
console.log(`Answer to part one: ${answer1}`);
console.log(`Answer to part two: ${answer2}`);

function sumInvalidInString(str, regex) {
  const ranges = str.split(",");
  let totalInvalidSum = 0;

  for (let range of ranges) {
    const rangesIvalidEntrys = addUpInvalidInRange(range, regex);
    for (let entry in rangesIvalidEntrys) {
      totalInvalidSum += Number(rangesIvalidEntrys[entry]);
    }
  }
  return totalInvalidSum;
}

function addUpInvalidInRange(range, regexPattern) {
  const [start, end] = range.split("-");
  
  if (start[0] === "0" || end[0] === "0") {
    console.log("!")
    return [];
  }
  const invalidArray = returnOnlyInvalid(Number(start), Number(end), regexPattern);
  return invalidArray;
}

function returnOnlyInvalid(start, end, regexPattern) {
  let invalid = [];

  for (let i = start; i <= end; i++) {
    if (regexPattern.test(i)) {
      invalid.push(i);
    }
  }
  return invalid;
}