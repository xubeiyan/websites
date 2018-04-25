var img = [],
	loaded = 0,
	canvasStage = document.getElementById("stage"),
	preload = function (imgLists) {
		canvasStage.style.width = window.innerWidth;
		canvasStage.style.height = window.innerWidth * 3 / 4;
		for (var i = 0; i < imgLists.length; ++i) {
			img[i] = new Image();
			img[i].src = imgLists[i];
			img[i].onload = function () {
				loaded += 1;
				if (loaded == imgLists.length) {
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
	currentTransactionMethod = 0,
	getRandomNextTransactionMethod = function () {
		currentTransactionMethod = Math.floor(Math.random() * 2);
	},
	canvasContext = canvasStage.getContext("2d"),
	widthGrid = 16,
	heightGrid = 12,
	widthLength = 1600 / widthGrid,
	heightLength = 1200 / heightGrid,
	brickDrawGridTime = 100,
	brickDrawPicTime = 2000,
	brickDraw = function (x, y, image) {
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
				getRandomNextTransactionMethod();
				if (currentTransactionMethod == 0) {
					setTimeout(function () {
						brickDraw(0, 0, img[currentImg]);
					}, brickDrawPicTime);
				} else {
					setTimeout(function () {
						brickDrawReverse(15, 0, img[currentImg]);
					}, brickDrawPicTime);
				}
				
			}
		}
	},
	brickDrawReverse = function (x, y, image) {
		canvasContext.drawImage(image, x * widthLength, y * heightLength,
			widthLength, widthLength, x * widthLength, y * heightLength, widthLength, widthLength);
			
		if (x - 1 >= 0) {
			setTimeout(function () {
				brickDrawReverse(x - 1, y, image);
			}, brickDrawGridTime);		
		} else {
			if (y + 1 < heightGrid) {
				x = 15;
				setTimeout(function () {
					brickDrawReverse(x, y + 1, image);
				}, brickDrawGridTime);
			} else {
				getRandomNextImg();
				getRandomNextTransactionMethod();
				if (currentTransactionMethod == 0) {
					setTimeout(function () {
						brickDraw(0, 0, img[currentImg]);
					}, brickDrawPicTime);
				} else {
					setTimeout(function () {
						brickDrawReverse(15, 0, img[currentImg]);
					}, brickDrawPicTime);
				};
			}
		}
	};
	
window.addEventListener('load', function () {
	preload([
		'hoshimemo/03-2.jpg',
		'hoshimemo/05.jpg',
		'hoshimemo/06.jpg',
		'hoshimemo/07.jpg',
	]);
}, false);

window.addEventListener('resize', function () {
	canvasStage.style.width = window.innerWidth;
	canvasStage.style.height = window.innerWidth * 3 / 4;
}, false)
	

