const mineArea = document.querySelector('div#mine');
const statsArea = document.querySelector('div#stats');
const controlArea = document.querySelector('div#control');
const restartButton = document.querySelector('#restart');
const easyButton = document.querySelector('#easy');
const mediumButton = document.querySelector('#medium');
const hardButton = document.querySelector('#hard');

var minesweeper = function () {
	var diffString = 0, //0简单1中等2难
		difficulty = [{
			'type': 'easy',
			'text': '简单',
			'rows': 9,
			'columns': 9,
			'mineNum': 10
		}, {
			'type': 'medium',
			'text': '中等',
			'rows': 16,
			'columns': 16,
			'mineNum': 40
		}, {
			'type': 'hard',
			'text': '难',
			'rows': 30,
			'columns': 16,
			'mineNum': 99
		}], // 难度，格子宽度，格子高度，雷数量
		rows, columns, mineNum, sideLen = 40,
		NOTMINE = 0, ISMINE = 1, // 分别是不是雷，是雷
		NOTPLACED = 0, FLAGED = 1, NOTCONFIRM = 2, NUMBERED = 3, // 未标记，标记是雷（旗子，可能不是），不确定是不是雷（以？表示）, 已经被点出来(数字)
		gameState = 'start', // 游戏状态，有start，sweeping，win和boom四个状态
		remains = [],
		userStatus = [],
		remainsNotMines,  // 剩余的不是雷的方块
		// 初始化雷区，notPlaceMineIndex为第一下点到了雷则重新排布雷区
		init = function () {
			// 设置开始flag
			gameState = 'start';
			console.log('change status to "start"...');

			// 根据难度选择对应的下标
			var difficultyIndex = diffString;

			const { type, text } = difficulty[difficultyIndex];
			rows = difficulty[difficultyIndex].rows;
			columns = difficulty[difficultyIndex].columns;
			mineNum = difficulty[difficultyIndex].mineNum;

			// 计算剩余的雷
			remainsNotMines = rows * columns - mineNum;

			console.log(`this difficulty is ${type}`);
			statsArea.innerText = `难度：${text}`;

			// 清除前面的剩余
			mineArea.innerHTML = '';
			controlArea.classList.add('hide');
			// 排布雷
			putMines();

		},
		// 排布雷函数，notPlaceMineIndex指不布雷的的格子
		putMines = function (notPlaceMineIndex) {
			// 初次运行则增加rows x columns的格子作为点的区域
			if (notPlaceMineIndex == undefined) {

				for (var i = 0; i < rows * columns; ++i) {
					var div = document.createElement('div');
					div.className = 'pic e';
					div.id = '' + i;
					div.addEventListener('click', click),
						div.addEventListener('contextmenu', function (e) {
							e.preventDefault();
							click(e);
						}),
						mineArea.appendChild(div);
				}
			}
			// 初始化用户点选状态
			for (var i = 0; i < rows * columns; ++i) {
				userStatus[i] = NOTPLACED;
			}

			// 随机放置雷数
			var mines = [];

			for (var prepare = Math.floor(Math.random() * rows * columns); mines.length < mineNum; prepare = Math.floor(Math.random() * rows * columns)) {
				// 再生成则跳过点击的点
				if (notPlaceMineIndex != undefined) {
					if (prepare == notPlaceMineIndex) {
						continue;
					}
				}
				if (mines.indexOf(prepare) == -1) {
					mines.push(prepare);
				}
			};
			// console.log(mines.sort(function (a, b) {return a - b;}));
			for (var i = 0; i < rows * columns; ++i) {
				if (mines.indexOf(i) == -1) {
					remains[i] = NOTMINE;
				} else {
					remains[i] = ISMINE;
				}
			}
			// console.log(remains);
			printMines();
			// console.log(remains);
			// 修改div的宽度与高度
			mineArea.style.width = rows * sideLen + 'px';
			mineArea.style.height = columns * sideLen + 'px';
			gameState = 'start';
		},
		// 点击格子
		click = function (event) {
			if (!(gameState == 'start' || gameState == 'sweeping')) {
				return;
			}
			var y = Math.floor(event.target.id / rows),
				x = event.target.id - y * rows;
			// 左键
			if (event.button == 0) {
				// 第一下点到雷需要重排雷并点开这个点
				if (gameState == 'start') {
					if (remains[event.target.id] == 1) {
						console.log('recreate the mines area...');
						putMines(event.target.id);
						around(x, y);
					}
					gameState = 'sweeping';
					console.log('change status to "sweeping"...');
				}


				console.log('Left click: x->' + x + ' y->' + y);
				if (remains[event.target.id] == 1) {
					boom(event.target.id);
				} else {
					around(x, y);
				}
				if (gameState == 'sweeping') {
					statsArea.innerHTML = '还剩' + remainsNotMines + '个格子未挖开';
				}

				if (remainsNotMines == 0) {
					win();
				}
				// 右键
			} else if (event.button == 2) {
				console.log('Right click: x->' + x + ' y->' + y);

				var boxStatus = userStatus[event.target.id];
				// 若是已经点出来的就不作任何操作
				if (boxStatus == NUMBERED) {
					return;
				}

				if (boxStatus == NOTPLACED) {
					userStatus[event.target.id] = FLAGED;
					document.getElementById('' + event.target.id).className = 'pic f';
				} else if (boxStatus == FLAGED) {
					userStatus[event.target.id] = NOTCONFIRM;
					document.getElementById('' + event.target.id).className = 'pic m';
				} else {
					userStatus[event.target.id] = NOTPLACED;
					document.getElementById('' + event.target.id).className = 'pic e';
				}
			}
		},
		// 检查周围八个格子
		around = function (x, y) {
			if (x < 0 || x > rows - 1) {
				return;
			}
			if (y < 0 || y > columns - 1) {
				return;
			}

			if (userStatus[x + y * rows] == NUMBERED) {
				return;
			}
			var aroundMinesNum = 0,
				check = function (xPos, yPos) {
					if (xPos < 0 || xPos > rows - 1) {
						return;
					}
					if (yPos < 0 || yPos > columns - 1) {
						return;
					}
					if (remains[yPos * rows + xPos] == 1) {
						aroundMinesNum += 1;
					}
				};
			userStatus[x + y * rows] = NUMBERED;

			check(x - 1, y - 1);
			check(x - 1, y);
			check(x - 1, y + 1);
			check(x, y - 1);
			check(x, y + 1);
			check(x + 1, y - 1);
			check(x + 1, y);
			check(x + 1, y + 1);

			// 周围没有则对周围八个格子进行测试
			if (aroundMinesNum == 0) {
				// console.log("x:" + x + " y:" + y + ' aroundMinesNum:' + aroundMinesNum);
				document.getElementById('' + (x + rows * y)).className = 'pic zero';
				around(x - 1, y - 1);
				around(x - 1, y);
				around(x - 1, y + 1);
				around(x, y - 1);
				around(x, y + 1);
				around(x + 1, y - 1);
				around(x + 1, y);
				around(x + 1, y + 1);
				remainsNotMines -= 1;
			} else {
				// console.log("x:" + x + " y:" + y + ' aroundMinesNum:' + aroundMinesNum);
				// 有则根据aroundMinesNum绘制数字
				if (aroundMinesNum == 1) {
					document.getElementById('' + (x + rows * y)).className = 'pic one';
				} else if (aroundMinesNum == 2) {
					document.getElementById('' + (x + rows * y)).className = 'pic two';
				} else if (aroundMinesNum == 3) {
					document.getElementById('' + (x + rows * y)).className = 'pic three';
				} else if (aroundMinesNum == 4) {
					document.getElementById('' + (x + rows * y)).className = 'pic four';
				} else if (aroundMinesNum == 5) {
					document.getElementById('' + (x + rows * y)).className = 'pic five';
				} else if (aroundMinesNum == 6) {
					document.getElementById('' + (x + rows * y)).className = 'pic six';
				} else if (aroundMinesNum == 7) {
					document.getElementById('' + (x + rows * y)).className = 'pic seven';
				} else if (aroundMinesNum == 8) {
					document.getElementById('' + (x + rows * y)).className = 'pic eight';
				}
				remainsNotMines -= 1;
			}
		},
		// 点到了雷
		boom = function (id) {
			console.log('change status to "boom"...');
			gameState = 'boom';
			statsArea.innerHTML = '雷爆炸了...';
			for (var i = 0; i < rows * columns; ++i) {
				if (remains[i] == 1) {
					document.getElementById('' + i).className = 'pic q';
				}
			}
			document.getElementById(id).className = 'pic x';
			controlArea.classList.remove('hide');
		},

		// 胜利
		win = function () {
			console.log('change status to "win"...');
			gameState = 'win';
			for (var i = 0; i < rows * columns; ++i) {
				if (remains[i] == 1) {
					document.getElementById('' + i).className = 'pic f';
				}
			}
			statsArea.innerHTML = '恭喜你！';
			controlArea.classList.remove('hide');
		},
		// 打印用户点击信息 
		printUserStatus = function () {
			var output = '';
			for (var i = 0; i < line; ++i) {
				output += userStatus.slice(columns * i, columns * i + 30) + "\n";
			}
			console.log(output);
		},

		// 打印某个作弊（！）信息
		printMines = function () {
			var output = '',
				perline = rows;

			for (var i = 0; i < columns; ++i) {
				var start = rows * i,
					end = start + rows;

				// console.log('start: ' + start + ' end:' + end);
				output += remains.slice(start, end) + "\n";
			}
			console.log(output);
		};
	
	// 重新开始游戏
	restartButton.addEventListener('click', () => {
		init();
	});

	// 调整到低难度
	easyButton.addEventListener('click', () => {
		diffString = 0;
		init();
	});
	// 调整到中难度
	mediumButton.addEventListener('click', () => {
		diffString = 1;
		init();
	})
	// 调整到高难度
	hardButton.addEventListener('click', () => {
		diffString = 2;
		init();
	})

	init();
	// mineArea.addEventListener('click', click);
};


window.onload = minesweeper;