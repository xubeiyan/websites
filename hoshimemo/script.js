var img = [],
	loaded = 0,
	preload = function (imgLists) {
		for (var i = 0; i < imgLists.length; ++i) {
			img[i] = new Image();
			img[i].src = imgLists[i];
			img[i].onload = function () {
				loaded += 1;
				if (loaded == 4) {
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
	canvasStage = document.getElementById("stage"),
	canvasContext = canvasStage.getContext("2d"),
	grid = 64,
	widthLength = canvasStage.width / grid,
	heightLength = canvasStage.height / grid,
	brickDrawGridTime = 100,
	brickDrawPicTime = 2000,
	brickDraw = function (x, y, image) {
		
		// canvasContext.drawImage(img[currentImg], 0, 0);
		console.log(x, y);
		canvasContext.drawImage(image, x * grid, y * grid,
			grid, grid, x * grid, y * grid, grid, grid);
			
		if (x + 1 < widthLength) {
			setTimeout(function () {
				brickDraw(x + 1, y, image);
			}, brickDrawGridTime);		
		} else {
			if (y + 1 < heightLength) {
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
	}
	
window.onload = function () {
	preload([
		'hoshimemo/01.jpg',
		'hoshimemo/02.jpg',
		'hoshimemo/03.jpg',
		'hoshimemo/04.jpg',
	]);

}
	

