const stage = document.querySelector(".stage");
const blocks = [];
const blocksData = [];
const map = 0;
const selectorData = {
    row:1,
    column:1,
    selected: false
}

let selectedBlock = null;

const stages =
[
    [
        {row:1,column:2,color:"gray"},
        {row:2,column:4,color:"gray"},
        {row:3,column:5,color:"red"},
        {row:4,column:6,color:"blue"},
        {row:1,column:3,color:"red"}
    ],
    [
        {row:2,column:8,color:"gray"},
        {row:2,column:2,color:"gray"},
        {row:4,column:5,color:"red"},
        {row:2,column:1,color:"blue"},
        {row:5,column:5,color:"red"}
    ],
]

const createBlock = (blockData) =>{
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.gridArea=`${blockData.row}/${blockData.column}`;
    block.style.backgroundColor=blockData.color;
    stage.appendChild(block);
    blocks.push(block);
    blocksData.push(block);
}


const createMap = level =>{
    blocks.forEach(block=>{
        block.remove();
        blocks.shift;
    });
    stages[level].forEach(e=>createBlock(e))
}

const createSelector = () =>{
    const selector = document.createElement("div");
    selector.classList.add("selector");
    stage.appendChild(selector);
    return selector;
}


createMap(map);
const selector = createSelector()

const select = () =>{
    if(selectorData.selected){
        selectorData.selected = false;
        selector.classList.remove("selected");
        selectedBlock=null;
    }else{
        blocks.forEach(block=>{                                 //check with for
            let blockCol = block.style.gridColumn[0];
            let blockRow = block.style.gridRow[0];
            if(blockCol == selectorData.column && blockRow==selectorData.row){
                selectedBlock=block;
                selectorData.selected = true;
                selector.classList.add("selected");
            }
        })
    }
}

const move = direction =>{ //CODE REVIEW!!!!
    switch (direction) {
        case "up":
            if(selectorData.row>1){
                selectorData.row -=1;
                if(selectedBlock){
                    selectedBlock.style.gridArea = `${Number(selectedBlock.style.gridRow[0])-1}/${selectedBlock.style.gridColumn}`
                    console.log(selectedBlock.style.gridArea);
                    console.log(selectorData.row+" y "+selectorData.column);
                }
            }
            break;
        case "right":
            if(selectorData.column<10){
                selectorData.column +=1
                if(selectedBlock){
                    selectedBlock.style.gridArea = `${Number(selectedBlock.style.gridRow[0])}/${Number(selectedBlock.style.gridColumn[0])+1}`
                    console.log(selectedBlock.style.gridArea);
                    console.log(selectorData.row+" y "+selectorData.column);
                }
            }
            break;
        case "down":
            if(selectorData.row<10){
                selectorData.row +=1
                if(selectedBlock){
                    selectedBlock.style.gridArea = `${Number(selectedBlock.style.gridRow[0])+1}/${selectedBlock.style.gridColumn}`
                    console.log(selectedBlock.style.gridArea);
                    console.log(selectorData.row+" y "+selectorData.column);
                }
            }
            break;
        case "left":
            if(selectorData.column>1){
                selectorData.column -=1
                if(selectedBlock){
                    selectedBlock.style.gridArea = `${Number(selectedBlock.style.gridRow[0])}/${Number(selectedBlock.style.gridColumn[0])-1}`
                    console.log(selectedBlock.style.gridArea);
                    console.log(selectorData.row+" y "+selectorData.column);
                }
            }
            break;
    }
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
    selector.style.gridArea=`${selectorData.row}/${selectorData.column}`;
})


//move a block
//collapse blocks (limits)
//collapse blocks same color (POINT)
//gravity
//reset level
//score
//open stages from JSON