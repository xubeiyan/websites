const copybutton = document.querySelector('#copy-button');
const passwordText = document.querySelector('#password-text');
const pwLengthRange = document.querySelector('#pw-length-range');
const pwLengthText = document.querySelector('#pw-length-text');
const generateButton = document.querySelector('#gen-button');
const includeUppers = document.querySelector('#includeUpper');
const includeNumbers = document.querySelector('#includeNumber');
const includeSymbols = document.querySelector('#includeSymbol');

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

generateButton.addEventListener('click', () => {
    copybutton.dataset.tooltip = copyButtonTooltip['tocopy'];
    const passLength = pwLengthRange.value;
    passwordText.value = generatePass(passLength, {
        includeUpper: includeUppers.checked,
        includeNumber: includeNumbers.checked,
        includeSymbols: includeSymbols.checked,
    });
});

generatePass = (length, {
    includeUpper, includeNumber, includeSymbols
}) => {
    let chars = lowerLetters;
    if (includeUpper) chars = chars.concat(upperLetters);
    if (includeNumber) chars = chars.concat(numbers);
    if (includeSymbols) chars = chars.concat(symbols);

    const passArray = [];
    for (let i = 0; i < length; ++i) {
        const index = Math.floor(Math.random() * chars.length);
        passArray.push(chars[index]);
    }

    return passArray.join('');
}