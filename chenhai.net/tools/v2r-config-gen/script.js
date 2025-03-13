const qrcodeRoot = document.querySelector("#qrcode");
const configText = document.querySelector("#json-config");
const leftToRightButton = document.querySelector("#left-to-right");
const warningMessage = document.querySelector("#warn");

let qrcode = new QRCode(qrcodeRoot, {
    text: 'v2ray qrcode generator',
});


// 移除空格换行tab等等（假定对应的JSON格式正确
function plainJSON(text) {
    return JSON.parse(JSON.stringify(text));
}

// 转换为vmess://base64
function toBase64(text) {
    let base64Text = btoa(text);
    return `vmess://${base64Text}`;
}

// 构造对应的分享格式，参考链接https://github.com/2dust/v2rayN/wiki/%E5%88%86%E4%BA%AB%E9%93%BE%E6%8E%A5%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E(ver-2)
function config2ShareLinkJSON(config) {
    let jsonConfig  = '';
    try {
        jsonConfig = JSON.parse(config);
    } catch (e) {
        warningMessage.innerText = e;
        return 'JSON格式错误';
    } 
    
    let shareLinkJSON = {
        "v": "2",       // 版本
        "ps": "vcg",    // 别名
        "add": "",      // IP地址
        "port": "0",    // 端口号
        "id": "",       // UUID
        "aid": "64",    // alterID
        "scy": "auto",  // 加密方式
        "net": "tcp",   // 传输协议
        "type": "none", // 伪装类型
        "host": "",     // 伪装域名
        "path": "",     // path
        "tls": "",      // TLS
        "sni": "",      // serverName
    };

    let outBoundConfig = '';
    if (jsonConfig["outbound"]) {
        outBoundConfig = jsonConfig["outbound"];
    }

    if (jsonConfig["outbounds"]) {
        outBoundConfig = jsonConfig["outbounds"][0];
    }

    console.log(outBoundConfig);
    let vnext = Array.isArray(outBoundConfig["settings"]['vnext']) ? 
        outBoundConfig["settings"]['vnext'][0] : outBoundConfig["settings"]['vnext'];
    let address = vnext["address"];
    let port = vnext["port"];
    let users = Array.isArray(vnext["users"]) ? vnext["users"][0] : vnext["users"];
    let uuid = users["id"];
    let alterId = users["alterId"];

    shareLinkJSON['add'] = address;
    shareLinkJSON['port'] = port;
    shareLinkJSON['id'] = uuid;
    shareLinkJSON['aid'] = alterId;

    if (outBoundConfig["streamSettings"]) {
        let network = outBoundConfig["streamSettings"]["network"];
        shareLinkJSON['net'] = network;

        // 伪装类型，文档好复杂
        if (network == 'tcp') {

        }
    }

    if (outBoundConfig['streamSettings']['wsSettings']) {
        let path = outBoundConfig['streamSettings']['wsSettings']['path'];
        shareLinkJSON['path'] = path;
    }
    return JSON.stringify(shareLinkJSON);
}

leftToRightButton.addEventListener('click', () => {
    if (configText === '') {
        return;
    };

    let newText = config2ShareLinkJSON(configText.value);

    newText = plainJSON(newText);
    if (newText === 'JSON format error') {
        return;
    }

    newText = toBase64(newText);

    qrcode.clear();
    qrcode.makeCode(newText);
    
});