import rl from "./readInputFromUser";

function findObject(cellArr:Cell[], target: Cell){
        const isPresent = cellArr.some((cell)=>{
                return cell.col === target.col && cell.row=== target.row && cell.type === target.type;
            });
        return isPresent;
}

function getCellType(typeStr: string):CellType {
    switch (typeStr.toUpperCase()) {
        case 'HOME': return CellType.HOME;
        case 'SHOP': return CellType.SHOP;
        case 'TEMPLE': return CellType.TEMPLE;
        case 'ROCK': return CellType.ROCK;
        default: return CellType.EMPTY; // Default to EMPTY if the type is not recognized
    }
}

class Cell {
    row: number;
    col: number;
    type: CellType;
    constructor(row: number, col: number, type: CellType=CellType.EMPTY){
        this.row = row;
        this.col = col;
        this.type = type;
    }
}

enum CellType {
    'HOME',
    'SHOP',
    'TEMPLE',
    'ROCK',
    'EMPTY'
}

const arr:Cell[] = [];
for(let i =0;i<3;i++){
    arr.push(new Cell(i, i+1));
}

async function checkObjects(){
    while(true){
        const data:string = await new Promise(resolve => {
            rl.question("Provide Row, Col and Cell Type: ", resolve);
        });
        const dataArr:string[] = data.split(',');
        let target = new Cell(Number(dataArr[0]), Number(dataArr[1]), getCellType(dataArr[2]));
        if(dataArr.length>0){
            console.log(findObject(arr, target));
        }
    }
}

checkObjects();