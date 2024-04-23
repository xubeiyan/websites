// 需要生成的字符集
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_+=[]{}<>,.?~'

// 生成密码区域
const generated_pass_area = document.querySelector('#generated-pass');
// 填充生成密码区域
const fill_generated_pass_area = (value) => {
    generated_pass_area.replaceChildren();
    [...value].forEach(one => {
        let span = document.createElement('span');
        if (numbers.includes(one)) {
            span.classList.add('number');
        } else if (symbols.includes(one)) {
            span.classList.add('symbol');
        }
        span.textContent = one;
        generated_pass_area.append(span);
    });
}


// 重新生成密码按钮
const regenerate_button = document.querySelector('#regenerate');
regenerate_button.addEventListener('click', () => {
    generate_pass();
});

// 密码长度
const password_length_range = document.querySelector('#password-length-range');
const password_length_value = document.querySelector('#password-length-value');
password_length_range.addEventListener('change', e => {
    let value = e.target.value;
    password_length_value.innerHTML = value;
    generate_pass();
});

// PIN长度
const pin_length_range = document.querySelector('#pin-length-range');
const pin_length_value = document.querySelector('#pin-length-value');
pin_length_range.addEventListener('change', e => {
    let value = e.target.value;
    pin_length_value.innerHTML = value;
    generate_pass();
});

// 生成密码是否包括数字
let include_number = false;
// 包含数字checkbox
const includes_number_checkbox = document.querySelector('#include-number-checkbox');
includes_number_checkbox.addEventListener('change', e => {
    include_number = e.target.checked;
    generate_pass();
});

// 生成密码是否包括字符
let include_symbol = false;
// 包含数字checkbox
const includes_symbol_checkbox = document.querySelector('#include-symbol-checkbox');
includes_symbol_checkbox.addEventListener('change', e => {
    include_symbol = e.target.checked;
    generate_pass();
});

// 密码类型
let pass_type = 'randomPass';
const password_type_select = document.querySelector('#password-type-select');
const randomPassOptionEle = document.querySelector('#random-password');
const pinOptionEle = document.querySelector('#pin');
password_type_select.addEventListener('change', e => {
    let value = e.target.value;
    if (value == 'pin') {
        randomPassOptionEle.classList.add('hide');
        pinOptionEle.classList.remove('hide');
        pass_type = 'pin';
    } else if (value == 'randomPass') {
        pinOptionEle.classList.add('hide');
        randomPassOptionEle.classList.remove('hide');
        pass_type = 'randomPass';
    }
    generate_pass();
});

// 两个图标
const copy_icon = document.querySelector('#copy-icon');
const check_icon = document.querySelector('#check-icon');
// 切换两个图标
const toggleCopyIcon = (value) => {
    const copy_pass_button = document.querySelector('#copy-password');
    if (value == 'copied') {
        copy_icon.classList.add('hide');
        check_icon.classList.remove('hide');
        copy_pass_button.setAttribute('title', 'Password Copied!')
    } else if (value == 'tocopy') {
        copy_icon.classList.remove('hide');
        check_icon.classList.add('hide');
        copy_pass_button.setAttribute('title', 'Copy Secure Password');
    }
}

// 密码值
let pass_value = '';
// 生成密码
const generate_pass = () => {
    let string_template = '?';
    let pass_length = 0;
    if (pass_type == 'randomPass') {
        string_template = alphabets;
        if (include_number) {
            string_template = string_template.concat(numbers);
        }
        if (include_symbol) {
            string_template = string_template.concat(symbols);
        }
        pass_length = parseInt(password_length_value.textContent);
    } else if (pass_type == 'pin') {
        string_template = numbers;
        pass_length = parseInt(pin_length_value.textContent);
    }

    pass_value = '';
    for (let i = 0; i < pass_length; ++i) {
        let random_index = Math.round(Math.random() * (string_template.length - 1))
        pass_value += string_template[random_index];
    }
    // 填充密码区域
    fill_generated_pass_area(pass_value);
    // 将复制按钮还原
    toggleCopyIcon('tocopy');
}

// 复制密码
const copy_pass_button = document.querySelector('#copy-password');
copy_pass_button.addEventListener('click', () => {
    const textArea = document.createElement("textarea");
    textArea.value = pass_value;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        toggleCopyIcon('copied');
    } catch (err) {
        console.error(err);
    }
    document.body.removeChild(textArea);
});

generate_pass();