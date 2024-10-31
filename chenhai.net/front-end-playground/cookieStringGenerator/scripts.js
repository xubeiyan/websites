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
const text = document.createTextNode("6个字母都一样的饼干:");
hint.appendChild(text);
output.appendChild(currentCookie);
output.appendChild(hint);
root.appendChild(output);

// 亮的位置偏移
let offsetIndexArray = [0, 0, 0, 0, 0, 0];
const offsetPlusOne = () => {
  const len = template[0].length;
  let value = offsetIndexArray[0];
  for (let i = 1; i < offsetIndexArray.length; ++i) {
    value = value + offsetIndexArray[i] * len;
  }
  value += 1;
  for (let i = 0; i < offsetIndexArray.length; ++i) {
    offsetIndexArray[i] = value % len;
    value = Math.floor(value / len);
  }
};

const offsetNext = () => {
  const len = template[0].length;
  for (let i = 0; i < offsetIndexArray.length; ++i) {
    offsetIndexArray[i] = (offsetIndexArray[i] + 1) % len;
  }
};
// 循环函数
const nextTick = (startIndex = 0) => {
  const pList = content.children;
  for (let i = 0; i < pList.length; ++i) {
    const spanList = pList[i].children;
    const offset = offsetIndexArray[i] % spanList.length;
    const span = spanList[offset];
    span.classList.remove("light");
  }

  if (startIndex != 0 && startIndex % template[0].length == 0) {
    offsetPlusOne();
  }

  offsetNext();

  let cookies = "";
  for (let i = 0; i < pList.length; ++i) {
    const spanList = pList[i].children;
    const offset = offsetIndexArray[i] % spanList.length;
    const span = spanList[offset];
    cookies += span.textContent;
    span.classList.add("light");
  }

  currentCookie.textContent = cookies;
  if (
    cookies[0] == cookies[1] &&
    cookies[1] == cookies[2] &&
    cookies[2] == cookies[3] &&
    cookies[3] == cookies[4] &&
    cookies[4] == cookies[5]
  ) {
    const c = document.createElement("span");
    c.setAttribute("class", "cookies");
    c.appendChild(document.createTextNode(cookies));
    output.appendChild(c);
  }

  setTimeout(() => {
    nextTick(startIndex + 1);
  }, 1);
};

nextTick();
