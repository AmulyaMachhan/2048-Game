let dialogHowTo = document.querySelector("#dialog-how-to");

let stopGame = false;

let arr = [];
let hasCombine = [];
let hasMove = true;
let score = 0;

for (var i = 0; i < 4; i++) {
    arr[i] = [];
    hasCombine[i] = [];
    for (var j = 0; j < 4; j++) {
        arr[i][j] = 0;
        hasCombine[i][j] = false;
    }
}

x = Math.floor(Math.random() * 4);
y = Math.floor(Math.random() * 4);

arr[x][y] = 2;

fill();


document.addEventListener("click", (event) => {
    const keyboardEventObject = {
        keyCode: 0, // example values.
    };
    const validButtons = ["up", "down", "left", "right"];
    if (validButtons.includes(event.target.name)) {
        switch (event.target.name) {
            
            case "up":
                keyboardEventObject.keyCode = 38;
            break;
            
            case "down":
                keyboardEventObject.keyCode = 40;
            break;
            
            case "left":
                keyboardEventObject.keyCode = 37;
            break;
            
            case "right":
                keyboardEventObject.keyCode = 39;
                break;
        }
    }
            
    if (keyboardEventObject.keyCode !== 0) {
        document.dispatchEvent(new KeyboardEvent("keydown", keyboardEventObject));
    }
});
        
document.addEventListener("keydown", keyPush);

function keyPush(evt) {
    if (dialogHowTo.open || stopGame) return;

    hasMove = false;
    switch (evt.keyCode) {

        case 37:
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    c = 0;
                    while (j - c > 0) {
                        if (arr[i][j - c - 1] == 0) {
                            swap(i, j - c, i, j - c - 1);
                        } else if (arr[i][j - c - 1] == arr[i][j - c]) {
                            combine(i, j - c, i, j - c - 1);
                        }
                        c++;
                    }
                }
            }
            fill();
            break;


        case 38:
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    c = 0;
                    while (i - c > 0) {
                        if (arr[i - c - 1][j] == 0) {
                            swap(i - c, j, i - c - 1, j);
                        } else if (arr[i - c - 1][j] == arr[i - c][j]) {
                            combine(i - c, j, i - c - 1, j);
                        }
                        c++;
                    }
                }
            }
            fill();
            break;


        case 39:
            for (var i = 0; i < 4; i++) {
                for (var j = 3; j >= 0; j--) {
                    c = 0;
                    while (j + c < 3) {
                        if (arr[i][j + c + 1] == 0) {
                            swap(i, j + c, i, j + c + 1);
                        } else if (arr[i][j + c + 1] == arr[i][j + c]) {
                            combine(i, j + c, i, j + c + 1);
                        }
                        c++;
                    }
                }
            }
            fill();
            break;

        case 40:
            for (var i = 3; i >= 0; i--) {
                for (var j = 0; j < 4; j++) {
                    c = 0;
                    while (i + c < 3) {
                        if (arr[i + c + 1][j] == 0) {
                            swap(i + c, j, i + c + 1, j);
                        } else if (arr[i + c + 1][j] == arr[i + c][j]) {
                            combine(i + c, j, i + c + 1, j);
                        }
                        c++;
                    }
                }
            }
            fill();
            break;
    }
}

function fill() {
    if (!isFull()) {
        if (hasMove) randomXY();
    }
    if (isFull()) {
        if (isGameOver()) {
            document.getElementById("gameOver").style.display = "block";

            arr = arr.map((line, lineIndex) =>
                line.map((item, itemIndex) => {
                if (lineIndex === 0 || lineIndex === arr.length - 1) return "";
                return ["GAME", "OVER"][lineIndex - 1][itemIndex];
                })
            );

            stopGame = true;
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            temp = document.getElementById(i + "" + j);

            if (arr[i][j] != 0) {
                const value = arr[i][j];

                temp.innerHTML = value;
                temp.classList = [`_${value <= 2048 ? value : "greater-than-2048"}`];
            } else {
                temp.innerHTML = "";
                temp.classList = [];
            }
        }
    }
    resetHasCombine();
}

function randomXY() {
    do {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
    } while (arr[x][y] != 0);

    z = Math.ceil(Math.random() * 10);

    if (z >= 7) arr[x][y] = 4;
    else arr[x][y] = 2;
}

function swap(a, b, x, y) {
    if (arr[a][b] != 0 || arr[x][y] != 0) {
        temp = arr[a][b];
        arr[a][b] = arr[x][y];
        arr[x][y] = temp;
        hasMove = true;
    }
}

function combine(a, b, x, y) {
    if (!hasCombine[x][y] && !hasCombine[a][b]) {
        arr[x][y] += arr[x][y];
        arr[a][b] = 0;
        hasCombine[x][y] = true;
        hasMove = true;
        score += arr[x][y];
        document.getElementById("num-score").innerHTML = score;
    }
}

function resetHasCombine() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            hasCombine[i][j] = false;
        }
    }
}

function isFull() {
    full = true;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 0) {
                full = false;
                break;
            }
        }
        if (!full) break;
    }
    return full;
}

function isGameOver() {
    gameOver = true;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        if (i > 0) {
            if (arr[i - 1][j] == arr[i][j]) {
                gameOver = false;
                break;
            }
        }
        if (j > 0) {
            if (arr[i][j - 1] == arr[i][j]) {
                gameOver = false;
                break;
            }
        }
        if (i < 3) {
            if (arr[i + 1][j] == arr[i][j]) {
                gameOver = false;
                break;
            }
        }
        if (j < 3) {
            if (arr[i][j + 1] == arr[i][j]) {
                gameOver = false;
                break;
            }
        }
        }
        if (!gameOver) break;
    }

    return gameOver;
}

function restart() {
// Reset game state
    arr = [];
    hasCombine = [];
    hasMove = true;
    stopGame = false;
    score = 0;

    // Initialize the game board
    for (let i = 0; i < 4; i++) {

        arr[i] = [];
        hasCombine[i] = [];

        for (let j = 0; j < 4; j++) {
            arr[i][j] = 0;
            hasCombine[i][j] = false;
        }
    }

    // Generate a new tile
    generateNewTile();

    // Hide game over message
    document.getElementById("gameOver").style.display = "none";

    // Update the score display
    updateScoreDisplay();

    // Update the game board display
    updateGameBoardDisplay();
}

function generateNewTile() {
// Generate a new tile (either 2 or 4) at a random empty position
    let emptyPositions = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] === 0) {
                emptyPositions.push({ x: i, y: j });
            }
        }
    }

    if (emptyPositions.length > 0) {
        const randomPosition =
        emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        const newValue = Math.random() < 0.9 ? 2 : 4;
        arr[randomPosition.x][randomPosition.y] = newValue;
    }
}

function updateScoreDisplay() {
    // Update the displayed score
    document.getElementById("num-score").innerHTML = score;
}

function updateGameBoardDisplay() {
    // Update the game board display based on the current state of the game array
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tileElement = document.getElementById(i + "" + j);
            tileElement.innerHTML = arr[i][j] !== 0 ? arr[i][j] : "";
            tileElement.className =
                arr[i][j] !== 0
                ? `_${arr[i][j] <= 8192 ? arr[i][j] : "greater-than-8192"}`
                : "";
        }
    }
}

function onClickBtnHowTo() {
    dialogHowTo.showModal();
}

function closeHowToDialog() {
    dialogHowTo.close();
}

// Theme Update
const switchTheme = () => {

    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme;
  
    newTheme = (dataTheme === 'light') ? 'dark' : 'light';
  
    rootElem.setAttribute('data-theme' , newTheme)
  
    localStorage.setItem('theme' , newTheme)
}
document.querySelector("#theme-switcher").addEventListener('click' , switchTheme);
