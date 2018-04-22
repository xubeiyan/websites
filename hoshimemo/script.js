var img = [],
	loaded = 0,
	canvasStage = document.getElementById("stage"),
	preload = function (imgLists) {
		canvasStage.width = window.innerWidth;
		canvasStage.height = canvasStage.width * 3 / 4;
		
		for (var i = 0; i < imgLists.length; ++i) {
			img[i] = new Image();
			img[i].src = imgLists[i];
			img[i].onload = function () {
				loaded += 1;
				if (loaded == 3) {
					brickDraw(0, 0, img[0]);
				}
			}
		}
		imgArrayLength = imgLists.length;
	},
	imgArrayLength = 0,
	currentImg = 0,
	getRandomNextImg = function () {
		var next = Math.floor(Math.random() * (imgArrayLength - 1));
		if (next < currentImg) {
			currentImg = next;
		} else {
			currentImg = next + 1;
		}
	},
	
	canvasContext = canvasStage.getContext("2d"),
	widthGrid = 16,
	heightGrid = 12,
	widthLength = 1600 / widthGrid,
	heightLength = 1200 / heightGrid,
	brickDrawGridTime = 100,
	brickDrawPicTime = 2000,
	brickDraw = function (x, y, image) {
		
		var sW = window.innerWidth,
			sH = window.innerWidth * image.height / image.width,
			dW = image.width,
			dH = image.height;
		// console.log('height: ', image.height)
		// console.log('width: ', image.width)
		// console.log('sw:', sW, 'sH:', sH);
		// console.log('dw:', dW, 'dH:', dH);
		
		// canvasContext.drawImage(image, 0, 0, sW, sH);
		console.log(x, y);
		canvasContext.drawImage(image, x * widthLength, y * heightLength,
			widthLength, widthLength, x * widthLength, y * heightLength, widthLength, widthLength);
			
		if (x + 1 < widthGrid) {
			setTimeout(function () {
				brickDraw(x + 1, y, image);
			}, brickDrawGridTime);		
		} else {
			if (y + 1 < heightGrid) {
				x = 0;
				setTimeout(function () {
					brickDraw(x, y + 1, image);
				}, brickDrawGridTime);
			} else {
				getRandomNextImg();
				setTimeout(function () {
					brickDraw(0, 0, img[currentImg]);
				}, brickDrawPicTime);
			}
		}
	},
	resize = function () {
		// console.log(window.innerWidth, window.innerHeight);
		canvasStage.width = window.innerWidth;
		canvasStage.height = canvasStage.width * 3 / 4;
		// canvasStage.style.width = '' + canvasStage.width + 'px';
		// canvasStage.style.height = '' + canvasStage.height + 'px';
		brickDraw(0, 0, img[0]);
	};
	
window.onload = function () {
	preload([
		'hoshimemo/03-2.jpg',
		// 'hoshimemo/05.jpg',
		'hoshimemo/06.jpg',
		'hoshimemo/07.jpg',
	]);
};

window.addEventListener('resize', resize, false);
	

