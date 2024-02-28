$(document).ready(function () {
  $("input").focus(function () {
    $(this).css({ outline: "none" });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("main-board");
  let sub_grid;
  let grid_item;
  let counter = 1;

  for (let i = 1; i <= size; i++) {
    sub_grid = document.createElement("div");
    sub_grid.className = "subgrid";
    sub_grid.id = "g" + i;

    for (let j = 1; j <= size; j++) {
      grid_item = document.createElement("input");
      grid_item.type = "text";
      grid_item.style.border = "none";
      grid_item.style.textAlign = "center";
      grid_item.className = "grid-item i" + counter;
      grid_item.value = j;

      sub_grid.append(grid_item);
      counter++;
    }

    root.append(sub_grid);
  }
});

const size = 9;
const randomNum = (n) => Math.floor(Math.random() * n);
let board, locked;

generate(30);

function generate(n) {
  board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));
  locked = Array(81).fill(false);

  fillLocked(n, locked);
  fillBoard(locked, board);



}

function solve() {}

function fillBoard(boardArr) {
  let row,
    col,
    nChoices,
    rolled,
    index = -1;
  let choices = Array();

  const get2Dindex = () => {
    row = index < size ? 0 : Math.floor(index / size);
    col = index < size ? index : index % size;
  };

  while (index < 80) {
    index++;
    get2Dindex();
    if (boardArr[row][col] == 0) {
      choices[index] = getCellChoice(boardArr, row, col);
    }

    nChoices = choices[index].length;

    while (nChoices == 0) {
      index--;
      nChoices = choices[index].length;
      get2Dindex();
      boardArr[row][col] = 0;
    }
    rolled = choices[index][randomNum(nChoices)];

    choices[index].splice(choices[index].indexOf(rolled), 1);
    
    boardArr[row][col] = rolled;
  }
}

function getCellChoice(boardArr, row, col) {
  const ceilFunction = (num) => num - (num % 3);
  const checkRow = ceilFunction(row),
    checkCol = ceilFunction(col);

  const inRow = boardArr[row].filter((n) => n > 0);
  const inCol = Array();
  boardArr.forEach((row) => {
    let num = row[col];
    if (num > 0) {
      inCol.push(num);
    }
  });
  const inBox = Array();
  for (let i = checkRow; i < checkRow + 3; i++) {
    for (let j = checkCol; j < checkCol + 3; j++) {
      inBox.push(boardArr[i][j]);
    }
  }

  const fillFunction = (array) =>
    Array.from({ length: size }, (value, index) =>
      array.includes(index + 1) ? 0 : index + 1
    );

  const rowChoices = fillFunction(inRow);
  const colChoices = fillFunction(inCol);
  const boxChoices = fillFunction(inBox);

  const filterArray = (arr1, arr2) =>
    arr1.filter((value) => arr2.includes(value));
  let choices = filterArray(rowChoices, colChoices);
  choices = filterArray(choices, boxChoices);
  while (choices.includes(0)) {
    choices.splice(choices.indexOf(0), 1);
  }
  return choices;
}

function fillLocked(clues, locked) {
  for (let i = 0; i < clues; i++) {
    let location = randomNum(81);

    while (locked[location] == true) {
      location = randomNum(81);
    }
    locked[location] = true;
  }
}
