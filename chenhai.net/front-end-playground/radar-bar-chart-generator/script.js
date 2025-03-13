const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 生成按钮
const generateBtn = document.querySelector('#generateBtn');

generateBtn.addEventListener('click', () => {
  // 输入值
  const canvasWidth = document.querySelector('#canvasWidth').value;
  const canvasHeight = document.querySelector('#canvasHeight').value;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 背景颜色
  const bgColor = document.querySelector('#bgColor').value;
  ctx.fillStyle = bgColor;
  // 背景
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fill();

  // 圆环底色和颜色
  const arc1Color = document.querySelector('#arc1Color').value;
  const arc2Color = document.querySelector('#arc2Color').value;
  // 圆环位置
  const rx = document.querySelector('#rx').value;
  const ry = document.querySelector('#ry').value;
  // 圆环半径
  const r = document.querySelector('#r').value;
  // 圆环粗细
  const lineWidth = document.querySelector('#lineWidth').value;

  // 先画圆环背景
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = arc2Color;
  ctx.arc(rx, ry, r, 0, 2 * Math.PI, 0);
  ctx.stroke();

  // 计算开始和结束角度
  const startPos = document.querySelector('#startPos').value;
  const endPos = document.querySelector('#endPos').value;
  const startAngle = (startPos / 50 - 1 / 2) * Math.PI;
  const endAngle = (endPos / 50 - 1 / 2) * Math.PI;

  // 再画圆环前景
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.strokeStyle = arc1Color;
  ctx.arc(rx, ry, r, startAngle, endAngle, 0);
  ctx.stroke();

  // 阴影颜色
  const shadowColor = document.querySelector('#shadowColor').value;
  // 再画个发光点
  ctx.beginPath();
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 10;
  ctx.arc(rx, ry, r, endAngle, endAngle, 1);
  ctx.stroke();

  // 修正结束角度
  const fixEndAngle = endAngle - 1 < -.5 * Math.PI ? -.5 * Math.PI : endAngle - 1;
  // 最后画个1/4圆弧（不一定是1/4可以改变）盖住发光
  ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.arc(rx, ry, r, endAngle, fixEndAngle, 1);
  ctx.stroke();
});





