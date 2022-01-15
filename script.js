/*I'm going to eventually learn an actual engine because it will have more functionality
and be easier probably but I kind of want to make one level of a rudementary
side scroller with obsticals and ai using nothing but vanilla js if I can because
I think it would be a good learning experience*/
const block = document.querySelector('.block');
const what = document.querySelector('.what');
const allPlatforms = document.querySelector('#block');
const allHoles = document.querySelector('#hole');
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
let left = false;
let up = false;
let up2 = true;
let down = false;
let currentHeight = [];
let x = 0;
let y = 0;
block.style.bottom = '200px';
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
 		currentHeight = [];
 		y = 0;
 	}

 	if (e.keyCode === 39) {
 		right = false;
 	}
}
let baseHeight = 200;
let noHoleHeight = 0;
let blockX = 0;
let xMaxLeft = 0;
let xMaxRight = 0;
let flat1Left = 0;
let flat1Right = 0;
let hole1Left = 0;
let hole1Right = 0;
let flat2Left = 0;
let flat2Right = 0;
/*This method is going to get insane when I start doing more complicated things
and making the map bigger so i'll probably have to find something different but
for now i'm just going to try and make it work like this and maybe that will give
me better ideas going forward. If there was someway I could find the heigth of the
div element at the current x position of the block that would make things much
easier. I also need to find a dynamic way to not let the block pass the div margins
when it falls into a hole and thinking of more complex levels i would need to find
someway where it could dedect the left and right margin of smaller platforms and
other objects in the environment so that it wouldn't be able to move passed them. */
const platformXPostion = (shift, currentX) => {
	flat1Left = 0 + shift;
	flat1Right = 600 + shift;
	hole1Left = 600.00000000000000000001 + shift;
	hole1Right = 800 + shift;
	flat2Left = 800.00000000000000000001 + shift;
	flat2Right = 1600 + shift;

	if (currentX > flat1Left && currentX < flat1Right || currentX > flat2Left &&
		currentX < flat2Right) {
		baseHeight = 200;
		noHoleHeight = 200;
	} else if (currentX > hole1Left && currentX < hole1Right && inAir === false) {
		baseHeight = 0;

	} else if (currentX > hole1Left && currentX < hole1Right && inAir === true) {
		baseHeight = baseHeight;
	}
}


const blockmove = () => {
	if (right) {
	x += 8;
	block.style.left = `${x}px`;
	blockX = x;
};
	if (left) {
	x -= 8;
	block.style.left = `${x}px`;
	blockX = x;		
	};
	/*I was going to base this on the length of the string of block.style.bottom
	but if it's done properly itll always be 5.*/
	
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	yadanumber = Number(yadasplit[0]);
	
	/*I wansn't thinking that every time the loop started down would restart to
	false here so It needs to be outside the loop*/
	
	
	
	

what.innerHTML = `${currentHeight[0]} ${down} ${yadanumber} ${blockX} ${hole1Left} 
${hole1Right}`;
console.log(currentHeight[0]);
console.log(yadanumber);
console.log(y);
console.log(down);

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
		if (block.style.bottom < `${baseHeight + 120}px` && chCheck === false) {
			console.log('yada');
			inAir = true;				
			down = false;
		y += 8;
		block.style.bottom = `${baseHeight + y}px`;
	} else if (block.style.bottom < `${baseHeight + 120}px` && chCheck === true) {
					console.log('yada');
								
			down = false;
		y += 8;
		block.style.bottom = `${currentHeight[0] + y}px`;
	}

		else if (block.style.bottom >= `${baseHeight + 120}px`) {
		down = false;
		currentHeight = [];
		currentHeight.push(yadanumber);
		up2 = false;
		chCheck = true;
		y = 0;
	}
};
	if (up && !up2) {
		if (block.style.bottom > `${baseHeight}px` ){

				down = false;
				y -= 8;
				block.style.bottom = `${currentHeight[0] + y}px`;
		}
		if (block.style.bottom <= `${baseHeight}px`) {
			 if (blockX >= hole1Left && blockX <= hole1Right) {
			 	if (chCheck === true) {
			 	console.log('yes');
				down = false;
				y -= 8;
				block.style.bottom = `${currentHeight[0] + y}px`;
				} else if (chCheck === false){
			 	console.log('yes2');
				down = false;
				y -= 8;
				block.style.bottom = `${baseHeight + y}px`;
				}	 	
			 } else if (blockX < hole1Left && blockX > hole1Right) {
			 	console.log('no');
			y = 0;
			down = false;
			currentHeight = [];
			chCheck = false;
			inAir = false;
			}
		}
	};

	if (!up) {
		
		if (block.style.bottom > `${baseHeight}px` && down === false){
			currentHeight = [];
			console.log('yada');
			currentHeight.push(yadanumber);
			chCheck = true;
			y -= 8;
			block.style.bottom = `${yadanumber + y}px`;
			down = true;
			up2 = false;
		} else if (block.style.bottom > `${baseHeight}px` && down === true) {
			y -= 8;
			block.style.bottom = `${currentHeight[0] + y}px`;

		} else if (block.style.bottom <= `${baseHeight}px`) {
			up2 = true;
			down = false;
			y = 0;
			currentHeight = [];
			chCheck = false;
			inAir = false;
		};
	};

	platformXPostion(0, blockX);

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
