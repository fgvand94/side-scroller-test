/*I'm going to eventually learn an actual engine because it will have more functionality
and be easier probably but I kind of want to make one level of a rudementary
side scroller with obsticals and ai using nothing but vanilla js if I can because
I think it would be a good learning experience*/
const block = document.querySelector('.block');
const what = document.querySelector('.what');
const what2 = document.querySelector('.what2');
const allPlatforms = document.querySelector('#block');
const allHoles = document.querySelector('#hole');
const map = document.querySelector('.con');
/*const allPlatformWidth = allPlatforms.style.width;*/
/*There might be a built in way to find the x cordinat of a div at any given point
and if so i might use it but I think I might be able to create one. I mean I could
just label the left and right point of every element but when the screen starts 
scrolling i'll have to make the cordinates movable. I'm thinking I could just
put the variable for left and right of all the objects in a function with one argument
and then every loop I could pass into that argument the value that the screen
scrolls for that given fram and add or subtract the x cordinate from that and then
I could use those variables to dynamically define my buttom point for jumps and
things instead of just having everything set to 200px*/
let right = false;
let right2 = true;
let left = false;
let left2 = true;
let up = false;
let up2 = true;
let down = false;
/*For some reason having current height[0] defined off the bat, which I was going
to do to try to get ride of the chCheck, makes the first !up function trigger and
drops the block down 8 pixels. I'm not 100% sure why but I'm going to do other things
and then maybe come back to that.*/
let heightCheck = [200];
let x = 0;
let y = 0;
let xMap = 0;
block.style.bottom = '200px';
block.style.left = '0px';

let	flat1Left = 0;
let	flat1Right = 600;
let flat1Top = 200;
let	hole1Left = 600.0000000001;
let	hole1Right = 800;
let	flat2Left = 800.0000000001;
let	flat2Right = 1000;
let flat2Top = 240;
let	hole2Left = 1000.0000000001;
let	hole2Right = 1200;
let	flat3Left = 1200.0000000001;
let	flat3Right = 1700;
let flat3Top = 200;
let hole3Left = 1700.0000000001;
let hole3Right = 1900;
let flat4Left = 1900.0000000001;
let flat4Right = 2000;
let flat4Top = 200;
let platformArrX = [flat1Left, flat1Right, hole1Left, hole1Right, flat2Left, flat2Right
, hole2Left, hole2Right, flat3Left, flat3Right, hole3Left, hole3Right, flat4Left,
flat4Right];
let platformArrXGrouped = [[flat1Left, flat1Right, flat2Left, flat2Right,
flat3Left, flat3Right, flat4Left, flat4Right], [hole1Left, hole1Right, hole2Left, hole2Right,
hole3Left, hole3Right]];
let platformArrY = [flat1Top, flat2Top, flat3Top, flat4Top];
console.log(platformArrX[1]);
console.log(platformArrX[3]);
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
let inAir = false;

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
 	}

 	 	if (e.keyCode === 38) {
 		up = false;
 	}

 	if (e.keyCode === 39) {
 		right = false;
 	}
};
/*I could maybe combine currentplaty and base heigth I'm going to wait htough*/
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
/*This method is going to get insane when I start doing more complicated things
and making the map bigger so i'll probably have to find something different but
for now i'm just going to try and make it work like this and maybe that will give
me better ideas going forward. If there was someway I could find the heigth of the
div element at the current x position of the block that would make things much
easier. I also need to find a dynamic way to not let the block pass the div margins
when it falls into a hole and thinking of more complex levels i would need to find
someway where it could dedect the left and right margin of smaller platforms and
other objects in the environment so that it wouldn't be able to move passed them. */

		/*I could maybe combine this and the closest platfrom. also I could maybe
		combine the right and left closest platform but i'm just going to do it
		like this for now and decide later if i want to do that*/
const onPlatformHeight = () => {
	for (let k = 0; k < platformArrXGrouped[0].length; k+=2) {
		if (hole === false && blockX >= platformArrXGrouped[0][k] -50.0000000001 
			&& blockX <= platformArrXGrouped[0][k + 1]) {
			what2.innerHTML = `${platformArrXGrouped[0][k]} 
								${platformArrXGrouped[0][k + 1]}`;
			currentPlatY = platformArrY[k/2];
			/*The below fixed most of the problems with the block slipping in below
			the top of the platform because the maxx is based on if current Y is less
			than plat Y and it wasn't working in cases where you got right at the boundary
			for the next platform so hole === true bu the current plat Y didn't shift yet.
			This turns true whenever it's supposed to now there's just one scenerio where
			you drop 10 below playY right as you hit the boudary. It looks like curreny
			is switching 1 frame to late. */
		} else if (hole === true) {
			if (blockX === platformArrXGrouped[0][k] -50.0000000001 || blockX ===
				platformArrXGrouped[0][k + 1]) {
				console.log('platY hole true');
				currentPlatY = platformArrY[k/2];
			} else {
				continue;
			};

		} else {
			continue;
		};
	};/*
	if (hole === true) {
		currentPlatY = 0;
	}*/
}

/*There's a problem after adding the map shift function where the block will
slip through the platform when falling left after you move right far enough 
for the map to shift. I don't know why exactly but it seems that for some reason
the max left and next left get set to some strang value. 460.00000000000006. This
is 4 more zeros than I have on anything and nothing ends in a 6 on the decimal so
i'm not sure whats causing this but it seems like that has to be the issue unless
there's something else i'm not noticing.*/
const closestPlatformLeft = () => {
	/*idk if i want to just say this and call nextleft the platfrom arr or if
	I want to define this without hole, define it as nextleft and then in an 
	inner if say if hole = true and height yada than max left.*/
	/*for some reason maxleft goes to undefined after the first time 3.3.1 executes
	for the first hole and it goes from 1000 down to 750 at the second hole. it works
	out on the first hole because left2 doesn't switch to true but max right also shrings
	on the second hole and so it switches back on. IDK why either of these things is happening
	I could probably fix it by ont turning on the right in the left scenario and vice versa
	but it was thinking for if I do a level with a lot of falling and holes built in I
	might need that. also if you fall go left left gets turned off then you go right
	you wont be able to go left again.*/
	for (let i = 0; i < platformArrXGrouped[1].length; i+=2) {
		
		if (hole && blockX >= Math.floor(platformArrXGrouped[1][i]) && blockX <= 
			platformArrXGrouped[1][i + 1]) {
			nextLeft = Math.floor(platformArrXGrouped[1][i]);

		break;
		/*} else if (hole && blockX === platformArrXGrouped[i]) {
			nextLeft = platformArrXGrouped[1][i]-.0000000001;
			break;
		*/} else {
			continue;
		};
	};
	/*I'm just doing two hundred for now but when I have platforms of different
	height I'm thinking I'll try to find some way to map the height of a given elemtn
	in the heigth array to the given element in the platform x array and then use that
	make like an index when nextLeft is defined give an numerical value to avariable
	based on what i was at the time and have a map of that if that variable equals some
	value height array index = some value that corrasponds to that height..... something
	like that. idk if there's a way to make divs act more solid compared to the block
	character without defining all the locaitons like this. I'm sure in other engines and
	things there is but js wasn't really designed for that as far as i'm awar
	so idk if there is an easier way to do it or not.*/
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

const closestPlatformRight = () => {
		for (let j = 0; j < platformArrXGrouped[1].length; j+=2) {
		if (hole && blockX >= Math.floor(platformArrXGrouped[1][j]) && blockX <= 
			platformArrXGrouped[1][j + 1]) {
			nextRight = platformArrXGrouped[1][j + 1];
			console.log('nextRight');
		break;
		/*the below is uneccasary lol. I would trigger true at the same instance above
		because it's still >= [1][j];*/
		} else if (hole && blockX === platformArrXGrouped[1][j + 1]) {
			nextRight = platformArrXGrouped[1][j + 1];
			console.log('nextRight2');
			break;
		} else {
			continue;
		};
	};

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
	if (blockX >= Math.floor(hole1Left)  && blockX <= hole1Right -50 
		|| blockX >= Math.floor(hole2Left) && blockX <= hole2Right - 50
		|| blockX >= Math.floor(hole3Left) && blockX <= hole3Right - 50) {
		hole = true;
	} else {
		hole = false;
	};
/*
	if (blockX >= hole2Left && blockX <= hole2Right) {
		hole = true;
	} else {
		hole = false;
	};*/
};

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

const platformXPostion = (shift) => {
	flat1Left = 0 + shift;
	platformArrXGrouped[0].splice(0, 1, flat1Left);
	flat1Right = 600 + shift;
	platformArrXGrouped[0].splice(1, 1, flat1Right);
	hole1Left = 600.0000000001 + shift;
	platformArrXGrouped[1].splice(0, 1, hole1Left);
	/*I have no idea where this extra 8 or so pixels is coming from in hole1right
	I was thinking it had something to do with my blockX because it seemed alsmost
	exactly the 8 that was being incremented in the x direction. I couldn't find anything
	wrong so I diceded to fill in the hole with a color. Turns out there's a gap between
	inline block div elements because of the word spacing. Putting the parent container
	font size to zero fixed this. */
	/*Instead of making this 750 I could possibly just make the values for falling
	and the pertanent things block x when moving right and blockx2 when left. however
	if you were half way from faling off the right side of something and you tapped left
	that would cause problems. but instead of making it so it was based on if you moved
	left or right you could make it based on if the hole is on the right or left side of you.
	I'm not going to do that now but it might make more sense for latter ideas or just
	going forward in general I could change the code to do that instead*/
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
    hole3Right = 1900 + shift;
    platformArrXGrouped[1].splice(5, 1, hole3Right);
	flat4Left = 1900.0000000001 + shift;
	flat4Right = 2000 + shift;


};

	const getCurrentY = () => {
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	currentY = Number(yadasplit[0]);		
	};


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
	that but*/
	if (right && right2) {
	
		if (blockX <= 750) {
	x += 10;
	block.style.left = `${x}px`;
	blockX = x;
	} else {
	xMap -= 10;
	map.style.left = `${xMap}px`;
	mapXMap = xMap;
	platformXPostion(mapXMap);
		/*document.body.style.left = xpx or something. And then I'll basically
		put my entire move functions-if i'm thikning right it might come out
		different- in if else statements bases on this and if the world is moving
		i'll make everything based on that instead of the block position. actually
		I might not even need to do that but we'll see the wold moving might work
		by itselft without having to change much else. maybe a little bit we'll see*/
	};

	
		/*x += 10;
	block.style.left = `${x}px`;
	blockX = x;*/
};
	if (left && left2) {

		if (mapXMap >= 0) {
			if (blockX >= 10) {
		x -= 10;
		block.style.left = `${x}px`;
		blockX = x;
		};
	} else if (mapXMap < 0) {
		if (blockX >= 200) {
	x -= 10;
	block.style.left = `${x}px`;
	blockX = x;			
		} else if (blockX < 200) {
		xMap += 10;
		map.style.left = `${xMap}px`;
		mapXMap = xMap;
		platformXPostion(mapXMap);
	};


	};
			/*x -= 10;
		block.style.left = `${x}px`;
		blockX = x;*/		
	};

	holeCheck();
	getCurrentY();
	closestPlatformLeft();
	closestPlatformRight();
	bHCall();
	/*I was going to base this on the length of the string of block.style.bottom
	but if it's done properly itll always be 5.*/
	


	
	/*I wansn't thinking that every time the loop started down would restart to
	false here so It needs to be outside the loop*/
	
	
	
/*	${heightCheck[0]} ${down} ${currentY} ${blockX} ${platformArrXGrouped[0][4]} ${platformArrXGrouped[0][5]}*/

what.innerHTML = `${baseHeight} ${currentPlatY} ${currentY} ${nextLeft} 
${xMaxLeft} ${nextRight} ${xMaxRight} ${baseHeight} ${hole} ${inAir}`;
/*console.log(heightCheck[0]);
console.log(currentY);
console.log(y);
console.log(down);*/



/*I'm going to eventually have to make this more dynamic and make everything not
based on the absolute height of 200px but whatever the height of the floor is
that's under the block*/
/*I got all the glitching and jumping around and going below 200 to work. The only thing
now really is that i need to keep you from floating higher mid air. make like a
in air variable and set it to true every time your in the air so that if you let
off it will start going down like it's supposed to but then not let any of the 
functions work again untill after he's touched the ground. This actually-I don't really
know i'll have to see- allow me to refactor some of this and make it simpler. idk
at the moment though.*/

/*I need to maybe add a minumum jump height and also point at which the jump go
from it's heighest point to where it starts to drop seams kind of abrubt. Or something
there's something off about that as well. */

/*There's a problem with the block getting sort of stuck in y levels that aren't
on a platfomr or at the bottom of a hole. I think this has something to do with the
fact that............ actually idk i was thinking somehing about the 10/8 increment
but i'm not sure i'll worry about that later*/
/*I couldn't remember how i got it to stop auto jumpint when holding up. I think
i just had up2 setting back to true at the end of the up !up2 function and removed
it*/
/*I don't know why I put so many down = false. I was trying to get to the next thing
and didn't think about it enough. I'll worry about that later. */
	if (up && up2) {
		if (currentY < baseHeight + 120 && chCheck === false) {
			console.log('1.1');
			inAir = true;				
			down = false;
		y += 10;
		block.style.bottom = `${baseHeight + y}px`;
	} else if (currentY < baseHeight + 120 && chCheck === true) {
		console.log('1.2');						
		down = false;
		y += 10;
		block.style.bottom = `${heightCheck[0] + y}px`;
	}  else if (currentY >= baseHeight + 120) {
		console.log('1.3');
		down = false;
		heightCheck = [];
		heightCheck.push(currentY);
		up2 = false;
		chCheck = true;
		y = 0;
	};
};
	if (up && !up2) {
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

		} else if (currentY <= baseHeight) {
			console.log('2.2');
			/* I need to make it so when falling in the hole you cant move left
			or right past the boundary of the platforms. I could just set something
			that says if yada number < 200 put a min and max x based on the right
			margin of the left platform and left margin of the right. Doing it static
			like that shoulld be fairly easy but I need to find away to make the yada
			number it's based on changed both on the closest left and closest right
			platfrom as well as change the min and max x number dynamically based
			on those positions*/
			 /*This is going to 2.1 after 1110 x for the block at hole two. I'm not
			 sure why. This is after the heght changes. idk if it has to do with that
			 */
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
					if (currentY < currentPlatY) {
						inAir = true;
						console.log('2.2.1.1.1');
						if (xMaxLeft > 0) {
						left2 = true;
						right2 = true;
							console.log('2.2.1.1.1.1');
							if (blockX <= xMaxLeft) {
								console.log('2.2.1.1.1.1.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight) {
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
					if (currentY < currentPlatY) {
						inAir = true;
						if (xMaxLeft > 0) {
						left2 = true;
						right2 = true;
							if (blockX <= xMaxLeft) {
								console.log('3.3.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight) {
								console.log('3.3.2');
								right2 = false;
								
							};
						};
					};
				};	 	
			 };

			 /* else if (currentY > currentPlatY && blockX < hole1Left || blockX > hole1Right) {
			 	console.log('no');
			y = 0;
			down = false;
			heightCheck = [];
			chCheck = false;
			inAir = false;
			}*/
		};
	};

	if (!up) { console.log('also three something');
		
		if (currentY > baseHeight && down === false) {
			
			console.log('3.1');
			/*I changed this from being based on currentY for the .bottom and
			having y = 0 in the move 2 function and then setting the heightCheck
			to the start height initailly and then heightCheck to currentY in
			3.4 because having y reset to zero was causing problems when I'd jump
			into a hole and then let off the up botton after i'd fallen past the
			platforms level. There was a very clear reason that I did that that i don't
			exactly remember. well first it was that the block would just get stuck and
			not fall. The bouncing back up had something to do with the heightCheck
			being set to 320 from being at the max of up and then when it set back to 
			zero it would go from 320 and down instead of where it was at and down. so
			I must not have being using currentY for the .bottom. I know i did at one
			point I just don't exactly remember what the issue was then either. But this
			is much simpler and work better in any case. oh nevermind it was because
			3.3 would execute first off since i was below and inbetween the hole and
			because i was doing current height there and y reset after you let off
			that's why it jumped up and then yada number was 320 and it decreased from
			there. I just want to make sure I write all the things down so I remember
			how everything is working and what i did to fix stuff. I forget to do that
			sometimes cause i'm so focused on what i'm doing.*/
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
			/*hole should still be true until 760. which it is. at 750 your right
			touching the edge border of platform two. The second you hit this border
			currentplatY should change. and that should happen before these below functions
			are triggered*/
		} else if (currentY > baseHeight && down === true) {
			console.log('3.2');
			y -= 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				
				bHCall();
			/*For some reason I was thinking that the if hole ===true in the below
			was to make it so you didn't flot on top of the hole so i wasn't putting
			this below. I forgot though it was actually just so you'd fall below 0 and
			go out of frame lawl.*/
				if (currentY < currentPlatY) {
					inAir = true;
					if (xMaxLeft > 0) {
						left2 = true;
						right2 = true;
						if (blockX <= xMaxLeft) {
							console.log('3.3.1');
							left2 = false;
							
						} else if (blockX >= xMaxRight) {
							console.log('3.3.2');
							right2 = false;
							
						};
					};
				};

		} else if (currentY <= baseHeight) {console.log('3something')
			/*This makes the block fall below 100% when not in a jump but it makes
			the fall off the eadge jump slightly and doesn't look as smooth. I'm 
			not to sure why*/
			/*I have no idea why but without putting the blockX !== 0 it always 
			executes this bit of code on the very first frame of the loop. I sat
			for maybe 30 minutes trying to figure out why. I'm still not sure but
			I'm going to think about it latter. I don't see why it would ever execute
		on the first frame.*/
			if (hole === true && blockX !== 0) {
				console.log('3.3');
				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
					onPlatformHeight();
					getCurrentY();
					closestPlatformLeft();
					closestPlatformRight();
					bHCall();
					if (currentY < currentPlatY) {
						inAir = true;
						if (xMaxLeft > 0) {
						left2 = true;
						right2 = true;
							if (blockX <= xMaxLeft) {
								console.log('3.3.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight) {
								console.log('3.3.2');
								right2 = false;
								
							};
						};
					};
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
			};
		};
	};
/*Resets most things back to normal. up2 isn't because if your holding up and it
restarts it'll auto jump. and chCheck isn't because once that's set and changes
where it needs to you don't really need it to reset. If you do it causes problems
 with the 2.x functions because if chCheck goes to false and again if your holding
 up the whole way through it won't get redifined so if you then hit another wall it
 will make currentY jump up by however much the next platfrom is because the coresponding
  change in base height when you hit the new wall because y change in there is based
  on baseHeight and not height check. */
	if (currentY < -100) {
	y = 0;
	left2 = true;
	right2 = true;
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

				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				
				bHCall();

console.log(baseHeight);
console.log(block.style.bottom);
console.log(y);
console.log(currentY);
console.log(currentPlatY);
console.log(hole);
console.log(inAir);
console.log(blockX);
console.log(nextLeft);
console.log(xMaxLeft);
console.log(flat2Right);
console.log(platformArrXGrouped[0][3]);
console.log(platformArrXGrouped[1][2]);
console.log(hole2Left);
console.log(mapXMap);
console.log(xMaxRight);



	/*I'll think about how to make the jump work tomorrow. I know i watched a video
	doing it with canvas and everything but I don't really remember how he did it
	and I think coming up with my own solution like this will be beneficial to understanding
	it. Basically I'll-well it'll sort of depend on if I want the jump to be higher or
	not depending on if you hold it and different things- have to make the y increment
	up from the starting point at a given speed that seems right for a given amount of
	time to reach the max height that I want and then make it come back down when after
	it reaches that max height. I'll also have to make it so the jump animation is self contained
	in some way so you can't just hold the up button and float at the max heigth*/


		requestAnimationFrame(blockmove)
	
}


document.addEventListener('keydown', move);
document.addEventListener('keyup', move2);
requestAnimationFrame(blockmove);

/*it seems like the main problem is that i was calling block move in my keydown event 
every time a key down event was done. so it was essentially duplicating it and making
the block not just move by .05 but acelerate by .05 every time which is why the
speed would increase. I tried removing the call in move but it didn't work before.
I had no reason to think it would work then as i wasn't considering this i just
tried it cause that's more how the guy on youtube set it up. I must have done a typo
or something cause it works now lol. Actually what it might have been was maybe i
was in the github version when I changed it and didn't realise so the changes
didn't effect anything. I don't really remember. 
I'm glad I posted it on stackoverflow in any
case though cause I understande WHY it was doing that now. He added a bunch of other
fancy things that I don't compleatly understand but I didn't read over it to thourughly
I need to look up all the methods and things he put in there. */
