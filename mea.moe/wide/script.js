/**
* 时隔多年重新编写此文件
* 当年注释真的都没写（我真是太菜了）
* 而且setTimeout用得好烂啊
*/

var canvas = document.getElementById('stage'),
	context = canvas.getContext('2d'),
	// 输出日志
	logLevel = 'info', // 有info, warn, none三个级别
	log = function (type, content) {
		if (logLevel == 'info') {
			console.log(`[${type}]${content}`);
		}
	},
	// 切换等待用时
	elapseTime = 5000,
	img = [],
	// 绘制状态loading, drawing, error
	status = 'loading', 
	// 调整窗口大小后重新计算canvas大小
	resizeWindow = function () {
		canvas.style.width = window.innerWidth;
		canvas.style.height = window.innerWidth * 9 / 16 + 'px';
		console.log(`[STATUS]to ${status}`);
	},
	// 图片的列表
	imageList = [
		'wide/MARE_e01n.jpg', 
		'wide/MARE_e09b.jpg', 
		'wide/MARE_FD_e03a.jpg', 
		'wide/MARE_FD_e04b.jpg', 
		'wide/MARE_FD_e05c.jpg', 
		'wide/MARE_FD_e07f.jpg'
	],
	// 根据加载成功的图片的长度随机一个图片来显示
	randomImageIndex = function (last) {
		var len = img.length,
			current = last;
		while (last == current) {
			current = Math.floor(len * Math.random());
		}
		return current;
	},
	// 加载图片
	loadImage = function () {
		for(var i = 0; i < imageList.length; i++) {
			// var声明会导致其失去变化，只能用let。TODO:看有没有更优雅的方式来实现
			let newimg = new Image();
			newimg.src = imageList[i];
			// 图片加载成功后回调函数
			newimg.onload = function () {
				log('IMAGE', `loaded "${newimg.src}" success!`);
				img.push(newimg);
				// 如果有2张图片加载成功了且绘制状态为loading则开始绘制
				if (img.length > 1 && status == 'loading') {
					draw(0);
					status = 'drawing';
					log('STATUS', `to ${status}`);
				}
			}
		}
	},
	// 绘制图片
	draw = function (index) {
		context.drawImage(img[index], 0, 0);
		setTimeout(function () {
			var next = randomImageIndex(index);
			draw(next);
		}, elapseTime)
	}
	
// 页面加载完成后开始加载图片
window.addEventListener('load', function() {
	loadImage(imageList);
});

// 缩放窗口触发调整函数
window.addEventListener('resize', function () {
	resizeWindow();
}, false);

resizeWindow();