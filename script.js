const block = document.querySelector('.block');
const variableDisplay = document.querySelector('.what');
const variableDisplay2 = document.querySelector('.what2');
const allPlatforms = document.querySelector('#block');
const allHoles = document.querySelector('#hole');
const map = document.querySelector('.con');
const ai1 = document.querySelector('.ai1');
const base6 = document.querySelector('.base6');
const base7 = document.querySelector('.base7');

let right = false;
let right2 = true;
let right3 = true;
let left = false;
let left2 = true;
let left3 = true;
let up = false;
let up2 = true;
let down = false;
let up3 = true;
let mapMoving = false;
let hitAnimation = false;
let iteration = 0;

let heightCheck = [200];
let x = 0;
let y = 0;
let xMap = 0;
block.style.bottom = '200px';
block.style.left = '0px';
let falling = false;

/*Variables for the start positions of the left and right side of each platform and hole*/
let	flat1Left = 0;
let	flat1Right = 600;
let flat1Top = 200;
let flat1Bottom = -100;
let	hole1Left = 600.0000000001;
let	hole1Right = 800;
let	flat2Left = 800.0000000001;
let	flat2Right = 1000;
let flat2Top = 240;
let flat2Bottom = -100;
let	hole2Left = 1000.0000000001;
let	hole2Right = 1200;
let	flat3Left = 1200.0000000001;
let	flat3Right = 1700;
let flat3Top = 200;
let flat3Bottom = -100;
let hole3Left = 1700.0000000001;
let hole3Right = 1980;
let flat4Left = 1980.0000000001;
let flat4Right = 2080;
let flat4Top = 200;
let flat4Bottom = -100;
let hole4Left = 2080.0000000001;
let hole4Right = 2330;
let flat5Left = 2330.0000000001;
let flat5Right = 2830;
let flat5Top = 220; 
let flat5Bottom = -100;
let hole5Left = 2830.0000000001;
let hole5Right = 3030;
let flat6Left = 3030.0000000001;
let flat6Right = 3130;
let flat6Top = 200;
let flat6Bottom = 190;
let hole6Left = 3130.0000000001;
let hole6Right = 3590;
let flat7Left = 3590.0000000001;
let flat7Right = 3690;
let flat7Top = 200;
let flat7Bottom = 190;
let hole7Left = 3690.0000000001;
let hole7Right = 3890;
let flat8Left = 3890.0000000001;
let flat8Right = 4490;
let flat8Top = 220;
let flat8Bottom = -100;

/*ai start position*/
let ai1left = 2465;

/*Arrays for the platforms x and y positions used in actively determining the hole positions
and stop point of your character. This is what's used for the 'collision physics'. */
let platformArrX = [flat1Left, flat1Right, hole1Left, hole1Right, flat2Left, flat2Right
, hole2Left, hole2Right, flat3Left, flat3Right, hole3Left, hole3Right, flat4Left,
flat4Right];

let platformArrXGrouped = [[flat1Left, flat1Right, flat2Left, flat2Right,
flat3Left, flat3Right, flat4Left, flat4Right, flat5Left, flat5Right, flat6Left, flat6Right,
flat7Left, flat7Right, flat8Left, flat8Right],
[hole1Left, hole1Right, hole2Left, hole2Right,
hole3Left, hole3Right, hole4Left, hole4Right, hole5Left, hole5Right, 
hole6Left, hole6Right, hole7Left, hole7Right]];

let platformArrXGroupedO = [[], []];

let platformArrY = [flat1Top, flat2Top, flat3Top, flat4Top, flat5Top, 
flat6Top, flat7Top, flat8Top];

let platformArrB = [flat1Bottom, flat2Bottom, flat3Bottom, flat4Bottom,
 flat5Bottom, flat6Bottom, flat7Bottom, flat8Bottom];

let aiArr = [ai1left];

/*Direction variables for the moving platforms. 0 1 and 2 represent stationary right and left*/
let flat6Direction = 0;
let flat7Direction = 0;

/*Max and min jump heights*/
let maxJump = 140;
let minJump = 30;

/*chCheck is just to check if i'm using the current heigth array to define the
y position.*/

let chCheck = false;

/*This is to show when your falling in a hole. And if the game has been paused */
let inAir = false;
let pause = false;

/*Move functions with a passed in event object to determain keys being pressed.*/
const move = (e) =>{
 	
 	if (e.keyCode === 37) {
 		left = true

 	}

	if (e.keyCode === 38) {
	up = true;
 		
 	}

 	if (e.keyCode === 39) {
 		right = true;

 	}

	if (e.keyCode === 80) {

		if (!pause) {
			pause = true;

		} else {
			pause = false;
			requestAnimationFrame(blockmove);

		}
	}
 	
}

const move2 = (e) => {

 	if (e.keyCode === 37) {
 		left = false;
 		mapMoving = false;

 	}

	if (e.keyCode === 38) {
	up = false;

 	}

 	if (e.keyCode === 39) {
 		right = false;
 		mapMoving = false;

 	}

};


/*More variables for various things. base height is the y position of the current platform
currentPlatY is also that. the baseHeight is actually what determains how far your charecter
will fall though and is set to 0 when your over a hole. blockX is your blocksX position
mapXmap is the maps x position as it scrolls. blockX2 is the right end of your block.
xMaxLeft and Right represent the max left and right when falling down a hole. They're set
to the left most and right most part of the map by defualt but when over a hole and
below the point where you can't land on the top of the next closest platform they change
to the x position of the edge of that platform. hole determains whether or not your over
a hole. nextLeft and Right determain the next left and right x cordinate of platforms while your
over a hole. currentY is your currentY position. Below platform switches if your below
the point of landing on the next platform*/
let baseHeight = 200;
let noHoleHeight = 0;
let blockX = 0;
let mapXMap = 0;
let blockX2 = blockX + 50;
let xMaxLeft = 0;
let xMaxRight = 5000;
let hole = false;
let nextLeft = 0;
let nextRight = 0;
let currentY = 200;
let currentPlatY = 200;
let belowPlatform = false;

/*These variables determain how the moving platform and 'ai' character moves. They don't
represent the absolute position of the platforms. They're essentially displacement factors.
They represent how much the platform has been offset from its origional position.*/
let ai1BaseHeight = 220;
let ai1Move = 0;
let flat6Move = 0;
let hole5Move = 0;
let hole6MoveL = 0;
let hole6MoveR = 0;
let flat7Move = 0;
let hole7Move = 0;

/*Represents the index of the current platform your on in the platform array*/
let currentPlatIndex = 0;

/*Tells the program if your on a platform or not. Only set to true if your actually on
it not above or below*/
let onPlatform = false;

/*Gets the Y value of the platform your over. It sets current platY, onPlatform, belowPlatform and currentPlatIndex by looping through the
platform array and Matching a platform position to your x position.*/
const onPlatformHeight = () => {
	for (let k = 0; k < platformArrXGrouped[0].length; k+=2) {
		console.log('onplatheight');

		if (hole === false && blockX >= platformArrXGrouped[0][k] -50.0000000001 
			&& blockX <= platformArrXGrouped[0][k + 1]) {

			currentPlatY = platformArrY[k/2];

				if (currentY + 100 <= platformArrB[k/2]) {
					belowPlatform = true;

				} else {
					belowPlatform = false;

				};

				if (currentY === currentPlatY) {
					onPlatform = true;

				} else {
					onPlatform = false;

				};

				currentPlatIndex = k;
				break;

		} else if (hole === true) {
			console.log('hole true');

			if (blockX === platformArrXGrouped[0][k] -50.0000000001 || blockX ===
				platformArrXGrouped[0][k + 1]) {
				console.log('platY hole true');
				currentPlatY = platformArrY[k/2];

				if (currentY + 100 <= platformArrB[k/2]) {
					console.log('belowplatform true');
					belowPlatform = true;

				} else {
					belowPlatform = false;

				};

				if (currentY === currentPlatY) {
					onPlatform = true;

				} else {
					onPlatform = false;

				};

				currentPlatIndex = k;
		
				break;

			} else {
				continue;

			};

		} else {
			continue;

		};
	};

}


/*Determains the next closest platform to your left when your over a hole and sets
the max left position if you are below the top y position of that platform.*/
const closestPlatformLeft = () => {

	for (let i = 0; i < platformArrXGrouped[1].length; i+=2) {
		
		if (hole && blockX >= Math.floor(platformArrXGrouped[1][i]) && blockX <= 
			platformArrXGrouped[1][i + 1]) {
			nextLeft = Math.floor(platformArrXGrouped[1][i]);
			break;
		} else {
			continue;
		};
	};

	onPlatformHeight();

	if (hole && currentY < currentPlatY && nextLeft !== 0) {
		inAir = true;
		xMaxLeft = nextLeft;
	}

	if (!hole) {
		nextLeft = 0;
		xMaxLeft = 0;
	}

}

/*Same as the above function but for the next right platform*/
const closestPlatformRight = () => {

	for (let j = 0; j < platformArrXGrouped[1].length; j+=2) {

		if (hole && blockX >= Math.floor(platformArrXGrouped[1][j]) && blockX <= 
			platformArrXGrouped[1][j + 1]) {
				
			nextRight = platformArrXGrouped[1][j + 1];
			break;

		} else if (hole && blockX === platformArrXGrouped[1][j + 1]) {
			nextRight = platformArrXGrouped[1][j + 1];
			break;

		} else {
			continue;
		};
	};

	/*Needs to be called to check height before determaining if you are below the Y
	of the next platform to set maxRight*/
	onPlatformHeight();

	if (hole && currentY < currentPlatY && nextRight !== 0) {
		inAir = true;
		console.log('nextRight3');
		xMaxRight = nextRight - 50;

	}

	if (!hole) {
		nextRight = 0;
		xMaxRight = 0;

	}

}


const holeCheck = () => {

	for (let l = 0; l < platformArrXGrouped[1].length; l+=2) {

		if (blockX >= Math.floor(platformArrXGrouped[1][l])  && 
			blockX <= platformArrXGrouped[1][l + 1] -50 ) {
			hole = true;
			break;
		} else {

			// if (currentY < currentPlatY && currentY + 100 > currentPlatY) {
			// 	hole = true;
			// } else {
			
			hole = false;

		};

		if (!right3 || !left3) {
			hole = true;
		};
}
};

/*gets the baseHeight based off of currentPlatY or if your over a hole. The base height
represents the starting y value that will be displaced by += or -= Y to give the currentY
position of the block*/
const bHCall = () => {

	if (hole === false) {
	baseHeight = currentPlatY;
	noHoleHeight = currentPlatY;

	} else if (hole === true && inAir === false) {
		baseHeight = 0;

	} else if (hole === true && inAir === true) {
		baseHeight = currentPlatY;

	};

};

let xCheck = 0;
let mapXCheck = 0;

//the function below is a 'tuning' function for your blocks position.

const movingPlatAdj = (var1, var2) => {

	if (currentY < flat6Top && currentY + 100 > flat6Bottom) {
		console.log(6);

		if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			- blockX > 40 && flat6Direction === 0) {

			console.log('6.1.1');
			blockX = flat6Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			
		} else if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 2) {
		
			blockX = flat6Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			console.log('6.1.2');

		} else if (flat6Left -.0000000001 - blockX < 53 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 1 && right) {

			blockX = flat6Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;	
			console.log('6.1.3');

		} else if (blockX - flat6Right <= 0  && blockX - flat6Right > - 20 && flat6Direction
			=== 1) {

			console.log('6.2.1');
 			blockX = flat6Right;
			 x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;
	
		} else if (blockX - flat6Right <= 3 && blockX - flat6Right > - 20 && flat6Direction
			=== 2 && left) {

			console.log('6.2.2');
			blockX = flat6Right;
			x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;	

		 } else if (blockX - flat6Right <= 0 && blockX - flat6Right > -20 && flat6Direction
			=== 0) {

		 	console.log('6.2.3');		 	
			blockX = flat6Right;
			x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;				

		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left)
			-blockX > 40 && flat7Direction === 0) {

			console.log('7.1.1');
			blockX = flat7Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			
		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left) 
			-blockX > 40 && flat7Direction === 2) {

			console.log('7.1.2');
			blockX = flat7Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;

		} else if (Math.floor(flat7Left) - blockX <= 53 && Math.floor(flat7Left) 
			- blockX > 40 && flat7Direction === 1 && right) {

			console.log('7.1.3');
			blockX = flat7Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			
		} else if (blockX - flat7Right <= 0  && blockX - flat7Right > - 20 && flat7Direction
			=== 1) {

			console.log('7.2.1');
 			blockX = flat7Right;
			 x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;

		} else if (blockX - flat7Right <= 3 && blockX - flat7Right > - 20 && flat7Direction
			=== 2 && left) {

			console.log('7.2.2');
			blockX = flat7Right;
			x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;	

		 } else if (blockX - flat7Right <= 0 && blockX - flat7Right > -20 && flat7Direction
			=== 0) {

		 	console.log('7.2.3');
			blockX = flat7Right;
			x = blockX;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;				

		} else {

			console.log('7.2.4');
			left3 = true;
			right3 = true;

		}
	} else {

		for (let i = 0; i < 10; i ++ ) {

			//these are meant to readjust your position when you move and your x is not in an incrimant of ten. 

			if (x % 10 === i && x % 10 !== 0) {

				if (right) {

					if (!onPlatform) {
						x = x + 10 - i;
						blockX = x;
						block.style.left = `${x}px`;

				 	}

				} else if (left) {

					if (!onPlatform) {
						x = x - i;
						blockX = x;
						block.style.left = `${x}px`;

					}
				}
			}

			if (xMap % 10 === - i && xMap % 10 !== 0) {

				if (right) {

					if (!onPlatform) {
						console.log('platadjust');
						xMap = xMap - 10 + i;
						mapXMap = xMap;
						map.style.left = `${xMap}px`;
						platformXPostion(xMap);

					}
				} else if (left) {

					if (!onPlatform) {
						console.log('platadjust2');
						xMap = xMap + i;
						mapXMap = xMap;
						map.style.left = `${xMap}px`;
						platformXPostion(xMap);	

					}
				}
			};
		};

		right3 = true;
		left3 = true;

	};

};



/*Takes the value that the map has shifted when it scrolls from left to right, adjusts
the position of each platform acordingly-the left most part of the screen is always 0-
and then splices the new platform position into the platform array*/
const platformXPostion = (shift) => {

	flat1Left = 0 + shift;
	platformArrXGrouped[0].splice(0, 1, flat1Left);
	flat1Right = 600 + shift;
	platformArrXGrouped[0].splice(1, 1, flat1Right);
	hole1Left = 600.0000000001 + shift;
	platformArrXGrouped[1].splice(0, 1, hole1Left);
	hole1Right = 800 + shift;
	platformArrXGrouped[1].splice(1, 1, hole1Right);
	flat2Left = 800.0000000001 + shift;
	platformArrXGrouped[0].splice(2, 1, flat2Left);
	flat2Right = 1000 + shift;
	platformArrXGrouped[0].splice(3, 1, flat2Right);
	hole2Left = 1000.0000000001 + shift;
	platformArrXGrouped[1].splice(2, 1, hole2Left);
	hole2Right = 1200 + shift;
	platformArrXGrouped[1].splice(3, 1, hole2Right);
	flat3Left = 1200.0000000001 + shift;
	platformArrXGrouped[0].splice(4, 1, flat3Left);
	flat3Right = 1700 + shift;
	platformArrXGrouped[0].splice(5, 1, flat3Right);
	hole3Left = 1700.0000000001 + shift;
	platformArrXGrouped[1].splice(4, 1, hole3Left);
    hole3Right = 1980 + shift;
    platformArrXGrouped[1].splice(5, 1, hole3Right);
	flat4Left = 1980.0000000001 + shift;
	platformArrXGrouped[0].splice(6, 1, flat4Left);
	flat4Right = 2080 + shift;
	platformArrXGrouped[0].splice(7, 1, flat4Right);
	hole4Left = 2080.0000000001 + shift;
	platformArrXGrouped[1].splice(6, 1, hole4Left);
	hole4Right = 2330 + shift;
	platformArrXGrouped[1].splice(7, 1, hole4Right);
	flat5Left = 2330.0000000001 + shift;
	platformArrXGrouped[0].splice(8, 1, flat5Left);
	flat5Right = 2830 + shift;
	platformArrXGrouped[0].splice(9, 1, flat5Right);
	hole5Left = 2830.0000000001 + shift;
	platformArrXGrouped[1].splice(8, 1, hole5Left);
    hole5Right = 3030 + shift + hole5Move;
    platformArrXGrouped[1].splice(9, 1, hole5Right);
    flat6Left = 3030.0000000001 + shift + flat6Move;
    platformArrXGrouped[0].splice(10, 1, flat6Left);
	flat6Right = 3130 + shift + flat6Move;
	platformArrXGrouped[0].splice(11, 1, flat6Right);
	hole6Left = 3130.0000000001 + shift + hole6MoveL;
	platformArrXGrouped[1].splice(10, 1, hole6Left);
	hole6Right = 3590 + shift + hole6MoveR;
	platformArrXGrouped[1].splice(11, 1, hole6Right);
	flat7Left = 3590.0000000001 + shift + flat7Move;
	platformArrXGrouped[0].splice(12, 1, flat7Left);
	flat7Right = 3690 + shift + flat7Move;
	platformArrXGrouped[0].splice(13, 1, flat7Right);
	hole7Left = 3690.0000000001 + shift + hole7Move;
	platformArrXGrouped[1].splice(12, 1, hole7Left);
	hole7Right = 3890 + shift;
	platformArrXGrouped[1].splice(13, 1, hole7Right)
	flat8Left = 3890.0000000001 + shift;
	platformArrXGrouped[0].splice(14, 1, flat8Left);
	flat8Right = 4490 + shift;
	platformArrXGrouped[0].splice(15, 1, flat8Right);

	ai1left = 2465 + shift + ai1Move;
	
};

/*functions that converts the position of the block from a string 'xxpx' format based on
the css bottom setting into a number that can be more easily used. */

const getCurrentY = () => {
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	currentY = Number(yadasplit[0]);

};

/*The loop count of the moving platforms used to determain when they change direction*/
let loopCount = 0;

/*The main game loop.*/
const blockmove = () => {

	console.log('start');

	onPlatformHeight();
	getCurrentY();
	closestPlatformLeft();
	closestPlatformRight();
	bHCall();

	//Moves you right when pressing the right arrow.
	if (right && right2) {
	
		if (blockX < 760) {
			
			if (right3) {	
			mapMoving = false;
			x += 10;
			block.style.left = `${x}px`;
			blockX = x;
			}
		
		} else {
			if (right3) {
				console.log('right3');
				mapMoving = true;
				xMap -= 10;
				map.style.left = `${xMap}px`;
				mapXMap = xMap;
				platformXPostion(mapXMap);
			};
		};
	
	};

	/*Same as above but with left*/
	if (left && left2) {

		if (mapXMap >= 0) {
			mapMoving = false;

			if (blockX >= 10) {
				if (left3) {
					x -= 10;
					block.style.left = `${x}px`;
					blockX = x;
				};
			};

		} else if (mapXMap < 0) {

			if (blockX >= 400) {

				if (left3) {
					mapMoving = false;
					x -= 10;
					block.style.left = `${x}px`;
					blockX = x;
				};	

			} else if (blockX < 400) {
		
				mapMoving = true;
				xMap += 10;
				console.log('map move left3')
				map.style.left = `${xMap}px`;
				mapXMap = xMap;
				platformXPostion(mapXMap);
			
			};

		};
	
	};

	/*The blinking animation that occurs when you hit an ai*/
	const hitAIAnimation = () => {
		hitAnimation = true;

		const invisible = () => {
			block.style.visibility = 'hidden';
			setTimeout(visible, 50);

		}

		const visible = () => {
			iteration ++
			block.style.visibility = 'initial';

			if (iteration < 5) {
				console.log('visible2');
				setTimeout(invisible, 50);

			} else {
				console.log('visible3');
				iteration = 0;
				restart();

			};

		};

		setTimeout(invisible, 50);
	}

	/*This determains the movements of the moveing platform.*/
	if (mapMoving) {

		if (loopCount < 60) {
			flat6Move += 3;
			ai1Move += 3;
			hole5Move += 3;
			hole6MoveL +=3;
			hole6MoveR -= 3;
			flat7Move -= 3;
			hole7Move -= 3;
			flat6Direction = 1;
			flat7Direction = 2;

				if (onPlatform) {

					if (currentPlatIndex === 10) {

						if (blockX < 760) {
							mapMoving = false;
							x += 3;
							blockX = x;
							block.style.left = `${x}px`;

						} else if (blockX >= 760) {
							mapMoving = true;
							xMap -= 3;
							map.style.left = `${xMap}px`;
							mapXMap = xMap;
							platformXPostion(mapXMap);

						}

					} else if (currentPlatIndex === 12) {

						if (blockX >= 400) {
							
							mapMoving = false
							x -= 3;
							blockX = x;
							block.style.left = `${x}px`;

						} else if (blockX < 400) {
							mapMoving = true;
							xMap += 3;
							map.style.left = `${xMap}px`;
							mapXMap = xMap;
							platformXPostion(mapXMap);

						};
					};
				};

			loopCount ++;

		} else if (loopCount >= 60 && loopCount <= 100) {
			
			if (!right && !left) {
				mapMoving = false;
			};

			loopCount++;
			ai1Move = ai1Move;
			flat6Move = flat6Move;
			hole5Move = hole5Move;
			hole6MoveL = hole6MoveL;
			hole6MoveR = hole6MoveR;
			flat7Move = flat7Move;
			hole7Move = hole7Move;
			flat6Direction = 0;
			flat7Direction = 0;

		} else if (loopCount > 100 && loopCount <= 160) {
			ai1Move -= 3;
			flat6Move -= 3;
			hole5Move -= 3;
			hole6MoveL -=3;
			hole6MoveR += 3;
			flat7Move += 3;
			hole7Move += 3;
			flat6Direction = 2;
			flat7Direction = 1;

			if (onPlatform) {

				if (currentPlatIndex === 10) {

					if (blockX >= 400) {
						
						mapMoving = false
						x -= 3;
						blockX = x;
						block.style.left = `${x}px`;

					} else if (blockX < 400) {

						mapMoving = true;
						xMap += 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};

				} else if (currentPlatIndex === 12) {

					if (blockX < 760) {
						
						mapMoving = false;
						x += 3;
						blockX = x;
						block.style.left = `${x}px`;

					} else if (blockX >= 760) {

						mapMoving = true;
						xMap -= 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};
				};
			};

			loopCount++;
		} else if (loopCount > 160 && loopCount <= 200) {

			if (!right && !left) {
				mapMoving = false;
			};

			loopCount ++;
			ai1Move = ai1Move;
			flat6Move = flat6Move;
			hole5Move = hole5Move;
			hole6MoveL = hole6MoveL;
			hole6MoveR = hole6MoveR;
			flat7Move = flat7Move;
			hole7Move = hole7Move;
			flat6Direction = 0;
			flat7Direction = 0;

		} else if (loopCount > 200) {
			loopCount = 0;
		}
	};
	

	if (!mapMoving) {
		
		if (loopCount < 60) {

			ai1Move += 3;
			ai1left += 3;
			flat6Move += 3;
			flat7Move -= 3;
			hole5Move += 3;
			hole5Right += 3;
			hole6MoveL += 3;
			hole6Left += 3;
			hole6MoveR -= 3;
			hole6Right -= 3;
			hole7Move -=3;
			hole7Left -=3;
			flat6Direction = 1;
			flat7Direction = 2;

			if (onPlatform) {

				if (currentPlatIndex === 10) {

					if (blockX < 760) {
					
						mapMoving = false;
						x += 3;
						blockX = x;
						block.style.left = `${x}px`;

					}

					else if (blockX >= 760) {
					
						mapMoving = true;
						xMap -= 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};

				} else if (currentPlatIndex === 12) {

					if (blockX >= 400) {
					
						mapMoving = false
						x -= 3;
						blockX = x;
						block.style.left = `${x}px`;

					} else if (blockX < 400) {
						console.log('moving plat plus2')
						mapMoving = true;
						xMap += 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};

				};
			};

			loopCount ++;

		} else if (loopCount >= 60 && loopCount <= 100) {

			ai1Move = ai1Move;
			flat6Move = flat6Move;
			hole5Move = hole5Move;
			flat7Move = flat7Move;
			hole6MoveL = hole6MoveL;
			hole6MoveR = hole6MoveR;
			hole7Move = hole7Move;
			flat6Direction = 0;
			flat7Direction = 0;
			loopCount++;

		} else if (loopCount > 100 && loopCount <= 160) {

			ai1Move -= 3;
			ai1left -= 3;
			flat6Move -= 3;
			flat7Move += 3;
			hole5Move -= 3;
			hole5Right -= 3;
			hole6MoveL -= 3;
			hole6Left -= 3;
			hole6MoveR += 3;
			hole6Right += 3;
			hole7Move +=3;
			hole7Left +=3;

			if (onPlatform) {

				if (currentPlatIndex === 10) {

					if (blockX >= 400) {
					
						mapMoving = false
						x -= 3;
						blockX = x;
						block.style.left = `${x}px`;

					} else if (blockX < 400) {
					
						mapMoving = true;
						xMap += 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};	

				} else if (currentPlatIndex === 12) {

					if (blockX < 760) {
						
						mapMoving = false;
						x += 3;
						blockX = x;
						block.style.left = `${x}px`;

					} else if (blockX >= 760) {
						mapMoving = true;
						xMap -= 3;
						map.style.left = `${xMap}px`;
						mapXMap = xMap;
						platformXPostion(mapXMap);

					};
				};
			};

			flat6Direction = 2;
			flat7Direction = 1;		
			loopCount++;

		} else if (loopCount > 160 && loopCount <= 200) {

			ai1Move = ai1Move;
			flat6Move = flat6Move;
			hole5Move = hole5Move;
			flat7Move = flat7Move;
			hole6MoveL = hole6MoveL;
			hole6MoveR = hole6MoveR;
			hole7Move = hole7Move;
			flat6Direction = 0;
			flat7Direction = 0;
			loopCount ++;

		} else if (loopCount > 200) {
			loopCount = 0;

		};

	}

	platformXPostion(mapXMap);
	movingPlatAdj();
	holeCheck();
	getCurrentY();
	closestPlatformLeft();
	closestPlatformRight();
	bHCall();

	/*All the lines below are the jump logic and various side logic that takes place while
	your jumping in various cercumstances. */
	if (up && up2 && up3) {

		if (currentY < baseHeight + maxJump && chCheck === false) {
			console.log('1.1');
			inAir = true;				
			down = false;
			y += 10;
			block.style.bottom = `${baseHeight + y}px`;
			falling = false;
		} else if (currentY < baseHeight + maxJump && chCheck === true) {
			console.log('1.2');						
			down = false;
			y += 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
			falling = false;
		}  else if (currentY >= baseHeight + maxJump) {
			console.log('1.3');
			down = false;
			heightCheck = [];
			heightCheck.push(currentY);
			up2 = false;
			chCheck = true;
			y = 0;
		};
	};

	if (up && !up2 && up3) {
		right2 = true;
		left2 = true;

		if (currentY > baseHeight ) {
			console.log('2.1');
			down = false;
			y -= 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
			onPlatformHeight();
			getCurrentY();
			closestPlatformLeft();
			closestPlatformRight();
			bHCall();
			falling = true;

		} else if (currentY <= baseHeight) {
			console.log('2.2');

			if (hole === true) {
				console.log('2.2.1')

				if (chCheck === true) {
					console.log('2.2.1.1');
					down = false;
					y -= 10;
					block.style.bottom = `${heightCheck[0] + y}px`;
					onPlatformHeight();
					getCurrentY();
					closestPlatformLeft();
					closestPlatformRight();			
					bHCall();
					falling = true;

					if (currentY < currentPlatY) {
						inAir = true;
						console.log('2.2.1.1.1');

						if (xMaxLeft > 0) {
							left2 = true;
							right2 = true;
							console.log('2.2.1.1.1.1');

							if (blockX <= xMaxLeft && !belowPlatform) {
								console.log('2.2.1.1.1.1.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight && !belowPlatform) {
								console.log('2.2.1.1.1.1.2');
								right2 = false;
								
							};
						};
					};

				} else if (chCheck === false){
					console.log('2.2.1.2');
					down = false;
					y -= 10;
					block.style.bottom = `${baseHeight + y}px`;
					falling = true;

					if (currentY < currentPlatY) {

						inAir = true;

						if (xMaxLeft > 0) {
						left2 = true;
						right2 = true;

							if (blockX <= xMaxLeft && !belowPlatform) {
								console.log('3.3.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight && !belowPlatform) {
								console.log('3.3.2');
								right2 = false;
								
							};
						};
					};
				};	 

			 } else if (!hole && belowPlatform) {
				down = false;
				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				bHCall();
				falling = true;

			 }
		};
	};

	if (!up && up3) {

		right2 = true;
		left2 = true;
		
		if (currentY > baseHeight && down === false) {
			
			console.log('3.1');
			chCheck = true;
			y -= 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
			down = true;
			up2 = false;
			onPlatformHeight();
			getCurrentY();
			closestPlatformLeft();
			closestPlatformRight();				
			bHCall();
			falling = true;

		} else if (currentY > baseHeight && down === true) {

			console.log('3.2');
			y -= 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
			onPlatformHeight();
			getCurrentY();
			closestPlatformLeft();
			closestPlatformRight();
			bHCall();
			falling = true;

			if (currentY < currentPlatY) {
				inAir = true;
				
				if (xMaxLeft > 0) {
					left2 = true;
					right2 = true;

					if (blockX <= xMaxLeft && !belowPlatform) {
						console.log('3.3.1');
						left2 = false;
						
					} else if (blockX >= xMaxRight && !belowPlatform) {
						console.log('3.3.2');
						right2 = false;
						
					};
				};
			};

		} else if (currentY <= baseHeight) {

			if (hole && blockX !== 0) {
				console.log('3.3');
				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				bHCall();
				falling = true;
				if (currentY < currentPlatY) {

					console.log('3.3.1');
					inAir = true;

					if (xMaxLeft > 0) {
						console.log('3.3.1.1');
						left2 = true;
						right2 = true;

						if (blockX <= xMaxLeft && !belowPlatform) {
							console.log('3.3.1.1.1');
							left2 = false;
							
						} else if (blockX >= xMaxRight && !belowPlatform) {
							console.log('3.3.1.1.2');
							right2 = false;
							
						};
					};
				};

			} else if (!hole && belowPlatform) {

				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				bHCall();
				falling = true;

			} else {
				console.log('3.4');
				up2 = true;
				down = false;
				y = 0;
				heightCheck = [currentY];
				chCheck = false;
				inAir = false;
				left2 = true;
				right2 = true;
				falling = false;

			};
		};
	};

    /*Resets most of the values when you fall or hit the ai and restart.*/
  	const restart = () => {

		if (hitAnimation) {
			requestAnimationFrame(blockmove);
		};

		console.log('restart')
		falling = false;
		hitAnimation = false;
		y = 0;
		xCheck = 0;
		mapXCheck = 0;
		left2 = true;
		right2 = true;
		right3 = true;
		left3 = true;
		up3 = true;
		down = true;
		currentY = 200;
		currentPlatY = 200;	
		heightCheck = [200];
		inAir = false;
		x = 0;
		block.style.left = `${x}px`;
		blockX = x;
		block.style.bottom = '200px';
		xMap = 0;
		map.style.left = `${xMap}px`;
		mapXMap = xMap;
		platformXPostion(mapXMap);

  	};


	/*Restarts if you fall all the way down a hole*/
	if (currentY < -100) {
		console.log('1');
		restart();

	};

	onPlatformHeight();
	getCurrentY();
	closestPlatformLeft();
	closestPlatformRight();		
	bHCall();

	/*logic that determains when you hit the ai*/
	if (currentY <= ai1BaseHeight + 50) {

		if (blockX >= ai1left - 50 && blockX <= ai1left + 50) {

			if (falling) {
			up3 = false;
			left2 = false;
			right2 = false;
			hitAIAnimation();

			} else {
				up3 = false;
				left2 = false;
				right2 = false;

				if (ai1left - blockX > 0) {
					ai1left = blockX + 50;

				} else if (ai1left - blockX < 0) {
					ai1left = blockX - 50;

				}

				hitAIAnimation();
			};

		}
	};

	ai1.style.left = `${ai1left}px`;
	base6.style.left = `${flat6Left}px`;
	base7.style.left = `${flat7Left}px`;

	console.log(x);
	console.log(nextRight);
	console.log(xMaxRight);
	console.log(currentPlatY);
	console.log(currentY);
	console.log(belowPlatform);
	console.log(xMap);
	console.log(mapXCheck);
	console.log(flat6Direction);
	console.log(flat7Direction);

	// if (xCheck === 0) {
	// 	xCheck = x;
	// }

	// if (mapXCheck === 0) {
	// 	mapXCheck = xMap;
	// }

	// if (xCheck !== 0) {
	// 	if (xCheck - x > 13 || xCheck - x < - 13) {
	// 		console.log('pause1');
	// 		xCheck = x;
	// 		pause = true;
	// 	} else {
	// 		xCheck = x;
	// 	}

	// }

	// if (mapXCheck !== 0) {
	// 	if (mapXCheck - xMap > 13 || mapXCheck - xMap < -13) {
	// 		console.log('pause2');
	// 		mapXCheck = xMap;
	// 		pause = true;
	// 	} else {
	// 		mapXCheck = xMap;
	// 	}
	// };


	console.log('end');

	if (!hitAnimation && !pause) {
		requestAnimationFrame(blockmove);

	};

}

document.addEventListener('keydown', move);
document.addEventListener('keyup', move2);
requestAnimationFrame(blockmove);

