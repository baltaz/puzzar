import { stages } from "./stages.js";
import { getBlockColor } from "./utils.js";

const stage = document.querySelector(".stage");
const score = document.querySelector(".score");
let level = 0;
let points = 0;
let falling = false;
let grid = stages[level];
const selector = { row: 6, col: 7, selected: false };

const createBlock = (row, col, color) => {
  const block = document.createElement("div");
  block.classList.add("block");
  block.id = `${row}${col}`;
  block.style.gridArea = `${row + 1}/${col + 1}`;
  block.style.backgroundColor = getBlockColor(color);
  stage.appendChild(block);
};

const createMap = () => {
  for (let row = 0; row < 12; row++)
    for (let col = 0; col < 10; col++)
      if (grid[row][col]) createBlock(row, col, grid[row][col]);
};

const createSelector = () => {
  const selectorNode = document.createElement("div");
  selectorNode.classList.add("selector");
  selectorNode.style.gridArea = `${selector.row + 1}/${selector.col + 1}`;
  stage.appendChild(selectorNode);
  return selectorNode;
};

const toggleSelector = () => {
  selector.selected = !selector.selected;
  selectorNode.classList.toggle("selected");
};

const select = () => {
  if (selector.selected) toggleSelector();
  else if (grid[selector.row][selector.col] > 1) toggleSelector();
};

const deleteBlock = (row, col) => {
  document.getElementById(`${row}${col}`).remove();
  grid[row][col] = 0;
};

const checkMatch = (row, col) => {
  if (
    grid[row + 1][col] == grid[row][col] ||
    grid[row][col + 1] == grid[row][col] ||
    grid[row][col - 1] == grid[row][col]
  ) {
    if (grid[row + 1][col] == grid[row][col]) deleteBlock(row + 1, col);
    if (grid[row][col + 1] == grid[row][col]) deleteBlock(row, col + 1);
    if (grid[row][col - 1] == grid[row][col]) deleteBlock(row, col - 1);
    deleteBlock(row, col);
    toggleSelector();
    score.textContent = ++points;
  }
};

const updateGridArea = (newRow, newCol, oldRow, oldCol) => {
  const block = document.getElementById(`${oldRow}${oldCol}`);
  grid[newRow][newCol] = grid[oldRow][oldCol];
  grid[oldRow][oldCol] = 0;
  block.style.gridArea = `${newRow + 1}/${newCol + 1}`;
  block.id = `${newRow}${newCol}`;
};

const moveBlock = (row, col, direction) => {
  switch (direction) {
    case "down":
      updateGridArea(row + 1, col, row, col);
      break;
    case "right":
      updateGridArea(row, col + 1, row, col);
      break;
    case "left":
      updateGridArea(row, col - 1, row, col);
      break;
    default:
      break;
  }
};

const gravityFall = (row, col) => {
  if (!grid[row + 1][col]) {
    if (selector.row == row) {
      ++selector.row;
      selectorNode.style.gridArea = `${selector.row + 1}/${selector.col + 1}`;
    }
    moveBlock(row, col, "down");
    setTimeout((e) => {
      gravityFall(++row, col);
    }, 100);
  } else {
    falling = false;
    checkMatch(row, col);
  }
};

const checkCollision = (row, col, direction) => {
  let i = direction == "right" ? 1 : -1;
  if (!grid[row][col + i]) {
    moveBlock(row, col, direction);
    falling = true;
    col += i;
    selector.col += i;
    setTimeout((e) => {
      gravityFall(row, col);
    }, 100);
    for (let prevrow = row - 1; prevrow >= 0; prevrow--)
      if (grid[prevrow][col - i] > 1)
        setTimeout((e) => {
          gravityFall(prevrow, col - i);
        }, 100);
  }
};

const move = (direction) => {
  if (selector.selected) checkCollision(selector.row, selector.col, direction);
  else selector.col += direction == "right" ? 1 : -1;
};

document.addEventListener("keydown", (e) => {
  if (!falling) {
    switch (e.key) {
      case "ArrowUp":
        if (selector.row > 0 && !selector.selected && !falling)
          selector.row -= 1;
        break;
      case "ArrowDown":
        if (selector.row < 11 && !selector.selected && !falling)
          selector.row += 1;
        break;
      case "ArrowRight":
        if (selector.col < 9 && !falling) move("right");
        break;
      case "ArrowLeft":
        if (selector.col > 0 && !falling) move("left");
        break;
      case " ":
        select();
        break;
      default:
        break;
    }
    selectorNode.style.gridArea = `${selector.row + 1}/${selector.col + 1}`;
  }
});

createMap();
const selectorNode = createSelector();
