var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	CIRCLE_PADDING = 5,
	FONT_HEIGHT = 20,
	MARGIN = 5,
	HAND_TRUNCATION = canvas.width/15,
	HOUR_HAND_TRUNCATION = canvas.width/10,
	NUMERAL_SPACING = 20,
	RADIUS = canvas.width/2 - MARGIN,
	HAND_RADIUS = RADIUS - NUMERAL_SPACING;

//Function
// 画出钟圈
function drawCircle() {
	// 外层
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
	context.stroke();
	// 内层
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2 , RADIUS - CIRCLE_PADDING, 0, Math.PI * 2, true);
	context.stroke();
}

// 画出数字
function drawNumerals() {
	const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	let	angle = 0;
	let numeralWidth = 0;
		
	numerals.forEach((numeral) => {
		angle = Math.PI / 6 * (numeral - 3);
		numeralWidth = context.measureText(numeral).width;
		context.fillText(numeral,
			canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) -
				numeralWidth / 2,
			canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) +
				FONT_HEIGHT / 3);
		
	});
}

// 画出钟的中心
function drawCenter() {
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI*2, true);
	context.fill();
}

// 画出针
function drawHand(loc, isHour, width, color="#000") {
	var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;
	
	context.save();
	context.moveTo(canvas.width/2, canvas.height/2);
	context.lineWidth = width;
	context.fillStyle = color;
	context.strokeStyle = color;
	context.lineTo(canvas.width/2 + Math.cos(angle) * handRadius, 
		canvas.height/2 + Math.sin(angle) * handRadius);
	context.stroke();
	context.restore();
}

// 画出三根针
function drawHands() {
	var date = new Date,
		hour = date.getHours();
	
	hour = hour > 12 ? hour - 12 : hour;
	
	drawHand(date.getMinutes(), false, 6, 'black');
	drawHand(hour * 5 + (date.getMinutes()/60)*5, true, 8, 'black');
	drawHand(date.getSeconds(), false, 1, 'red');
}

// 画出钟表
function drawClock() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawCircle();
	drawCenter();
	drawHands();
	drawNumerals();

	window.requestAnimationFrame(drawClock);
}

//Initialization
context.font = FONT_HEIGHT + 'px Arial';
drawClock();