
document.addEventListener("DOMContentLoaded", function () {
  
  setupPage();

});

function setupPage(){
  const table = document.getElementById("sudoku");
  let grid, cell;
  
  for (let i = 0; i < 9; i++){
    grid = document.createElement("tr");
    grid.className = "grid-row";
    for(let j = 0; j < 9; j++){

      cell = document.createElement("td");
      cell.className = "grid-cell";
      
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = "1";
      input.className = "sudoku-input";
      input.id = "c" + ((i*9)+j);

      input.addEventListener("input", () => {
        const index = input.id.split('c')[1];
        const row = index < size ? 0 : Math.floor(index / size);
        const col = index < size ? index : index % size;
        board[row][col] = input.value;

      })

      cell.appendChild(input);

      grid.append(cell);
    }
    table.append(grid);
  }

  generate(30);
}


const size = 9;
let solution, locked, board;
const randomNum = (n) => Math.floor(Math.random() * n);

function generate(n) {
  let sudoku = document.getElementById("sudoku");
  let messageBox = document.getElementById("message-box");

  sudoku.classList.remove("success", "fail");
  messageBox.style.display = "none";

  solution = Array(size).fill().map(() => Array(size).fill(0));
  board = Array(size).fill().map(() => Array(size).fill(0));

  locked = Array(81).fill(false);

  //Helper function to create clues
  fillLocked(n, locked);
  //Creates a valid solution
  createFullBoard(solution);
  //Creates a partiallly solved board
  functionCaller(keepLocked, board);

  functionCaller(updateView, board);
}

const solve = () => functionCaller(updateView, solution);
const keepLocked = (index, i, j, array) => array[i][j] = locked[index] ? solution[i][j] : "";
const updateView = (index, i, j, array) => {
  document.getElementById("c" + index).value = array[i][j] == 0 ? "" : array[i][j];
  board[i][j] = array[i][j] == 0 ? "" : array[i][j];
}
const validate = () => {
  let cell, valid = true, index1D = 0;

    for (let i = 0; i < size && valid; i++) {
      for (let j = 0; j < size && valid; j++) {
        index1D = i * 9 + j;
        
        valid = validateCell(i, j);
  
      }
    }
  
  let sudoku = document.getElementById("sudoku");
  let messageBox = document.getElementById("message-box");

  sudoku.classList.remove("success", "fail");

  if (valid) {
    messageBox.textContent = "Sudoku is valid!";

    sudoku.classList.add("success");

  } else {
    messageBox.textContent = "Sudoku is invalid";

    sudoku.classList.add("fail");

  }
  messageBox.style.display = "block";

};

function validateCell(row, col){

  const inRow = getInRow(board, row);
  let inBox = Array();
  let inCol = Array();
  getInBox(board, row, col, inBox);
  getInCol(board, col, inCol);

  const cellValue = board[row][col];

  const occurances = (arr, value) => arr.filter(item => item == value).length;

  const occ = occurances(inRow, cellValue) + occurances(inCol, cellValue) + occurances(inBox, cellValue);

  return occ == 3;

}

function functionCaller(func, param) {
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      index1D = i * 9 + j;
      
      func(index1D, i, j, param);

    }
  }
}


function createFullBoard(boardArr) {
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
const ceilFunction = (num) => num - (num % 3);

const getInRow = (arr, i) => arr[i].filter((n) => n > 0);

const getInCol = (arr, col, newArr) => {
  arr.forEach((row) => {
    let num = row[col];
    if (num > 0) {
      newArr.push(num);
    }
  });
};

const getInBox = (boardArr, row, col, inBox) => {
  const checkRow = ceilFunction(row),
  checkCol = ceilFunction(col);

  for (let i = checkRow; i < checkRow + 3; i++) {
    for (let j = checkCol; j < checkCol + 3; j++) {
      inBox.push(boardArr[i][j]);
    }
  }
};
const filterArray = (arr1, arr2) => arr1.filter((value) => arr2.includes(value));

function getCellChoice(boardArr, row, col) {


  const inRow = getInRow(boardArr, row);
  const inCol = Array();
  getInCol(boardArr, col, inCol);

  const inBox = Array();
  getInBox(boardArr, row, col, inBox);


  const fillFunction = (array) =>
    Array.from({ length: size }, (value, index) =>
      array.includes(index + 1) ? 0 : index + 1
    );

  const rowChoices = fillFunction(inRow);
  const colChoices = fillFunction(inCol);
  const boxChoices = fillFunction(inBox);


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
