/*I'm going to eventually learn an actual engine because it will have more functionality
and be easier probably but I kind of want to make one level of a rudementary
side scroller with obsticals and ai using nothing but vanilla js if I can because
I think it would be a good learning experience*/
const block = document.querySelector('.block');
const what = document.querySelector('.what');
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
let baseHeight = 0;
let blockX = 0;

const platformXPostion = (shift, currentX) => {
	let flat1Left = 0 + shift;
	let flat1Right = 600 + shift;
	let hole1Left = 600.00000000000000000001 + shift;
	let hole1Right = 800 + shift;
	let flat2Left = 800.00000000000000000001 + shift;
	let flat2Right = 1600 + shift;

	if (currentX > flat1Left && currentX < flat1Right || currentX > flat2Left &&
		currentX < flat2Right) {
		baseHeight = 200;
	} else if (currentX > hole1Left && currentX < hole1Right) {
		baseHeight = 0;
	};
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
	
	
	
	

what.innerHTML = `${currentHeight[0]} ${down} ${yadanumber}`;
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
		if (block.style.bottom > `${baseHeight}px`){
				down = false;
				y -= 8;
				block.style.bottom = `${currentHeight[0] + y}px`;
		}
		if (block.style.bottom <= `${baseHeight}px`) {
			y = 0;
			down = false;
			currentHeight = [];
			chCheck = false;
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
			up2 = true;
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

	if (currentX >= flat1Left && currentX <= flat1Right || currentX >= flat2Left &&
		currentX <= flat2Right) {
		baseHeight = 200;
		noHoleHeight = 200;
	} else if (currentX >= hole1Left && currentX <= hole1Right && inAir === false) {
		baseHeight = 0;

	} else if (currentX >= hole1Left && currentX <= hole1Right && inAir === true) {

			baseHeight = baseHeight;
		
	};
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
${hole1Right} ${up2} ${up} ${baseHeight} ${inAir}`;
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
				console.log('yes3');
				down = false;
				y -= 8;
				block.style.bottom = `${currentHeight[0] + y}px`;
		}
		if (block.style.bottom <= `${baseHeight}px`) {
			 if (blockX >= hole1Left && blockX <= hole1Right) {
			 	if (chCheck === true) {
			 	inAir = true;
			 	console.log('yes');
				down = false;
				y -= 8;
				block.style.bottom = `${baseHeight + y}px`;
				} else if (chCheck === false){
			 	console.log('yes2');
				down = false;
				y -= 8;
				block.style.bottom = `${currentHeight[0] + y}px`;
				}	 	
			 } else if (blockX < hole1Left || blockX > hole1Right) {
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
	/*I have no idea where this extra 8 or so pixels is coming from in hole1right
	I was thinking it had something to do with my blockX because it seemed alsmost
	exactly the 8 that was being incremented in the x direction. I couldn't find anything
	wrong so I diceded to fill in the hole with a color. Turns out there's a gap between
	inline block div elements because of the word spacing. Putting the parent container
	font size to zero fixed this. */
	hole1Right = 750 + shift;
	flat2Left = 800.00000000000000000001 + shift;
	flat2Right = 1600 + shift;

	if (currentX >= flat1Left && currentX <= flat1Right || currentX >= flat2Left &&
		currentX <= flat2Right) {
		baseHeight = 200;
		noHoleHeight = 200;
	} else if (currentX >= hole1Left && currentX <= hole1Right) {
		baseHeight = 0;

	};/* else if (currentX >= hole1Left && currentX <= hole1Right && inAir === true) {
		baseHeight = baseHeight;
	};*/
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
${hole1Right} ${inAir} ${baseHeight} ${block.style.bottom}`;
console.log(currentHeight[0]);
console.log(yadanumber);
console.log(y);
console.log(down);
console.log(baseHeight);
console.log(block.style.bottom);

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
			 } /*else if (blockX < hole1Left || blockX > hole1Right) {
			 	console.log('no');
			y = 0;
			down = false;
			currentHeight = [];
			chCheck = false;
			inAir = false;
			}*/
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
		} else if (block.style.bottom > `${baseHeight}px` && down === true ) {
			y -= 8;
			block.style.bottom = `${currentHeight[0] + y}px`;

		} else if (block.style.bottom <= `${baseHeight}px`) {
			if (blockX >= hole1Left && blockX <= hole1Right) {
			y -= 8;
			block.style.bottom = `${currentHeight[0] + y}px`;
			} else {
				console.log('ya');
			up2 = true;
			down = false;
			y = 0;
			currentHeight = [];
			chCheck = false;
			inAir = false;
			}
		};
	};

	if (yadanumber < -100) {
	x = 0;
	block.style.left = `${x}px`;
	blockX = x;
	block.style.bottom = '200px';
	}

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
let	hole1Left = 600.00000000000000000001;
let	hole1Right = 750;
let	flat2Left = 800.00000000000000000001;
let	flat2Right = 1000;
let flat2Top = 240;
let	hole2Left = 1000.00000000000000000001;
let	hole2Right = 1150;
let	flat3Left = 1200.00000000000000000001;
let	flat3Right = 1700;
let flat3Top = 200;
let platformArrX = [flat1Left, flat1Right, hole1Left, hole1Right, flat2Left, flat2Right
, hole2Left, hole2Right, flat3Left, flat3Right];
let platformArrXGrouped = [[flat1Left, flat1Right, flat2Left, flat2Right
, flat3Left, flat3Right], [hole1Left, hole1Right, hole2Left, hole2Right]];
let platformArrY = [flat1Top, flat2Top, flat3Top];
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
		if (hole === false && blockX >= platformArrXGrouped[0][k] && blockX <= 
			platformArrXGrouped[0][k + 1]) {
			what2.innerHTML = `${platformArrXGrouped[0][k]} 
								${platformArrXGrouped[0][k + 1]}`;
			currentPlatY = platformArrY[k/2];
		} else {
			continue;
		};
	};/*
	if (hole === true) {
		currentPlatY = 0;
	}*/
}


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
	for (let i = 0; i < platformArrX.length; i++) {
		
		if (hole === true && blockX >= platformArrX[i] && blockX <= 
			platformArrX[i + 1]) {
			nextLeft = platformArrX[i - 1];
		break;
		} else {
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
	if (nextLeft !== 0 && currentY < currentPlatY) {
		xMaxLeft = nextLeft;
	}

	if (hole === false) {
		nextLeft = 0;
		xMaxLeft = 0;
	}

}

const closestPlatformRight = () => {
		for (let j = 0; j < platformArrX.length; j++) {
		if (hole === true && blockX >= platformArrX[j] && blockX <= 
			platformArrX[j + 1]) {
			nextRight = platformArrX[j + 2];
		break;
		} else {
			continue;
		};
	};
		if (nextRight !== 0 && currentY < currentPlatY) {
		xMaxRight = nextRight - 50;
	}

	if (hole === false) {
		nextRight = 0;
		xMaxRight = 0;
	}
}

const holeCheck = () => {
	if (blockX >= hole1Left && blockX <= hole1Right || blockX >= hole2Left 
		&& blockX <= hole2Right) {
		hole = true;
	} else {
		hole = false;
	}
}

const platformXPostion = (shift, currentX) => {
	flat1Left = 0 + shift;
	flat1Right = 600 + shift;
	hole1Left = 600.00000000000000000001 + shift;
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
	hole1Right = 750 + shift;
	flat2Left = 800.00000000000000000001 + shift;
	flat2Right = 999 + shift;
	hole2Left = 1000 + shift;
	hole2Right = 1150 + shift;
	flat3Left = 1200.00000000000000000001 + shift;
	flat3Right = 1700 + shift;

	if (hole === false) {
		baseHeight = currentPlatY;
		noHoleHeight = currentPlatY;
	} else if (hole === true && inAir === false) {
		baseHeight = 0;

	} else if (currentX >= hole1Left && currentX <= hole1Right && inAir === true) {
		baseHeight = baseHeight;
	};
};


const blockmove = () => {
	/*I got the left and the right movements making the map shift and also stoped
	the block when he reaches the left end. I got the hole glitches fixed mostly
	although I think it could maybe be better but before I do this i'm going to
	try to make the holes work when the platforms are at different heights. It seems
	when playing around with the map shift that it definitly effects things because
	it thinks holes are at areas there not. I was thinking i'd have to do two versions
	of all the moves. I forgot about my shifts though so I probably just need to implement
	that but*/
	if (right && right2) {
		/*I'll do this later but i'm trying to make the hole body shift left
		if you are moving right past a certain point so the hidden portions
			of the map reveal and the left portions hid as you move along.*/
		//if (blockX <= 750) {
	//x += 10;
	//block.style.left = `${x}px`;
	///blockX = x;
	//} else {
		/*this works, i'm going to hold off on implementing it untill I all the
		stuff with the holes worked out. Also for platforms that are floating
		above the con div, if I want to do that I might have to make them absolute
		position which means i'll have to move each one of those objects. Ideally
		it would be better to have the whole body div move or wrap everything in
		another div that is relative. I guess that wouldn't help, any absolute or
		relative position item is not going to move along with it's div it will only
		move if the size of that div changes and it's movements are relative to that.*/


	//	xMap -= 10;
	//	map.style.left = `${xMap}px`;
	//	mapXMap = xMap;
		/*document.body.style.left = xpx or something. And then I'll basically
		put my entire move functions-if i'm thikning right it might come out
		different- in if else statements bases on this and if the world is moving
		i'll make everything based on that instead of the block position. actually
		I might not even need to do that but we'll see the wold moving might work
		by itselft without having to change much else. maybe a little bit we'll see*/
	//};

	
		x += 10;
	block.style.left = `${x}px`;
	blockX = x;
};
	if (left && left2) {

		/*if (mapXMap >= 0) {
			if (blockX >= 0) {
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
	};


	};*/
			x -= 10;
		block.style.left = `${x}px`;
		blockX = x;		
	};
	/*I was going to base this on the length of the string of block.style.bottom
	but if it's done properly itll always be 5.*/
	
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	currentY = Number(yadasplit[0]);
	
	/*I wansn't thinking that every time the loop started down would restart to
	false here so It needs to be outside the loop*/
	
	
	
/*	${heightCheck[0]} ${down} ${currentY} ${blockX} */

what.innerHTML = `${baseHeight} ${currentPlatY} ${nextLeft} 
${xMaxLeft} ${nextRight} ${xMaxRight} ${baseHeight} ${hole}`;
/*console.log(heightCheck[0]);
console.log(currentY);
console.log(y);
console.log(down);*/
console.log(baseHeight);
console.log(block.style.bottom);
console.log(blockX);
console.log(xMaxLeft);
console.log(xMaxRight);


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
			console.log('1.1');
			inAir = true;				
			down = false;
		y += 10;
		block.style.bottom = `${baseHeight + y}px`;
	} else if (block.style.bottom < `${baseHeight + 120}px` && chCheck === true) {
					console.log('1.2');
								
			down = false;
		y += 10;
		block.style.bottom = `${heightCheck[0] + y}px`;
	}

		else if (block.style.bottom >= `${baseHeight + 120}px`) {
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
		if (block.style.bottom > `${baseHeight}px` ){
				console.log('2.1');
				down = false;
				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
		}
		if (block.style.bottom <= `${baseHeight}px`) {
			/* I need to make it so when falling in the hole you cant move left
			or right past the boundary of the platforms. I could just set something
			that says if yada number < 200 put a min and max x based on the right
			margin of the left platform and left margin of the right. Doing it static
			like that shoulld be fairly easy but I need to find away to make the yada
			number it's based on changed both on the closest left and closest right
			platfrom as well as change the min and max x number dynamically based
			on those positions*/
			 if (hole === true) {
			 	if (chCheck === true) {
			 	console.log('2.2');
				down = false;
				y -= 10;
				block.style.bottom = `${heightCheck[0] + y}px`;
					if (currentY < 200) {
						if (xMaxLeft > 0) {
							if (blockX <= xMaxLeft) {
								console.log('3.3.1');
								left2 = false;
								
							} else if (blockX >= xMaxRight) {
								console.log('3.3.2');
								right2 = false;
								
							};
						};
					};
				} else if (chCheck === false){
			 	console.log('2.3');
				down = false;
				y -= 10;
				block.style.bottom = `${baseHeight + y}px`;
					if (currentY < currentPlatY) {
						if (xMaxLeft > 0) {
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
			 }; /*else if (blockX < hole1Left || blockX > hole1Right) {
			 	console.log('no');
			y = 0;
			down = false;
			heightCheck = [];
			chCheck = false;
			inAir = false;
			}*/
		};
	};

	if (!up) {
		
		if (block.style.bottom > `${baseHeight}px` && down === false) {
			
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
		} else if (block.style.bottom > `${baseHeight}px` && down === true) {
			console.log('3.2');
			y -= 10;
			block.style.bottom = `${heightCheck[0] + y}px`;
			/*For some reason I was thinking that the if hole ===true in the below
			was to make it so you didn't flot on top of the hole so i wasn't putting
			this below. I forgot though it was actually just so you'd fall below 0 and
			go out of frame lawl.*/
				if (currentY < currentPlatY) {
					if (xMaxLeft > 0) {
						if (blockX <= xMaxLeft) {
							console.log('3.3.1');
							left2 = false;
							
						} else if (blockX >= xMaxRight) {
							console.log('3.3.2');
							right2 = false;
							
						};
					};
				};

		} else if (block.style.bottom <= `${baseHeight}px`) {
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
					if (currentY < currentPlatY) {
						if (xMaxLeft > 0) {
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

	if (currentY < -100) {
	x = 0;
	block.style.left = `${x}px`;
	blockX = x;
	block.style.bottom = '200px';
	}

	holeCheck();
	closestPlatformLeft();
	closestPlatformRight();
	onPlatformHeight();

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
const ai1 = document.querySelector('.ai1');
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
let up3 = true;
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


/*These aren't positioned relatively or absolutely with left or some other
move decleration there just where they are as inline block elements between
the widths of eachother but I should try to find a way to find the x cordonite
regardless if it's possible so I can replace these with that and not have to
do all the initial calculations myself for the x position of each of these.
idk if that's a function that html/css/js has though but i'll look around*/
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
let hole3Right = 1980;
let flat4Left = 1980.0000000001;
let flat4Right = 2080;
let flat4Top = 200;
let hole4Left = 2080.0000000001;
let hole4Right = 2330;
let flat5Left = 2330.0000000001;
let flat5Right = 2830;
let flat5Top = 220; 
let ai1left = flat5Left + 100;
let platformArrX = [flat1Left, flat1Right, hole1Left, hole1Right, flat2Left, flat2Right
, hole2Left, hole2Right, flat3Left, flat3Right, hole3Left, hole3Right, flat4Left,
flat4Right];
let platformArrXGrouped = [[flat1Left, flat1Right, flat2Left, flat2Right,
flat3Left, flat3Right, flat4Left, flat4Right, flat5Left, flat5Right], [hole1Left, hole1Right, hole2Left, hole2Right,
hole3Left, hole3Right, hole4Left, hole4Right]];
let platformArrY = [flat1Top, flat2Top, flat3Top, flat4Top, flat5Top];
let aiArr = [ai1left];

let maxJump = 140;/*I'll probably put some kind of option menu at the top that
allows you to adjust the physics. jump height and speed etc. I'll make it increment
in tens for now but I also should probably find a way to make all this work
without having things in multiples of the speed that it's in so it's more 
flexible. I'm just trying to get the hang of it like this for now. I could
also maybe make the block stay for a frame or two at max height to emulate a
hangtime type of effect idk. Maybe I'll play with the speed/acceleration as
it goes up and down but for now this is fine.*/
let minJump = 30;/*I'm probobly going to implement a minimum jump heigth
at some point later*/
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

let ai1BaseHeight = 220;


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
	/*I should make a loop that just loops through the hole array to find these
	so I don't have to add a new one here every time. */
	if (blockX >= Math.floor(hole1Left)  && blockX <= hole1Right -50 
		|| blockX >= Math.floor(hole2Left) && blockX <= hole2Right - 50
		|| blockX >= Math.floor(hole3Left) && blockX <= hole3Right - 50
		|| blockX >= Math.floor(hole4Left) && blockX <= hole4Right - 50) {
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
	/*it might be harder but I wonder if I could make a loop or something here
	to that would do all this without having to add them manually. So all I do
	is add them at the top of the page and it would be good to go. I probably could
	just make two loops one for hole and one for grouped and say something like
	flati+1left = faltileft++1shift and platfromarrXgrouped[0].splice(i, 1, flati+1left)
	etc and just say toString on the i + 1 in the variable name*/
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
	ai1left = flat5Left + 100;
	


};

	const getCurrentY = () => {
	yada = block.style.bottom;
	yadastring = yada.toString();
	yadasplit = yadastring.split('p');
	currentY = Number(yadasplit[0]);		
	};

	let loopCount = 0;
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
	if (up && up2 && up3) {
		if (currentY < baseHeight + maxJump && chCheck === false) {
			console.log('1.1');
			inAir = true;				
			down = false;
		y += 10;
		block.style.bottom = `${baseHeight + y}px`;
	} else if (currentY < baseHeight + maxJump && chCheck === true) {
		console.log('1.2');						
		down = false;
		y += 10;
		block.style.bottom = `${heightCheck[0] + y}px`;
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

	if (!up && up3) { console.log('also three something');
		
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
  	const restart = () => {
 	y = 0;
	left2 = true;
	right2 = true;
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

  	
  	const hitAIAnimation = () => {
  		let iteration = 0;
  		const invisible = () => {
  			block.style.visibility = 'hidden';
  			setTimeout(visible, 50);
  		}

  		const visible = () => {
  			iteration ++
  			block.style.visibility = 'initial';
  			if (iteration < 5) {
  				setTimeout(invisible, 50);
  			} else {
  				iteration = 0;
  				restart();
  			};
  		}

  		setTimeout(invisible, 50);
  	}
	if (currentY < -100) {
		restart();
	};
	/*Instead of instantly returning to the beggining here I should play
	some kind of animation where the block falls off the map or does something*/
	if (currentY <= ai1BaseHeight + 50) {

		if (blockX >= ai1left - 50 && blockX <= ai1left + 50) {
			up3 = false;
			left2 = false;
			right2 = false;

			hitAIAnimation();
		};
	};

				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				
				bHCall();


/*
	if (loopCount < 60) {
		ai1left += 3;
		loopCount ++;
	} else if (loopCount >= 60 && loopCount <= 100) {
		loopCount++;
	} else if (loopCount > 100 && loopCount <= 160) {
		ai1left -= 3;
		loopCount++;
	}  else if (loopCount > 160 && loopCount <= 200) {
		loopCount ++;
	} else if (loopCount > 200) {
		loopCount = 0;
	};
*/
	ai1.style.left = `${ai1left}px`;

	what.innerHTML = `${baseHeight} ${currentPlatY} ${currentY} ${nextLeft} 
${xMaxLeft} ${nextRight} ${xMaxRight} ${baseHeight} ${hole} ${inAir} ${ai1.style.left}
${ai1left} ${blockX} ${loopCount}`;
/*
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
*/
console.log(currentY);
console.log(blockX);
console.log(ai1left);
console.log(ai1.style.left);



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


/*below is a version of the platform adjust function that has a loop to find the moving
platform it's not working i'm thinking it may just be because the loop takes to
long to execute and I could maybe re read on async functions which I forgot and have
the rest of it wait until the loop is finished. IDK if that's why it's not working
though*/

const movingPlatAdj = (var1, var2) => {
	/*I was going to pass in platformarrX[0][k] and [k + 1] from the on platform
	height fnction. It didn't quite work although I think with some tweaking I could
	maybe get it to work or at least something similar to work so I don't have to 
	add every moving platform in here but I'll worry about that in a minute*/
	for (let i = 0; i < platformArrXGrouped[0]; i+=2) {
		if (platformArrXGrouped[0][i] -.0000000001 - blockX + 50 < 0 || blockX 
			- platformArrXGrouped[0][i + 1] < 0 ) {
			adjIOut = i;
		};
	};

	if (currentY < platformArrY[adjIOut/2] && currentY + 100 > platformArrB[adjIOut/2]) {

		if (platformArrXGrouped[0][adjIOut] -.0000000001 - blockX < 50 && platformArrXGrouped[0][adjIOut] - .0000000001 
			-blockX > 40 && flat6Direction === 0) {
	what2.innerHTML = 'what';		
			blockX = platformArrXGrouped[0][adjIOut] - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, platformArrXGrouped[0][adjIOut]);
			right3 = false;
			xChange = true;

			/*belowPlatform = true;*/
		} else if (platformArrXGrouped[0][adjIOut] -.0000000001 - blockX < 50 && platformArrXGrouped[0][adjIOut] - .0000000001 
			-blockX > 40 && flat6Direction === 2) {
			what2.innerHTML = 'what';
			blockX = platformArrXGrouped[0][adjIOut] - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, platformArrXGrouped[0][adjIOut]);
			right3 = false;
			xChange = true;
/*This jumps after I fall below the line of the moving platform. It seems like
nothing actually moves while i'm hitting the side of the platform. at least when
I hit it after jumping off the previous platform. This I believe has something
to do with the map shift cause it's about the only scenario where the map shift
applies while any of these are excecuting.*/
		} else if (platformArrXGrouped[0][adjIOut] -.0000000001 - blockX < 53 && platformArrXGrouped[0][adjIOut] - .0000000001 
			-blockX > 40 && flat6Direction === 1 && right) {
			/*Turning map moving map it so that the platforms move but when you
			fall the map still jerks. since your only moving three along with the
			platform I'll need to adjust the map move so that it only moves three
			as well while this is happening and then smooth it back out to factors
			of ten like I did with the blockx and x. I'll probably need to keep
			map moving true because it is and then I may also have to adjust something
			in the (mapmoving) platform move function possibly. IDK we'll see. I'm not
			exactly sure how to implement it. In any case it took a team of over
			a dozen on average of 2 or 3 years working full time to make the origional 
			mario games
			and i'm sure they all had computer science degrees so I'd say i'm pretty
			fucking decent. */
			mapMoving = false;
			what2.innerHTML = 'what';
			blockX = platformArrXGrouped[0][adjIOut] - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, platformArrXGrouped[0][adjIOut]);
			right3 = false;
			xChange = true;

		} else {

			right3 = true;
		};

		if (blockX - platformArrXGrouped[0][adjIOut + 1] < 0  && blockX - platformArrXGrouped[0][adjIOut + 1] > - 20 && flat6Direction
			=== 1) {

 			blockX = platformArrXGrouped[0][adjIOut + 1];
			block.style.left = `${blockX}px`;
			what2.innerHTML = `${blockX} ${platformArrXGrouped[0][adjIOut + 1]}`;
			platformArrXGrouped[0].splice(11, 1, platformArrXGrouped[0][adjIOut + 1]);
			left3 = false;
			/*I put three in the below because when left3 = false the platform
			will always move before you do putting it three away at everyframe
			but since your holding left you have the intention of moving in that
			direction so you need to say < 3 and not < 0 because it actually will
			be between 0 and 3 at every next frame while this is happening. It definitly
			seem to help some of the jerkiness here but it's still not perfect*/
		} else if (blockX - platformArrXGrouped[0][adjIOut + 1] <= 3 && blockX - platformArrXGrouped[0][adjIOut + 1] > - 20 && flat6Direction
			=== 2 && left) {
			
			console.log('this');
			blockX = platformArrXGrouped[0][adjIOut + 1];
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, platformArrXGrouped[0][adjIOut + 1]);
			left3 = false;	

		 } else if (blockX - platformArrXGrouped[0][adjIOut + 1] < 0 && blockX - platformArrXGrouped[0][adjIOut + 1] > -20 && flat6Direction
			=== 0) {
		 	what2.innerHTML = 'what';
			blockX = platformArrXGrouped[0][adjIOut + 1];
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, platformArrXGrouped[0][adjIOut + 1]);
			left3 = false;				

		} else {
			left3 = true;
		}
	} else {
		console.log('this2');
		blockXAdj = blockX - x;
		for (let i = 0; i < 10; i ++ ) {
			if (blockX % 10 === i) {
				/*I guess I could maybe do += i when it's on one side of five
				and -= 10-i when it's on the other just to get it to the closest
				ten. although if it goes in the opposite direction from the movement
				of the platform that could cause problems... nevermind this only happens
				if below the platform so it shouldn't cause problems. and if i really
					wanted to I could keep the left3/right 3 disabled for an extra turn
				after this with a counter and smooth it over two or maybe three frames*/
				if (right) {
				blockXAdj += i;
				} else if (left) {
					/*adding the distinction for left and right and then remove
					the first call to this function before the left and right
					arrow functions trigger seems to have fixed the problems I was
					having with you coming in on the left side of the platform. now
					the only issue seems to be when you hit the platform as the map
					itself is moving. It causes sort of a jerk in the map when you
					hit and then drop below. IDK if I'm going to worry about it now.
					I might fix it later as it's not effecting the rest of my program
					in any way and it 'almost' looks intentional lol. I'll definitly
					come back to it later as well as making this more dynamic like I did
					with some of the other functions so I don't have to add each new
					moving platform here. Everythings set up in a way though that I'll be able
					to finish the rest of the map and then implement the refactored code and these
					minor fixes later without causing any issues. */
					blockXAdj -= i;
				};
			};
		};
		console.log(blockXAdj);

		x = x + blockXAdj;
		blockX = x;
		block.style.left = `${x}px`;
		console.log(x);
		/*xMap = xMap + blockXAdj;*/
		right3 = true;
		left3 = true;
	};





};














































*************************************************************************************











**************************************************************************************



/*I'm going to eventually learn an actual engine because it will have more functionality
and be easier probably but I kind of want to make one level of a rudementary
side scroller with obsticals and ai using nothing but vanilla js if I can because
I think it would be a good learning experience*/

/*I need to make it so you can jump on the ai's head and make him disapear or something
and then make a couple different types of ai. one that charges you and then maybe one
that's more stationary but shoots things at you. I'm just trying to build a lot of mario
type stuff from the ground up without using an engine or anything. I'm going to make
platforms that move up and down and left and right and maybe try to make a wheel type
platform with 4 platforms like in mario where if you jump on the top it'll spin down
etc. I'm also going to try to make a boss at the end you have to jump on the times or
whatever just so I have all the different standard stuff in one level. */
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
let falling = false;


/*These aren't positioned relatively or absolutely with left or some other
move decleration there just where they are as inline block elements between
the widths of eachother but I should try to find a way to find the x cordonite
regardless if it's possible so I can replace these with that and not have to
do all the initial calculations myself for the x position of each of these.
idk if that's a function that html/css/js has though but i'll look around*/

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
/*Since 6 is absolutly positioned and it when you move it into position with bottom
it's the bottom of it that is at that poistion you basically have to add the height
on top of the flat6top so that the currentplatY says that the top is where the block
should stop and not the bottom of the platform. */

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
let maxJump = 140;/*I'll probably put some kind of option menu at the top that
allows you to adjust the physics. jump height and speed etc. I'll make it increment
in tens for now but I also should probably find a way to make all this work
without having things in multiples of the speed that it's in so it's more 
flexible. I'm just trying to get the hang of it like this for now. I could
also maybe make the block stay for a frame or two at max height to emulate a
hangtime type of effect idk. Maybe I'll play with the speed/acceleration as
it goes up and down but for now this is fine.*/
let minJump = 30;/*I'm probobly going to implement a minimum jump heigth
at some point later*/
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

/*I'll have to go back and see what each one of these do. Even when I was coding it initialy
there were a couple variables I set which I sort of forgot exactly what they were for.
it's been a minute now to so I'll come back to this.*/
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
/*I could maybe combine currentplaty and base heigth I'm going to wait htough*/

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
			/*what2.innerHTML = `${platformArrXGrouped[0][k]} 
								${platformArrXGrouped[0][k + 1]}`;*/
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
			/*if (platformArrXGrouped[0][k] - .0000000001 - blockX < 50) {
				platformArrXGrouped[0][k] = blockX + 50;
			}*/

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
			/*if (platformArrXGrouped[0][k] - .0000000001 - blockX < 50) {
				platformArrXGrouped[0][k] = blockX + 50;
			}*/break;

			} else {
				continue;

			};

		} else {
			continue;
		};
	};




	/*
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


/*Determains the next closest platform to your left when your over a hole and sets
the max left position if you are below the top y position of that platform.*/
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
	based on what i was at the time**********I'm basically the dopest. CS majors and got
	shit on me lawl harka harka*** ...... goes to school for CS  a few moths later******
	harka harka harka. I wasn't trying to be meen with that other comment I'm just happy
	with it for having the experience I have. ******* easter eggs lawl***** and have a map of that if that variable equals some
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

/*Same as the above function but for the next right platform*/
const closestPlatformRight = () => {
		for (let j = 0; j < platformArrXGrouped[1].length; j+=2) {
		if (hole && blockX >= Math.floor(platformArrXGrouped[1][j]) && blockX <= 
			platformArrXGrouped[1][j + 1]) {
			nextRight = platformArrXGrouped[1][j + 1];
			console.log(j);

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

	/*if (blockX >= Math.floor(hole1Left)  && blockX <= hole1Right -50 
		|| blockX >= Math.floor(hole2Left) && blockX <= hole2Right - 50
		|| blockX >= Math.floor(hole3Left) && blockX <= hole3Right - 50
		|| blockX >= Math.floor(hole4Left) && blockX <= hole4Right - 50)*/


		/*checks if your over a hole*/
const holeCheck = () => {
	/*I should make a loop that just loops through the hole array to find these
	so I don't have to add a new one here every time. */

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
/*
	if (blockX >= hole2Left && blockX <= hole2Right) {
		hole = true;
	} else {
		hole = false;
	};*/
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


/*I haven't been able to totally get this to work yet. it kind of works. when
you touch the side it will move you left. Before I altered the hole === true if
right 3 === true you'd get stuck in the y axis until it finished. now you continue
to fall but either you don't turn eight 3 on untill you fall compleatly and it
sort of has this wierd effect of looking like it bumps you to the left even after
you fall below the platform. Or you turn right 3 true but when you try to go right
it shoots right really fast and the top of your block gets stuck to the bottom of
the moving platform. I thought the jumping right was because x was still defined
at the point where you fell off so when you pressed right it made you jump.
the function below that I thought would smooth that out didn't work and the wierd
thing is that going left doesn't ahve that effect after you've been pushed. I also
tried implementing something like this more universally in both the x move and
next right/ current plat but I couldn't get that to work at all. It seems like
it would be a better alternitive if I could make it work because it's already set
up and would work for all the platforms but I haven't gotten it to work yet and
I wasn't as sure as to why. This is basically a copy of the ai function I did
just slightly more compex and called in differnt spot. There's alot going on
with those other functions. They get called multiple times and are dependent on
other functions which also get called multiple times so I figured I'd try to isolate
it and then if I got it to work then maybe I'd see if I could put it in to one
of those other functions so it works more globally idk yet though we'll see. */

/*The below variables-blockXAdj at least- and the function below are 'tuning' functions.
the block moves in increaments of ten but that's faster then the platforms needed to be.
all my functions for determining whether you hit the side of a platform or where a hole is
are based by matching the exact value of the end of a platform with the edge of your character.
All of which are in increments of ten. To make the colisions and all my functions behave 
properly when the positions weren't in increments of ten I had to create a function that
sort of detected when this wouldn't be the case-when the platform and block wouldn't match up-
and make fine adjustments to the positions so that my functions worked*/
/*I'll detail everything out more specifically later*/
let blockXAdj = 0;
let mapXAdj = 0;
let adjIOut = 0;
const movingPlatAdj = (var1, var2) => {
	/*I was going to pass in platformarrX[0][k] and [k + 1] from the on platform
	height fnction. It didn't quite work although I think with some tweaking I could
	maybe get it to work or at least something similar to work so I don't have to 
	add every moving platform in here but I'll worry about that in a minute*/
	/*The reason for why the second moving platform wouldn't work was actually
	fairly simple. I just overlooked that since they're both the same height and
	everything and the 7 was an else if to the 6top and currentY part since they're
	both true and false at the same times only the first one will ever execute
	because it doesn't considere any of the other else if's after the first one
	is true. idk why I overlooked that lol I was thinking it was going to be something
	crazy cause the rest of this has been fairly involved. I feel like there's probably
	a way to refactor this now though and I might be able to make some kind of loop
	work now I'm not sure though. */

	if (currentY < flat6Top && currentY + 100 > flat6Bottom) {
		console.log(6);
		if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			- blockX > 40 && flat6Direction === 0) {
			console.log('6.1.1');
	what2.innerHTML = 'what';		
			blockX = flat6Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			

			/*belowPlatform = true;*/
		} else if (flat6Left -.0000000001 - blockX < 50 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 2) {
			what2.innerHTML = 'what';
			blockX = flat6Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			xChange = true;
			console.log('6.1.2');
/*This jumps after I fall below the line of the moving platform. It seems like
nothing actually moves while i'm hitting the side of the platform. at least when
I hit it after jumping off the previous platform. This I believe has something
to do with the map shift cause it's about the only scenario where the map shift
applies while any of these are excecuting.*/
		} else if (flat6Left -.0000000001 - blockX < 53 && flat6Left - .0000000001 
			-blockX > 40 && flat6Direction === 1 && right) {
			/*Turning map moving map it so that the platforms move but when you
			fall the map still jerks. since your only moving three along with the
			platform I'll need to adjust the map move so that it only moves three
			as well while this is happening and then smooth it back out to factors
			of ten like I did with the blockx and x. I'll probably need to keep
			map moving true because it is and then I may also have to adjust something
			in the (mapmoving) platform move function possibly. IDK we'll see. I'm not
			exactly sure how to implement it.*/
			
			what2.innerHTML = 'what';
			blockX = flat6Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(10, 1, flat6Left);
			right3 = false;
			/*It seems like the below should help because the map isn't moving
			because right3 is false but at this point it is at 760 so the map should
			adjust along with everything else you'd just have to specifiy to do this
			when the block is moving right and not when it's still etc. It seems there's
			more to what's causing the wierd movement. I haven't looked to deeply into it
			because turning mapMoving to false worked. I'll need to relook at why that helps
			in detail. It's strange it almost looks like when mapMoving isn't false the moving
			platform gets stuck in place and then jumps right when you fall below it
			mapXMap -= 3;
			map.style.left = `${mapXMap}px`;*/
			mapMoving = false;
		
console.log('6.1.3');
		} else if (blockX - flat6Right <= 0  && blockX - flat6Right > - 20 && flat6Direction
			=== 1) {
			console.log('6.2.1');
 			blockX = flat6Right;
			block.style.left = `${blockX}px`;
			what2.innerHTML = `${blockX} ${flat6Right}`;
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
			mapMoving = false;	

		 } else if (blockX - flat6Right <= 0 && blockX - flat6Right > -20 && flat6Direction
			=== 0) {
		 	console.log('6.2.3');
		 	what2.innerHTML = 'what';
			blockX = flat6Right;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(11, 1, flat6Right);
			left3 = false;				

		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left)
			-blockX > 40 && flat7Direction === 0) {
			console.log('7.1.1');
			what2.innerHTML = 'what';		
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			

			/*belowPlatform = true;*/
		} else if (Math.floor(flat7Left) - blockX <= 50 && Math.floor(flat7Left) 
			-blockX > 40 && flat7Direction === 2) {
			console.log('7.1.2');
			what2.innerHTML = 'what';
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			
/*This jumps after I fall below the line of the moving platform. It seems like
nothing actually moves while i'm hitting the side of the platform. at least when
I hit it after jumping off the previous platform. This I believe has something
to do with the map shift cause it's about the only scenario where the map shift
applies while any of these are excecuting.*/
		} else if (Math.floor(flat7Left) - blockX <= 53 && Math.floor(flat7Left) 
			- blockX > 40 && flat7Direction === 1 && right) {
			console.log('7.1.3');
			/*Turning map moving map it so that the platforms move but when you
			fall the map still jerks. since your only moving three along with the
			platform I'll need to adjust the map move so that it only moves three
			as well while this is happening and then smooth it back out to factors
			of ten like I did with the blockx and x. I'll probably need to keep
			map moving true because it is and then I may also have to adjust something
			in the (mapmoving) platform move function possibly. IDK we'll see. I'm not
			exactly sure how to implement it. */
			mapMoving = false;
			what2.innerHTML = 'what';
			blockX = flat7Left - 50;
			block.style.left = `${blockX}px`
			platformArrXGrouped[0].splice(12, 1, flat7Left);
			right3 = false;
			mapMoving = false;

		} else if (blockX - flat7Right <= 0  && blockX - flat7Right > - 20 && flat7Direction
			=== 1) {
			console.log('7.2.1');
 			blockX = flat7Right;
			block.style.left = `${blockX}px`;
			what2.innerHTML = `${blockX} ${flat7Right}`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;
			/*I put three in the below because when left3 = false the platform
			will always move before you do putting it three away at everyframe
			but since your holding left you have the intention of moving in that
			direction so you need to say < 3 and not < 0 because it actually will
			be between 0 and 3 at every next frame while this is happening. It definitly
			seem to help some of the jerkiness here but it's still not perfect*/
		} else if (blockX - flat7Right <= 3 && blockX - flat7Right > - 20 && flat7Direction
			=== 2 && left) {
			console.log('7.2.2');
			
			blockX = flat7Right;
			block.style.left = `${blockX}px`;
			platformArrXGrouped[0].splice(13, 1, flat7Right);
			left3 = false;	
			mapMoving = false;
		 } else if (blockX - flat7Right <= 0 && blockX - flat7Right > -20 && flat7Direction
			=== 0) {
		 	console.log('7.2.3');
		 	what2.innerHTML = 'what';
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
		console.log('8');
		blockXAdj = blockX - x;
		for (let i = 0; i < 10; i ++ ) {
			if (x % 10 === i) {
				/*I guess I could maybe do += i when it's on one side of five
				and -= 10-i when it's on the other just to get it to the closest
				ten. although if it goes in the opposite direction from the movement
				of the platform that could cause problems... nevermind this only happens
				if below the platform so it shouldn't cause problems. and if i really
					wanted to I could keep the left3/right 3 disabled for an extra turn
				after this with a counter and smooth it over two or maybe three frames*/
				if (right || left) {
				x = x - i;
				}; //else if (left) {
					/*adding the distinction for left and right and then remove
					the first call to this function before the left and right
					arrow functions trigger seems to have fixed the problems I was
					having with you coming in on the left side of the platform. now
					the only issue seems to be when you hit the platform as the map
					itself is moving. It causes sort of a jerk in the map when you
					hit and then drop below. IDK if I'm going to worry about it now.
					I might fix it later as it's not effecting the rest of my program
					in any way and it 'almost' looks intentional lol. I'll definitly
					come back to it later as well as making this more dynamic like I did
					with some of the other functions so I don't have to add each new
					moving platform here. Everythings set up in a way though that I'll be able
					to finish the rest of the map and then implement the refactored code and these
					minor fixes later without causing any issues.*/ 
					/*blockXAdj -= i;
				};*/
			};

			if (xMap % 10 === i) {
				if (right || left) {
					xMap = xMap - i;
				}
			};
		};
		console.log(blockXAdj);

		x = x + blockXAdj;
		blockX = x;
		block.style.left = `${x}px`;
		console.log(x);
		/*xMap = xMap + blockXAdj;*/
		right3 = true;
		left3 = true;
		blockXAdj = 0;
	};
	/*I need to make a function that determains if your on over or touching a moving platform
	and then will give the x left and right cordinate of that platform but I'm going to 
	just type it out specifically below first what I think might help*/




};



/*Takes the value that the map has shifted when it scrolls from left to right, adjusts
the position of each platform acordingly-the left most part of the screen is always 0-
and then splices the new platform position into the platform array*/
const platformXPostion = (shift) => {


	/*it might be harder but I wonder if I could make a loop or something here
	to that would do all this without having to add them manually. So all I do
	is add them at the top of the page and it would be good to go. I probably could
	just make two loops one for hole and one for grouped and say something like
	flati+1left = faltileft++1shift and platfromarrXgrouped[0].splice(i, 1, flati+1left)
	etc and just say toString on the i + 1 in the variable name*/
	/*I'm having troubles getting the below to work because i can't put the l value
	inside the variable without it acting like a string and if you say eval() it doesn't
	work because eval evaluated the string inside a variable and so I'd have to create
	variables with strings and the variable name and it would kind of defeat the purpose.
	One idea I have though is to make all the variable for the platform positions 
	properties inside a map or level object. beings how keys are string i'm thinking I could maybe 
	do that instead and make this work */


/*I could reuse alot of these functions or similar functions in different levels
or games that are similar which is one reason why I want to make it like this so
I could import basic funcionality into different types of games and not have to
set everything up everytime*/
/*The below seems to make the platform position shift correctly but hole basically
stays true after the first time you pass a hole. IDK if it's just a timing thing
because there's so many sub loops dependant on this part of the code and since this
is also looping and it gets called several times... idk really at the moment I think
I might come back to it later though.*/
/*
	if (firstShift) {
		for (let m = 0; m < platformArrXGrouped[0].length; m++) {
			platformArrXGroupedO[0][m] = platformArrXGrouped[0][m];
		}

		for ( let n = 0; n < platformArrXGrouped[1].length; n++) {
			platformArrXGroupedO[1][n] = platformArrXGrouped[1][n];
		}
		firstShift = false;
	};

	for (let p = 0; p < platformArrXGrouped[0].length; p++) {
		platformArrXGrouped[0][p] = platformArrXGroupedO[0][p] + shift;
		 /*platformArrXGrouped[0].splice(l, 1, eval(`flat${m.toString()}left`));
	};

	for (let o = 0; o < platformArrXGrouped[1].length; o++) {
		platformArrXGrouped[1][o] = platformArrXGroupedO[0][o] + shift;
	};*/

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
	that but*/
	/*movingPlatAdj();*/

	/*determains the movement of the block and map to the right in various cercumstances*/
	if (right && right2) {
		/*The x positions adjusting with modulo are meant to make sure that after
		you come off of any moving platforms it adjust itselft to an interval
		devisible by ten so that it will interact properly with the other platforms
		this doesn't really need to adjust while it's on the platform though and in fact
		makes the block jump really fast, at least when going to the left. When you take these
		off it still does that but less so. The right seems to work preatty well and actually
		seems to jump less when it's like this so I think there's something in the amounts
		and directions it's adjusting i'm overlooking. I think I may need to subtract the modulo
		from ten in another variable and apply it but it would have to only do that in certain
		cases and when the x was something that wasn't divisible by ten already. I'm not
		to sure why it's jumping really fast even without these though. Actually it might
		have something to do with the fact that generally when I'm going right the map is
		moving and when I'm going left it's not. That might also be part of the difference.
		I'll come back to it tomorrow. In any case this is why the block was jumping past
		760 and why it was sliding inside platforms because the platform adjust was making it
		not divisible by ten. Although this mostly helped with that at least for the going right
		scenario I'm still not to sure why it was letting x go past 760. I get why it was slipping
		into the platforms but I'm really not sure what part of this program was alowing
		the block to go further right than 760. This fixed it but idk what the cause was in
		the first place at the moment because x shouldn't move if x is greater than 760. */
	
		if (blockX <= 750) {
			what2.innerHTML = 'yes';
			/*if (blockX + 10 >= ai1left &&  blockX + 10 <= ai1left + 50) {
				if (currentY <= ai1BaseHeight + 50) {
					for (i = 1; i < 10; i++) {
							if (ai1left - blockX === i) {
								console.log('opuioeqwjflkdsa;lkaj');
						x += i;
						block.style.left = `${x}px`;
						blockX = x;
						break;
					} else {
						continue;
					}
					} 
				}	
			} else {*/

			/*if (hole && nextRight - blockX - 50 < 0) {
				block.style.left = `${xMaxRight}px`;
				blockX = xMaxRight;
			} else {*/
		if (right3) {	
		mapMoving = false;
		x += 10 - x % 10;
		block.style.left = `${x}px`;
		blockX = x;
		}
		
		
	} else {
		if (right3) {
	mapMoving = true;
	xMap -= 10 + xMap % 10;
	map.style.left = `${xMap}px`;
	mapXMap = xMap;
	platformXPostion(mapXMap);
 };/* else if (!right3) {
		mapMoving = true;
	xMap -= 3;
	map.style.left = `${xMap}px`;
	mapXMap = xMap;
 }*/
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
			/*x -= 10;
		block.style.left = `${x}px`;
		blockX = x;*/		
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


				/*if (currentY <= ai1BaseHeight + 50) {

		if (blockX >= ai1left - 50 && blockX <= ai1left + 50) {
			/*I guess if you fall and touch the side and not the top this wouldn't
			apply so I'll have to work all those more edge cases out.
			if (up && !up2) {
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
	};*/

	/*I wasn't thinking but the platforms are going to have to be in increments
	that are divisible by ten to work... actually they would have to be exactly 
	ten to always work now that i'm thinking about it and the ai would to to work
	exactly while it was moving. I was thinking it would be okay but to be %100
	accurate they need to be. What I need to do is find a way to maintain the speed
	I have here but get around that limitation*/


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
							if (blockX <= 750) {
							mapMoving = false;
							x += 3;
							blockX = x;
							block.style.left = `${x}`;
						}	else if (blockX > 750) {
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
							block.style.left = `${x}`;
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
							block.style.left = `${x}`;
						} else if (blockX < 400) {
							mapMoving = true;
							xMap += 3;
							map.style.left = `${xMap}px`;
							mapXMap = xMap;
							platformXPostion(mapXMap);
						};
						} else if (currentPlatIndex === 12) {
							if (blockX <= 750) {
								mapMoving = false;
								x += 3;
							
							blockX = x;
							block.style.left = `${x}`;
						}	else if (blockX > 750) {
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
	/*I realised I didn't need the flat6Left etc on these. IDK why I had set it up like that
	tbh. flat6Move does what I want it to the only problem was that I only call mapadjust
	when the block is moving. I must have overlooked that and decided I needed both for some
	reason. In any case this also fixed the problem of everything freezing when I jumped while
	I was on the moving block. It's still super wierd to me it only would freeze right when
	I first jumped on it if I jumped again. As soon as I moved or as soon as the platform
	switched direction it would stop doing it. I started looking here because I figured it
	had to be something in this that was causeing it because these are the functions tha
	move the platforms and the platforms just compleatly stopped moving. That was the only
	thing I really noticed that was wierd and I figured in any case it would be a good idea
	to restructure it because I didn't need to adjust both Left and Move. So that glitch
	is what brought me here and get rid of that erounous code but I'm not to sure why it fixed
	it. The only thing that really makes sense so far, and I was thinking this before but
	my origional attempt didn't fix it, is that because your at 760px map moving is true
	and since when you jump you don't move map moving never goes back to false, even though
	after you jump the map isn't moving any more. because map moving only goes to false in the
	left and right functions and inside the onplatform if statement in these. So it continues
	going off the mapmoving function and the only thing that moves the platforms in there
	is insed the onplatform logic. since your in the air that can't excecute. that's actually
	definitly what it is. that has to be. that's what I was thinking made sense although
	I sort of overlooked that the platform adjust was only called from within that logic
	and that's the part that makes it for sure. I don't know what my origional fix was but
	the fix I came up with here that works makes more sense anyway cause it allowed me to
	git rid of some excess code that I didn't need to. Not doing anything on this program
	in a month or so I think is why I overlooked it. I actually forgot how this part worked
	exactly. And I had compleatly forgot that the map adjust was only called in the left
	and right. I call most of the functions at the begining of the loop and sort of assumed
	that I called that one as well. I can probably clean a lot of this up to be honest and refactor
	but I want to work out. So i've fixed that and your block isn't slipping in between
	the platforms anymore due to it not being in increments of ten. There seems to be 
	a little extra funnieniess on the second moving platform now though. Unless it's something
	I didn't notice. But in any case the mapMoving fix is definitly a step in the right direction
	and I think that the fix for setting x back to intervales of ten is more or less the
	right direction as well. I just have to be more specific. I think that is what's causing
	the problems. Certain things are conflicting with eachother or something. I'm not to 
	sure yet. */

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
			/*platformArrXGrouped[1].splice(8, 1, hole5Left);*/

			flat6Direction = 1;
			flat7Direction = 2;
					if (onPlatform) {
						if (currentPlatIndex === 10) {
							if (blockX <= 750) {
							mapMoving = false;
							x += 3;
							blockX = x;
							block.style.left = `${x}`;
						}
							else if (blockX > 750) {
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
							block.style.left = `${x}`;
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
			//hole5Left -= 3;
			hole5Right -= 3;
			hole6MoveL -= 3;
			hole6Left -= 3;
			hole6MoveR += 3;
			hole6Right += 3;
			hole7Move +=3;
			hole7Left +=3;
			//platformArrXGrouped[1].splice(8, 1, hole5Left);

					if (onPlatform) {
						if (currentPlatIndex === 10) {
							if (blockX >= 400) {
							mapMoving = false
							x -= 3;
							blockX = x;
							block.style.left = `${x}`;
						} else if (blockX < 400) {
							mapMoving = true;
							xMap += 3;
							map.style.left = `${xMap}px`;
							mapXMap = xMap;
							platformXPostion(mapXMap);
						};	

						} else if (currentPlatIndex === 12) {
							if (blockX <= 750) {
							mapMoving = false;
							x += 3;
							blockX = x;
							block.style.left = `${x}`;
						}
							else if (blockX > 750) {
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
			/*if (!right3) {

			}*/			
			loopCount++;
		}  else if (loopCount > 160 && loopCount <= 200) {
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

	

		/*if (mapMoving) {
		
		if (loopCount < 60) {
			
			
		} else if (loopCount >= 60 && loopCount <= 100) {
			
			
		} else if (loopCount > 100 && loopCount <= 160) {
			
			
		}  else if (loopCount > 160 && loopCount <= 200) {
			
			
		} else if (loopCount > 200) {
			loopCount = 0;
		};

	}*/

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
						/*This works as it should for the moving block when the
						block is all the way to the left and not moving. The block
						if it's base is below the platform hits the side and can't
						move past until the block is fully below and then it can 
						again and continues dropping. I can't get it to work while
						its moving though and i'm pretty sure it's because the movments
						of 3 and 10 don't match up. I'm trying to work out something to
						fix it in either the block x move part or the next right and
						current plat y part but I haven't been able to make it work yet.*/
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

	if (!up && up3) { console.log('also three something');
		right2 = true;
		left2 = true;
		
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
				falling = true;
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
				falling = true;
			/*For some reason I was thinking that the if hole ===true in the below
			was to make it so you didn't flot on top of the hole so i wasn't putting
			this below. I forgot though it was actually just so you'd fall below 0 and
			go out of frame lawl.*/
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
			/*This makes the block fall below 100% when not in a jump but it makes
			the fall off the eadge jump slightly and doesn't look as smooth. I'm 
			not to sure why*/
			/*I have no idea why but without putting the blockX !== 0 it always 
			executes this bit of code on the very first frame of the loop. I sat
			for maybe 30 minutes trying to figure out why. I'm still not sure but
			I'm going to think about it latter. I don't see why it would ever execute
		on the first frame.*/
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
/*Resets most things back to normal. up2 isn't because if your holding up and it
restarts it'll auto jump. and chCheck isn't because once that's set and changes
where it needs to you don't really need it to reset. If you do it causes problems
 with the 2.x functions because if chCheck goes to false and again if your holding
 up the whole way through it won't get redifined so if you then hit another wall it
 will make currentY jump up by however much the next platfrom is because the coresponding
  change in base height when you hit the new wall because y change in there is based
  on baseHeight and not height check. */

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
/*I'm actually not to sure why this restarts most of the time before the animation
finishes. I'd be fine with it, actually I kind of like it it's just not consistant
and someitmes it finishes compleatly before it restarts
It seems like loop count goes up even when this animations happening which
tells me that once hit AI animation is called it continues running the loop and doesn't
stop to wait for the hole animation to run. it logs invisible multiple times before
logging visible. I would think that might mean that the main loop continues to run
but 3.1 and all those other things don't log inbetween like they would if that 
was the case. I'm not sure why that happens. also for some reason after invisible
3 goes and iteration should  restart and the loop should stop it still runs a few
times which is why i'm getting the effect of it still blinking after restart. on the
other hand it is logging true everytime so it must be running the main loop. it's
just not executing any of the other functions. saying if hit animation = false then
do the loop works other than that when you restart for some reason the ai block is
way back at the start of the map and isn't moving. also you can't move the block
when it restarts. I'm assuming because the animation loop can't get called.*/
 /* 	const hitAIAnimation = () => {
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
  	}*/

	  /*Restarts if you fall all the way down a hole*/
	if (currentY < -100) {
		console.log('1');
		restart();
	};
	/*Instead of instantly returning to the beggining here I should play
	some kind of animation where the block falls off the map or does something*/
	/*I might have to position this more strategically in relation to the other two
	ai move functions to make my x over work corectly all the time if it'll even work
	the way I want */


				onPlatformHeight();
				getCurrentY();
				closestPlatformLeft();
				closestPlatformRight();
				
				bHCall();


	/*There's more scenarios where the block could fall on the ai's head but in this
	scenario not really so i'm going to try it like this first*/

	/*logic that determains when you hit the ai*/

				if (currentY <= ai1BaseHeight + 50) {

		if (blockX >= ai1left - 50 && blockX <= ai1left + 50) {
			/*I guess if you fall and touch the side and not the top this wouldn't
			apply so I'll have to work all those more edge cases out.*/
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





/*
		if (!mapMoving) {
		
		if (loopCount < 60) {

			loopCount ++;
		} else if (loopCount >= 60 && loopCount <= 100) {
			
			loopCount++;
		} else if (loopCount > 100 && loopCount <= 160) {

			loopCount++;
		}  else if (loopCount > 160 && loopCount <= 200) {
			
			loopCount ++;
		} else if (loopCount > 200) {
			loopCount = 0;
		};

	}*/

	/*	else if (!right2) {
				if (loopCount < 60) {
			ai1left += 3;
			loopCount ++;
		} else if (loopCount >= 60 && loopCount <= 100) {
			loopCount++;
		} else if (loopCount > 100 && loopCount <= 160) {
			ai1left -= 3;
			loopCount++;
		}  else if (loopCount > 160 && loopCount <= 200) {
			loopCount ++;
		} else if (loopCount > 200) {
			loopCount = 0;
		};
	};*/

	ai1.style.left = `${ai1left}px`;
	base6.style.left = `${flat6Left}px`;
	base7.style.left = `${flat7Left}px`;

/*${baseHeight} ${currentPlatY} ${currentY} ${nextLeft} 
${xMaxLeft} ${nextRight} ${xMaxRight} ${baseHeight} ${hole} ${inAir}${platformArrXGrouped[0][2]} ${currentY} ${currentPlatY} ${ai1.style.left}
${ai1left} ${blockX} ${loopCount} ${ai1Move} ${currentY}
${mapMoving} ${flat6Right} ${flat6Direction}
${platformArrXGrouped[0][10]} ${platformArrB[5]} ${nextRight} ${xMaxRight} ${hole} ${currentPlatY} ${belowPlatform} ${platformArrXGrouped[1][8]} ${platformArrXGrouped[1][9]} ${flat6Left} ${base6.style.left}*/
	what.innerHTML = `${loopCount} ${flat6Direction} ${blockX} ${flat6Left} ${flat6Move} ${currentY} ${flat6Top} ${belowPlatform} ${xMaxRight} ${onPlatform} ${currentPlatIndex} ${hole} ${blockXAdj}`;


/*When you jump on the moving block unless it's done that wierd jercky thing that makes
it so your movements are fast and you slip through the platforms most of the time, neither you
nore the platform moves. actually it will do this even without the jercky thing. it seems
to only happen when you touch the platform and then don't move before you jump. The jerckiness
seems fairly sparadic. There seems to be specific things that trigger it but I'm not to sure
yet. The jerkiness and going through the platforms happens when your block isn't an even
interval of 10. I need something that makes sure it will always set back to an interval 
of ten when your off the platform.*/
console.log(loopCount);
console.log(blockX);
console.log(x);
console.log(blockXAdj);
console.log(currentY);
console.log(onPlatform);
console.log(belowPlatform);
console.log(xMap);
console.log(mapXMap);
console.log(flat6Right);
console.log(flat7Left);
console.log(flat7Right);

console.log(hole);

console.log(left2);
console.log(right2);
console.log(left3);
console.log(right3);
console.log(platformArrB[5]);
/*
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
console.log(ai1left);
console.log(mapMoving);*/




	/*I'll think about how to make the jump work tomorrow. I know i watched a video
	doing it with canvas and everything but I don't really remember how he did it
	and I think coming up with my own solution like this will be beneficial to understanding
	it. Basically I'll-well it'll sort of depend on if I want the jump to be higher or
	not depending on if you hold it and different things- have to make the y increment
	up from the starting point at a given speed that seems right for a given amount of
	time to reach the max height that I want and then make it come back down when after
	it reaches that max height. I'll also have to make it so the jump animation is self contained
	in some way so you can't just hold the up button and float at the max heigth*/

	if (!hitAnimation) {
		requestAnimationFrame(blockmove)
	};

	
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
