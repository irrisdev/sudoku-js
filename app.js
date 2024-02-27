$(document).ready(function () {
    $("input").focus(function () {
      $(this).css({"outline": "none"});
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

