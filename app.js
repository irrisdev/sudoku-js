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

  for (let i = 1; i <= 9; i++) {
    sub_grid = document.createElement("div");
    sub_grid.className = "subgrid";
    sub_grid.id = "g" + i;

    for (let j = 1; j <= 9; j++) {
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

generate(30);

function generate(n) {
  const board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  const locked = Array(81).fill(false);

  fillLocked(n, locked);
  fillBoard(locked, board);

  console.log(locked);
}

function solve() {}


function fillBoard(lockedArr, boardArr){
  let row, col, nChoices, rolled, location, index = -1;
  const choices = Array(81);
  while(index < 80){

    index++;
    row = index < 9 ? 0 : Math.floor(index / 9);
    col = index < 9 ? index : index % 9;

    if(boardArr[row][col] == 0) {
      choices[index] = getCellChoice(boardArr, row, col);
    }

    nChoices = choices[index].length;
    console.log(nChoices);
  }

}

function getCellChoice(boardArr, row, col){
  const ceilFunction = (num) => num - (num % 3);
  let choices, rowChoices, colChoices, boxChoices, checkRow = ceilFunction(row), checkCol = ceilFunction(col);
  
  rowChoices = boardArr[row].filter((n) => n > 0);
  colChoices = boardArr.filter((arr) => arr[col] > 0);

  boxChoices = new Array();
  for (let i = checkRow; i < checkRow+3; i++){
    for (let j = checkCol; j < checkCol+3; j++){
      boxChoices.push(boardArr[i][j]);
    }
  }

  //TODO
  return choices;
}

function fillLocked(clues, locked) {
  for (let i = 0; i < clues; i++) {
    let location = Math.floor(Math.random() * 81);

    while (locked[location] == true) {
      location = Math.floor(Math.random() * 81);
    }
    locked[location] = true;
  }
}
