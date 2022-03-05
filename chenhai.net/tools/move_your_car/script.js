const digit_input = document.querySelector('#digit-input');
const ok_button = document.querySelector('#ok');
const message_area = document.querySelector('#message-area');
const CORRECT_VALUE = '7';
const PHONE_NUMBER = '1234567890';
const WARN_MESSAGE = '输入信息有误，请检查后重试';

const showPhoneNumber = () => {
    message_area.textContent = '';
    message_area.classList.remove('warning');
    let link = document.createElement('a');
    let text = document.createTextNode(`电话号码:${PHONE_NUMBER}`);
    link.setAttribute('href', `tel:${PHONE_NUMBER}`);
    link.appendChild(text);
    message_area.appendChild(link);
} 

const showWarning = () => {
    message_area.classList.add('warning');
    message_area.textContent = WARN_MESSAGE;
}

ok_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (digit_input.value == CORRECT_VALUE) {
        showPhoneNumber();
    } else {
        showWarning();
    }
});
