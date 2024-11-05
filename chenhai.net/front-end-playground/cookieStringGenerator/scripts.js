const root = document.getElementById("root");

const template = [
  "ZGuNHcDwpsObhYegLBylm8rTan34xMAiqKdVJXS6W2RCQ5EtzkvofPj79FIU01",
  "xcVoaGAdHUMK3RJjEvNS8IsXw2hOrY75npDZWlu0kbt6C1qLmeFz9TfBgQiyP4",
  "DF0vaXlW7u5Y2ZjpSb96GwhcVKiByxLU8tMsqOE3ANoQeI4rRzJHPdkCmfTng1",
  "WDQ0cEhFmtYIzB5q8onCldeJa4xAyrbgUk1V6NiLvGTfjMPuHSsZ39pOK2wXR7",
  "TcbPJ7fYoB1UswM6W4tkSHavR0N5ZFIKLQjdr2enG8gu9DiXOlhCAzExm3pVyq",
  "CIUX9svFNitTpLfc1zJBM2qQ30SZAjhdEmHkGewORbVPDKaxygW5748urloYn6",
];

// 生成题目
const title = document.createElement("h1");
const titleText = document.createTextNode("Cookies String Generate Alogrithm");
title.appendChild(titleText);
root.appendChild(title);

// 生成内容区域
const content = document.createElement("main");

for (let line of template) {
  const p = document.createElement("p");
  for (let c of line.split("")) {
    const span = document.createElement("span");
    const text = document.createTextNode(c);
    span.appendChild(text);
    p.appendChild(span);
  }
  content.appendChild(p);
}

root.appendChild(content);

// 输出区域
const output = document.createElement("div");
output.setAttribute("id", "output");
const currentCookie = document.createElement("span");
currentCookie.setAttribute("class", "cookies");
const hint = document.createElement("span");
const text = document.createTextNode("6个字母都一样的字符串:");
hint.appendChild(text);
output.appendChild(currentCookie);
output.appendChild(hint);
root.appendChild(output);

// 判断六个字符是否都是一样
const judgeStringAllSame = (s) => {
  if (s.length != 6) return false;
  if (
    s[0] == s[1] &&
    s[1] == s[2] &&
    s[2] == s[3] &&
    s[3] == s[4] &&
    s[4] == s[5]
  ) {
    return true;
  }
  return false;
};

// 起始的位置
// 第一个数字是最后一行的起始位置，第二个数字是第一行基于最后一行起始位置的位置偏移，以此类推
let oldOffsetArray = [0, 43, 44, 55, 19, 51];
let initStartIndex = 0;

for (let i = 0; i < oldOffsetArray.length; ++i) {
  initStartIndex += oldOffsetArray[i] * Math.pow(template[0].length, i);
}

// 循环函数
const nextTick = (startIndex = initStartIndex) => {
  const len = template[0].length;
  const offset = startIndex % len;
  // 偏移量
  const offsetArray = [];

  // 根据 startIndex 计算偏移量
  for (let i = 0, newIndex = startIndex; i < template.length; ++i) {
    newIndex = Math.floor(newIndex / len);
    const o = (offset + newIndex) % len;
    offsetArray.push(o);
  }

  // 根据oldOffsetArray清除变色效果，根据新的offsetArray添加变色效果
  let resultStr = "";
  for (let i = 0; i < content.children.length; ++i) {
    const spanList = content.children[i].children;
    spanList[oldOffsetArray[i]].classList.remove("light");
    spanList[offsetArray[i]].classList.add("light");
    resultStr += spanList[offsetArray[i]].textContent;
  }

  currentCookie.textContent = resultStr;
  if (judgeStringAllSame(resultStr)) {
    const c = document.createElement("span");
    c.setAttribute("class", "cookies");
    c.textContent = resultStr;
    output.appendChild(c);
  }

  // 用新的替换老的，准备下次替换
  oldOffsetArray = offsetArray;

  setTimeout(() => {
    nextTick(startIndex + 1);
  }, 100);
};

nextTick();
