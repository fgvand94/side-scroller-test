
const block = document.querySelector('.block');
const what = document.querySelector('.what');
const what2 = document.querySelector('.what2');
const allPlatforms = document.querySelector('#block');
const allHoles = document.querySelector('#hole');
const map = document.querySelector('.con');
const ai1 = document.querySelector('.ai1');
const base6 = document.querySelector('.base6');
const base7 = document.querySelector('.base7');
/*const allPlatformWidth = allPlatforms.style.width;*/


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
and stop point of your character. I guess this is what's used for the 'collision physics' if
you want to call it that. */
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

/*Direction variables for the moving platforms. 0 1 and 2 represent stationary left and right*/
let flat6Direction = 0;
let flat7Direction = 0;


/*Max and min jump heights*/
let maxJump = 140;
let minJump = 30;

/*chCheck is just to check if i'm using the current heigth array to define the
y position. This is nececary because while defining the current height on the y
for everything would work, and it's part of what stopped all the jumping around 
and stuff. It doesn't work when for the first part of the function when you 
initially press the up button because you have to essentially define the current
height(it's not exaclty the current height that's sort of a misleading word) in 
a previous function. because if you define it outside the jump logic but in the
loop it just constantly resets every itself every frame and makes your jumps accelerate
as your jumping and not have a consistent speed. That number is meant as a starting
point to increment down or up by y but if the number itselft is changing then
y will not go up or down by y linearly but accelerate majorly. also the array
has to be defined at specific points-there's only to- where the loop is only that
value for one frame. where down is false and then switches to true and where
the jump reaches its maximum height and then can be used in all the other functions
and then reset to empty and the chcheck turned to false when you hit the ground again.
I might be able to define it initally outside of the loop just with the y value
of new base height variable. Actually i might be able to basically get rid of it
we'll see. */


let chCheck = false;

/*This is really just to show when your falling in a hole actually. The name inAir should probably
be changed. */
let inAir = false;


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
 	
}

/*I think defining the if e.key code in move two will prevent the interupts that
happen sometime when you press left to right to fast */
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
will fall though and is set to 0 when your over a hole. I don't actually know if I need
both it just sort of came out that way as I was making it. blockX is your blocksX position
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

/*Gets the Y value of the platform your over. It should probably be called 'overPlatformHeight'
or something else because it gets the Y if your on or above the platform within the same X/
It sets current platY, onPlatform, belowPlatform and currentPlatIndex by looping through the
platform array and Matching a platform position to your x position.*/
const onPlatformHeight = () => {
	for (let k = 0; k < platformArrXGrouped[0].length; k+=2) {
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
			if (blockX === platformArrXGrouped[0][k] -50.0000000001 || blockX ===
				platformArrXGrouped[0][k + 1]) {
				console.log('platY hole true');
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
			console.log(j);

		break;

		} else if (hole && blockX === platformArrXGrouped[1][j + 1]) {
			nextRight = platformArrXGrouped[1][j + 1];
			console.log('nextRight2');
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
	} else	{	
		hole = false;
	};

	if (!right3 || !left3) {
		hole = true;
	};
}
};

/*gets the baseHeight based of of currentPlatY or if your over a hole. The base height
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



/*The below variable and the function below are 'tuning' functions.
the block moves in increaments of ten but that's faster then the platforms needed to be.
all my functions for determining whether you hit the side of a platform or where a hole is
are based by matching the exact value of the end of a platform with the edge of your character.
All of which are in increments of ten. To make the colisions and all my functions behave 
properly when the positions weren't in increments of ten I had to create a function that
sort of detected when this wouldn't be the case-when the platform and block wouldn't match up-
and make fine adjustments to the positions so that my functions worked*/
/*I'll detail everything out more specifically later*/
let blockXAdj = 0;

const movingPlatAdj = (var1, var2) => {


	if (currentY < flat6Top && currentY + 100 > flat6Bottom) {
		console.log(6);
		if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			- blockX > 40 && flat6Direction === 0) {
			console.log('6.1.1');
			
			blockX = flat6Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			
		} else if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 2) {
		
			blockX = flat6Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			
			console.log('6.1.2');



/*The below jumps after I fall below the line of the moving platform. It seems like
nothing actually moves while i'm hitting the side of the platform. at least when
I hit it after jumping off the previous platform. This I believe has something
to do with the map shift cause it's about the only scenario where the map shift
applies while any of these are excecuting.*/
		} else if (flat6Left -.0000000001 - blockX < 53 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 1 && right) {

			
		
			blockX = flat6Left - 50;
			x = blockX;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			/*mapXMap -= 3;
			map.style.left = `${mapXMap}px`;*/
			
		
			console.log('6.1.3');
		} else if (blockX - flat6Right <= 0  && blockX - flat6Right > - 20 && flat6Direction
			=== 1) {
			console.log('6.2.1');
 			blockX = flat6Right;
			block.style.left = `${blockX}px`;
			
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;
			/*I put three in the below because when left3 = false the platform
			will always move before you do putting it three away at everyframe
			but since your holding left you have the intention of moving in that
			direction so you need to say < 3 and not < 0 because it actually will
			be between 0 and 3 at every next frame while this is happening. It definitly
			seem to help some of the jerkiness here but it's still not perfect*/
		} else if (blockX - flat6Right <= 3 && blockX - flat6Right > - 20 && flat6Direction
			=== 2 && left) {
			console.log('6.2.2');
			
			blockX = flat6Right;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;
				

		 } else if (blockX - flat6Right <= 0 && blockX - flat6Right > -20 && flat6Direction
			=== 0) {
		 	console.log('6.2.3');
		 	
			blockX = flat6Right;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;				

		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left)
			-blockX > 40 && flat7Direction === 0) {
			console.log('7.1.1');
					
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			
		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left) 
			-blockX > 40 && flat7Direction === 2) {
			console.log('7.1.2');
			
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			

		} else if (Math.floor(flat7Left) - blockX <= 53 && Math.floor(flat7Left) 
			- blockX > 40 && flat7Direction === 1 && right) {
			console.log('7.1.3');
			
			
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			

		} else if (blockX - flat7Right <= 0  && blockX - flat7Right > - 20 && flat7Direction
			=== 1) {
			console.log('7.2.1');
 			blockX = flat7Right;
			block.style.left = `${blockX}px`;
			
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;

		} else if (blockX - flat7Right <= 3 && blockX - flat7Right > - 20 && flat7Direction
			=== 2 && left) {
			console.log('7.2.2');
			blockX = flat7Right;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;	
			

		 } else if (blockX - flat7Right <= 0 && blockX - flat7Right > -20 && flat7Direction
			=== 0) {
		 	console.log('7.2.3');
		 	
			blockX = flat7Right;
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
					xMap = xMap -10 + i;
					mapXMap = xMap;
					map.style.left = `${xMap}px`;
					platformXPostion(xMap);
					}
				} else if (left) {
					if (!onPlatform) {
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

	/*	x = x + blockXAdj;
		blockX = x;
		block.style.left = `${x}px`;
		console.log(x);
		right3 = true;
		left3 = true;
		blockXAdj = 0;*/
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

	/*functions that converts the postion of the block from a string 'xxpx' format based on
	the css bottom setting into a number that can be more easily used. */
	const getCurrentY = () => {
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	currentY = Number(yadasplit[0]);		
	};

	/*The loop count of the moving platforms used to determain when they change direction*/
	let loopCount = 0;

	/*The main game loop. I should probably just call it game loop cause there's more
	then just block movements in here*/
const blockmove = () => {




		onPlatformHeight();
		getCurrentY();
		closestPlatformLeft();
		closestPlatformRight();
		bHCall();

	/*I got the left and the right movements making the map shift and also stoped
	the block when he reaches the left end. I got the hole glitches fixed mostly
	although I think it could maybe be better but before I do this i'm going to
	try to make the holes work when the platforms are at different heights. It seems
	when playing around with the map shift that it definitly effects things because
	it thinks holes are at areas there not. I was thinking i'd have to do two versions
	of all the moves. I forgot about my shifts though so I probably just need to implement
	that.*/
	

	/*determains the movement of the block and map to the right in various cercumstances*/
		/*Tryiing to make sense of what i'm seeing in the console as far as the jerkiness
		goes. I thought it was basically only when I jump. It seems that way. However in
		the console I see strange behavior before the jump in some cases. I switched
		the right to < 760 because not everything goes in 10's now so that makes more sense
		I doubt that will fix everything. what i'm seeing though is x is at 762. It shouldn't
		be but x shifted up 3 from 759 I beleieve before map moving went false and the other
		platform move function happened. I made a function that should fix that. But anyway
		It goes from 762 and -2431 for xmap. this is when the plat is all the way to the 
		right. next fram 762 and 2441 so I must have started moving then and since I was
		above 750 the map moved. whats strange is the next fram. x is 756 and xmap is 2451.
		idk why it moved 6. I hadn't jumped yet. what's really happenining on these platforms
		is that the right/ left functions trigger so either you or the map goes over ten.
		then the platform moves so if it's the oposite direction you go back by three. 
		then jump triggers. so if  you jump the plat adjust won't do the smooth ouut to 
		tens until the next frame and after the platform and origional block move have happened.
		just this might be part of the jerky look. So rearanging things and maybe making more
		complex logic where if your on a moving platform and moving you move by 10 - 3 instead
		of having them happen in distinct steps. The strange thing though is still the 6 move.
		it happened two frames in a row before a jump triggered even. and both above
		760. I have no idea why. when I do jump the first frame xmap is the same 2461 before
		jump and then on jump 2461 again at 210 and then after the next frame when the
		adjust triggers it jumps to 2480. I have it set - 10 + i for right and just + i
		for left. What would be better is to base that off of which side of 5 it was on
		so it would adjust either up or down in the smoothest way. cause ideally that would
		have gone 2461 2470 not 2461 2480. I still don't know exactly why it adjusted six
		but i'm pretty sure that the jerkiness is a combination of a bunch of those little
		things mentioned above.  */ 
	
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
		map.style.left = `${xMap}px`;
		mapXMap = xMap;
		platformXPostion(mapXMap);
		
	};


	};
	
	};

/*The blinking animation that occurs when you hit an ai*/
	 	const hitAIAnimation = () => {
  		hitAnimation = true;

  		console.log(iteration);
  		const invisible = () => {
  			console.log('invisible');
  			block.style.visibility = 'hidden';
  			setTimeout(visible, 50);
  		}

  		const visible = () => {
  			console.log('visible1');
  			
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

		/*This determains the movements of the moveing platform. This and the fine tuning
		function are probably the most complicated parts of all of this. It has to move properly
		when the map is moving as well as when everything is stationary.*/
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
						}	else if (blockX >= 760) {
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
						}	else if (blockX >= 760) {
								mapMoving = true;
								xMap -= 3;
								map.style.left = `${xMap}px`;
								mapXMap = xMap;
								platformXPostion(mapXMap);
							};
						};
					};

			loopCount++;
		}  else if (loopCount > 160 && loopCount <= 200) {
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
		/*ai1Move = 0;*/
		
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
					}
						else if (blockX >= 760) {
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
		}  else if (loopCount > 160 && loopCount <= 200) {
			/*if (xMap % 10 !== 0) {
				xMap = xMap - (xMap % 10);
				mapXMap = xMap;
				map.style.left = `${xMap}px`;
				platformXPostion(xMap);
			}*/
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
		if (currentY > baseHeight ){
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

	if (!up && up3) { console.log('also three something');
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

		} else if (currentY <= baseHeight) {console.log('3something')
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

  /*Resets most of the values when you fall or hit the ai and restart. The if hitAnimation
  was needed to fix the game restarting and still blinking like the hit animation was playing*/
  	const restart = () => {
  		if (hitAnimation) {
  			requestAnimationFrame(blockmove);
  		};
  	falling = false;
  	hitAnimation = false;
 	y = 0;
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

	if (x > 760) {
		let adjust = x - 760;
		xMap = xMap - adjust;
	};





	ai1.style.left = `${ai1left}px`;
	base6.style.left = `${flat6Left}px`;
	base7.style.left = `${flat7Left}px`;

	what.innerHTML = `${mapMoving} ${blockX} ${x}  ${xMap} ${currentPlatIndex} ${onPlatform} ${xMaxLeft} ${belowPlatform} ${left2} ${hole}`;



console.log(x);
console.log(xMap);
console.log(currentY)




	if (!hitAnimation) {
		requestAnimationFrame(blockmove)
	};

	
}


document.addEventListener('keydown', move);
document.addEventListener('keyup', move2);
requestAnimationFrame(blockmove);