const copybutton = document.querySelector('#copy-button');
const passwordText = document.querySelector('#password-text');
const pwLengthRange = document.querySelector('#pw-length-range');
const pwLengthText = document.querySelector('#pw-length-text');
const generateButton = document.querySelector('#gen-button');
const includeLowers = document.querySelector('#includeLower');
const includeUppers = document.querySelector('#includeUpper');
const includeNumbers = document.querySelector('#includeNumber');
const includeSymbols = document.querySelector('#includeSymbol');
const generatedPassText = document.querySelector('#generatedPass');
const clearButton = document.querySelector('#clearAllGeneratedPass');

let passRecordsObj = [];

const copyButtonTooltip = {
    'copied': '密码已复制',
    'tocopy': '点击复制密码',
};

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-';

copybutton.addEventListener('click', () => {
    if (passwordText.value == '') {
        generateButton.click();
    }
    passwordText.select();
    copybutton.dataset.tooltip = copyButtonTooltip['copied'];
    navigator.clipboard.writeText(passwordText.value);
});

pwLengthRange.addEventListener('change', (e) => {
    pwLengthText.value = e.target.value;
});

pwLengthText.addEventListener('change', (e) => {
    pwLengthRange.value = e.target.value;
});

clearButton.addEventListener('click', () => {
    window.localStorage.clear();
    passRecordsObj = [];
    updateGeneratedPass();
})

generateButton.addEventListener('click', () => {
    copybutton.dataset.tooltip = copyButtonTooltip['tocopy'];
    const passLength = pwLengthRange.value;
    let pass = generatePass(passLength, {
        includeLower: includeLowers.checked,
        includeUpper: includeUppers.checked,
        includeNumber: includeNumbers.checked,
        includeSymbols: includeSymbols.checked,
    });
    passwordText.value = pass;
    passRecordsObj.push({
        time: new Date().toLocaleString(),
        text: pass,
    });
    setLocalGeneratedPassRecord();
    updateGeneratedPass();
});

const updateGeneratedPass = () => {
    while (generatedPassText.firstChild) {
        generatedPassText.removeChild(generatedPassText.firstChild);
    }
    for (let one of passRecordsObj) {
        let text = `${one.text} 生成于 ${one.time}`;
        let textNode = document.createTextNode(text);
        let div = document.createElement('div');
        div.appendChild(textNode);
        generatedPassText.appendChild(div);
    }
}

const generatePass = (length, {
    includeLower, includeUpper, includeNumber, includeSymbols
}) => {
    let chars = '';
    if (includeLower) chars = chars.concat(lowerLetters);
    if (includeUpper) chars = chars.concat(upperLetters);
    if (includeNumber) chars = chars.concat(numbers);
    if (includeSymbols) chars = chars.concat(symbols);

    // 没有选择字符则生成空密码
    if (chars === '') {
        return '';
    }

    const passArray = [];
    for (let i = 0; i < length; ++i) {
        const index = Math.floor(Math.random() * chars.length);
        passArray.push(chars[index]);
    }

    return passArray.join('');
}

// 从localStorage中读取已生成的密码
const getLocalGeneratedPassRecord = () => {
    let passRecordsStr = window.localStorage.getItem('pass');
    if (passRecordsStr == null) {
        return;
    }

    passRecordsObj = JSON.parse(passRecordsStr);
    updateGeneratedPass();
}

const setLocalGeneratedPassRecord = () => {
    window.localStorage.setItem('pass', JSON.stringify(passRecordsObj));
}


getLocalGeneratedPassRecord();