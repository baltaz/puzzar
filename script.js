import {stages} from './stages.js';
import {getBlockColor} from './utils.js';

const stage = document.querySelector(".stage");
let level = 0;
let points = 0;

const selector = { row:0, column:0, selected: false}

const createMap = () =>{
    for (let row = 0; row<12; row++) {
        for(let column=0; column<10; column++){
            const block = document.createElement("div");
            block.classList.add("block");
            block.id=`${row}${column}`;
            block.draggable=true;
            block.style.gridArea=`${row+1}/${column+1}`;
            block.style.backgroundColor = getBlockColor(grid[row][column]);
            stage.appendChild(block);
        }
    }
}

const createSelector = () =>{
    const selectorNode = document.createElement("div");
    selectorNode.classList.add("selector");
    selectorNode.style.gridArea=`${selector.row+1}/${selector.column+1}`;
    stage.appendChild(selectorNode);
    return selectorNode;
}

const select = () =>{
    if(selector.selected){
        selector.selected = false;
        selectorNode.classList.remove("selected");
    }else{
        const block = grid[selector.row][selector.column];
        if(block && block!=9){
            selector.selected = true;
            selectorNode.classList.add("selected");
        }
    }
}

const editBlock = (row,column,colorId) =>{
    const block = document.getElementById (`${row}${column}`)
    block.style.backgroundColor = getBlockColor(colorId);
}
const swapBlocks = (row,column,blockColor,direction) =>{ //unificar swap / gravity y checkCollision?
    if(direction=="down"){
        editBlock(row+1,column,blockColor);
        grid[row+1][column]=grid[row][column];
    }else{
        let i = (direction=="right")? 1 : -1;
        editBlock(row,column+i,blockColor);
        grid[row][column+i]=grid[row][column];
    }
    editBlock(row,column,0);
    grid[row][column]=0;
}

const gravityFall = (row, column, blockColor)=>{ //agregar un dalay en la caida
    let stop =false // to stop for when all blocks falled
    for (; !stop ; row++) { //refactor
        if(!(grid[row+1][column])){
            if(selector.row==row) selector.row++; //si no es el bloque movido
            swapBlocks(row,column,blockColor,"down"); 
        }else{
            stop = true;
        }
    }
    checkMatch(row-1, column, blockColor);
}

const checkCollision = (row, column, direction)=>{
    let i = (direction=="right")? 1 : -1;
    if(!(grid[row][column+i])){
        swapBlocks(row, column, grid[row][column],direction); //unificar SWAP con gravity
        for (let prevrow=row; prevrow > 1; prevrow--) {
            if(grid[prevrow-1][column] && grid[prevrow-1][column]!=9){
                gravityFall(prevrow-1,column, grid[prevrow-1][column])
            }
        }
        column +=i;
        selector.column +=i;
        gravityFall(row, column, grid[row][column]);            //maybe i can unifique with the previous for
        //checkear para todos los bloques si hay matching
    }
}


const deleteBlock = (row,column)=>{
    editBlock(row,column,0);
    grid[row][column]=0;
}


const checkMatch = (row, column, colorBlock) =>{
    if((grid[row+1][column]==colorBlock) || (grid[row][column+1]==colorBlock) || (grid[row][column-1]==colorBlock)){
        if(grid[row+1][column]==colorBlock){
            deleteBlock(row+1,column);
            deleteBlock(row,column);                      
        }
        if(grid[row][column+1]==colorBlock){
            deleteBlock(row,column+1);
            deleteBlock(row,column);
        }
        if(grid[row][column-1]==colorBlock){
            deleteBlock(row,column-1);
            deleteBlock(row,column);
            selector.selected=false;
        }
        selector.selected=false;                            //crear funcion "descelect"
        selectorNode.classList.remove("selected");          //crear funcion "descelect"
        const score = document.querySelector(".score");
        score.textContent = ++points;
    }
}



const move = direction =>{
    switch (direction) {
        case "up": if(selector.row>0 && !selector.selected)selector.row -=1; break;
        case "down": if(selector.row<11 && !selector.selected)selector.row +=1; break;
        case "right": //UNIFICAR EN UNA MISMA FUNCION RIGHT Y LEFT SOLO CAMBIA +/-1
            if(selector.column<9)
                if(selector.selected) checkCollision(selector.row,selector.column,"right");
                else selector.column +=1;
            break;
        case "left":
            if(selector.column>0)
                if(selector.selected) checkCollision(selector.row,selector.column,"left");
                else selector.column -=1;
            break;
    }
    selectorNode.style.gridArea=`${selector.row+1}/${selector.column+1}`;
}

document.addEventListener("keydown", e=>{
    switch (e.key) {
        case "ArrowUp": move("up");break;
        case "ArrowRight": move("right");break
        case "ArrowDown": move("down");break
        case "ArrowLeft": move("left");break
        case " ": select(); break; //spacebar
        default: break;
    }
})

//RUN
let grid = stages[level];
createMap();
const selectorNode = createSelector();

//disapear collapsed blocks with same color (POINT)
//////////////////////////////////////
//let move selector only on block != 9
//pending blocks panel
//score panel
//combos