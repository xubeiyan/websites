const questionTextElement = document.querySelector('.question-text');

const questionTableElement = document.querySelector('.question-table');
const messageArea = document.querySelector('.message');
const solveButton = document.querySelector('.solver');
const clearButton = document.querySelector('.clear');

const COL_NUM = 9;
const ROW_NUM = 9;
const START_NUM = 1;
const END_NUM = 9;

const validTexts = "123456789.";

for (let i = 1; i <= COL_NUM * ROW_NUM; ++i) {
    let e = document.createElement("input")
    e.setAttribute('maxLength', 1);
    questionTableElement.appendChild(e);
}

const questionTableCell = document.querySelectorAll('.question-table>input');

let sudokuArray = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

function nextEmptySpot(sudokuArray) {
    for (let i = 0; i < ROW_NUM; ++i) {
        for (let j = 0; j < COL_NUM; ++j) {
            if (sudokuArray[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function checkRow(sudokuArray, row, value) {
    for (let i = 0; i < sudokuArray[row].length; ++i) {
        if (sudokuArray[row][i] === value) {
            return false;
        }
    }
    return true;
}

function checkCol(sudokuArray, col, value) {
    for (let i = 0; i < sudokuArray.length; ++i) {
        if (sudokuArray[i][col] === value) {
            return false;
        }
    }
    return true;
}

function checkSquare(sudokuArray, row, col, value) {
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; ++r) {
        for (let c = 0; c < 3; ++c) {
            if (sudokuArray[boxRow + r][boxCol + c] === value) {
                return false;
            }
        }
    }
    return true;
}

function checkValue(sudokuArray, row, col, value) {
    if (checkRow(sudokuArray, row, value) && 
        checkCol(sudokuArray, col, value) && 
        checkSquare(sudokuArray, row, col, value)) {
        return true;
    }
    return false;
}

function solve(sudokuArray) {
    let cord = nextEmptySpot(sudokuArray);
    let row = cord[0];
    let col = cord[1];

    if (row == -1) {
        return sudokuArray;
    }

    for(let num = 1; num <= 9; ++num) {
        if (checkValue(sudokuArray, row, col, num)) {
            sudokuArray[row][col] = num;
            solve(sudokuArray);
        }
    }

    if (nextEmptySpot(sudokuArray)[0] !== -1) {
        sudokuArray[row][col] = 0;
    }
}

function fillTable() {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            questionTableCell[i*9 + j].value = sudokuArray[i][j];
            //console.log(`table[${i*9+j}] fill with ${sudokuArray[i][j]}`)
        }
    }
}

function fillSudokuArray() {
    for (let i = 0; i < questionTableCell.length; ++i) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        let value = 0;
        if (questionTableCell[i].value !== '') {
            value = parseInt(questionTableCell[i].value);
            if (checkValue(sudokuArray, row, col, value)) {
                sudokuArray[row][col] = value;
            } else {
                return false;
            }
        }
    }
    return true;
}

function fillTableFromText() {
    let flag = true;
    
    [...questionTextElement.value].forEach(ele => {
        if (!validTexts.includes(ele)) {
            messageArea.innerText = "填入数据中有不属于1~9和.的字符";
            flag = false;
        }
    });

    if (questionTextElement.value.length !== COL_NUM * ROW_NUM) {
        messageArea.innerText = `填入数据长度不为${COL_NUM * ROW_NUM}，
            当前为${questionTextElement.value.length}`;
        flag = false;
    }

    [...questionTextElement.value].forEach((ele, index) => {
        if (ele !== '.') {
            questionTableCell[index].value = ele;
            questionTableCell[index].classList.add('modify');
        }
    });

    return flag;
}

function fillTextFromTable() {
    let str = '';
    for (let i = 0; i < questionTableCell.length; ++i) {
        str += questionTableCell[i].value;
    }
    questionTextElement.value = str;
}

solveButton.addEventListener('click', () => {
    if (questionTextElement.value.length !=0 && !fillTableFromText()) {
        return;
    }
    if (!fillSudokuArray()) {
        messageArea.innerText = "填入数据有误，请检查后再试";
        return;
    }
    
    solve(sudokuArray);
    solveButton.disabled = true;
    fillTable();
    fillTextFromTable();
});

clearButton.addEventListener('click', () => {
    for (let i = 0; i < questionTableCell.length; ++i) {
        questionTableCell[i].value = '';
        questionTableCell[i].classList.remove('modify');
    }
    solveButton.disabled = false;
    questionTextElement.value = '';
    messageArea.innerText = '';
    sudokuArray = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
})

questionTableCell.forEach(cell => {
    cell.addEventListener('change', (e) => {
        e.target.classList.add('modify');
    })
})