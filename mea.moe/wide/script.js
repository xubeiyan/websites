/**
* 时隔多年重新编写此文件
* 当年注释真的都没写（我真是太菜了）
* 而且setTimeout用得好烂啊
*/

const canvas = document.getElementById('stage');
const context = canvas.getContext('2d');
// 输出日志
let logLevel = 'info'; // 有info, warn, none三个级别
let log = function (type, content) {
	if (logLevel == 'info') {
		console.log(`[${type}]${content}`);
	}
};

// 切换等待用时
let clipSwitchTime = 20;
let elapseTime = 5000;
// 加载
let loadedImage = [];
// 绘制状态loading, drawing, error
let status = 'loading';
// 调整窗口大小后重新计算canvas大小
const resizeWindow = () => {
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerWidth * 9 / 16;
	console.log(`[STATUS]window resize to ${status}`);
};
// 图片的列表
let imageList = [
	'wide/MARE_e01n.jpg',
	'wide/MARE_e09b.jpg',
	'wide/MARE_FD_e03a.jpg',
	'wide/MARE_FD_e04b.jpg',
	'wide/MARE_FD_e05c.jpg',
	'wide/MARE_FD_e07f.jpg'
];

// 根据加载成功的图片的长度随机一个图片来显示
const randomImageIndex = function (last) {
	const len = loadedImage.length;
	let	current = last;
	while (last == current) {
		current = Math.floor(len * Math.random());
	}
	return current;
}

// 生成从0~length-1的乱序数列
const getShuffleOrder = (length) => {
	let arr = new Array(length);

	// fill 
	for (let i = 0; i < arr.length; ++i) {
		arr[i] = i;
	}

	let m = length;

	for (let i, temp; m > 0; --m) {
		i = Math.floor(Math.random() * m);
		temp = arr[m - 1];
		arr[m - 1] = arr[i];
		arr[i] = temp;
	}

	return arr;
}

// 加载图片
const loadImage = () => {
	imageList.forEach(one => {
		let newimg = new Image();
		newimg.src = one;
		// 图片加载成功后回调函数
		newimg.onload = () => {
			log('IMAGE', `loaded "${newimg.src}" success!`);
			loadedImage.push(newimg);
			// 如果有2张图片加载成功了且绘制状态为loading则开始绘制
			if (loadedImage.length > 1 && status == 'loading') {
				draw(0);
				status = 'drawing';
				log('STATUS', `to ${status}`);
			}
		}
	});
};
// 绘制图片
const draw = (index) => {
	let clipHoriAmount = 32;
	let clipVertAmount = 18;
	let clipWidth = 3840 / clipHoriAmount;
	let clipHeight = 2160 / clipVertAmount;
	// 绘制顺序，按照
	let drawOrder = getShuffleOrder(clipHoriAmount * clipVertAmount);

	let drawClip = (clipIndex, drawOrder) => {
		if (clipIndex >= drawOrder.length) {
			// console.log('done');
			setTimeout(function () {
				const next = randomImageIndex(index);
				draw(next);
			}, elapseTime);
			return;
		};
		// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		let actualOrder = drawOrder[clipIndex];
		let sx = (actualOrder % clipHoriAmount) * clipWidth;
		let sy = Math.floor(actualOrder / clipHoriAmount) * clipHeight;
		context.drawImage(loadedImage[index], sx, sy, clipWidth, clipHeight, sx, sy, clipWidth, clipHeight);

		setTimeout(() => {
			drawClip(clipIndex + 1, drawOrder);
		}, clipSwitchTime);
	};

	drawClip(0, drawOrder);

	
}

// 页面加载完成后开始加载图片
window.addEventListener('load', () => {
	loadImage(imageList);
});

// 缩放窗口触发调整函数
window.addEventListener('resize', () => {
	resizeWindow();
}, false);

resizeWindow();