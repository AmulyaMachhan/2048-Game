let board ;
let rows = 4;
let cols = 4;
let score = 0 ;

window.onload = () => {
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    // board = [
    //     [64,16,16,16],
    //     [16,8,8,8],
    //     [4,4,4,4],
    //     [2,2,2,2]
    // ];

    for(let r = 0 ; r < rows ; r++){
        for(let c = 0 ; c < cols ; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile , num);
            document.getElementById('board').append(tile)
        }
    }

    setTwo();
    setTwo();

}

function updateTile(tile , num){
    tile.innerText = "";
    tile.classList.value = "";

    tile.classList.add("tile");

    if(num > 0){
        tile.innerText = num.toString();

        if(num <= 4096){
            tile.classList.add('x' + num.toString());
        }else{
            tile.classList.add('x8192')
        }
    }
}

const timeOut = setTimeout(() => {
    document.addEventListener('keyup', (e) => {
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        } else if (e.code == "ArrowRight") {
            slideRight();
            setTwo()
        } else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
        } else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }
    
        // Update score display
        document.getElementById('score').innerText = score;
    });    
},1000);

function filterZeroes(row){
    return row.filter(num=> num != 0);
}

function slide(row){
    row = filterZeroes(row);

    for(let i = 0; i < row.length - 1 ; i++ ){
        if(row[i] == row[i+1]){
            row[i] = row[i]*2;
            row.splice(i + 1, 1);
            score += row[i]
        }
    }

    row = filterZeroes(row);

    while(row.length < cols){
        row.push(0)
    }

    return row;
}

function slideLeft(){
    for(let r = 0 ; r < rows ; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c =0 ; c < cols ; c++){
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile , num)
        }
    }
}

function slideRight(){
    for(let r = 0 ; r < rows ; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c =0 ; c < cols ; c++){
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile , num)
        }
    }
}

function slideUp(){
    for(let c = 0 ; c < cols ; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for(let r = 0 ; r < rows ; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile , num)
        }
    }
}

function slideDown(){
    for(let c = 0 ; c < cols ; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r = 0 ; r < rows ; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile , num)
        }
    }
}

function setTwo(){
    if(!hasEmptyTile){
        return;
    }

    let found = false;
    while(!found){

        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*cols);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = "2";
            tile.classList.add('x2');

            found = true;
        }
    }
}

function hasEmptyTile(){
    for(let r = 0 ; r < rows ; r++){
        for(let c = 0 ; c < cols ; c++){
            if(board[r][c] == 0){
                return true
            }
        }
    }
    return false;
}

