const block = document.querySelector('.block');
const what = document.querySelector('.what');

/*I think the reason that requestanimationframe works like this but css animations don't has at
least partially to do with the fact that requestanimationframe is none blocking. IDK exactly how 
they make it none blocking. I learned stuff about that in the os portion but don't remember exactly
it's not like an async function. that waits for something to be done before it executes. this executes
independintly of everything else without blocking but is also runs without waiting for some other
operation to finish. if i'm understanding it right. I read something that said css runs in a differnt
thread then js and so is non blocking but idk how that changes when you try to call animations
from within js. yeah so it works on a seperate thread but another article says that css is a render
blocking resource. I'm not EXACTLY sure what that means but I know what blocking means in general
and I think this is why the css animations work the way they do when you try to run them in js
for scenerios like the one below and request animationfram kind of negates that. but if I were
to use canvas and designate the x and y locations without I'm thinking that might fix the wierd
laging off the bat that's happening here. i'm thinking those posistion movements may be removed
from css and are maybe non blocking. I'm wondering if that is why this is having the behavior that
it's having. */


let right = false;
let left = false;
const move = (e) =>{
 	but = true;
 	if (e.keyCode === 37) {
 		left = true
 	}

 	if (e.keyCode === 39) {
 		right = true;
 	}
 	blockmove();
}

const move2 = () => {
	
	right = false;
	left = false;
}

let buttoncount = 0;

let x = 0;
const blockmove = () => {
	if (right) {
	x += .05;
	block.style.left = `${x}px`;
}
	if (left) {
	x -= .05;
	block.style.left = `${x}px`;		
	}


	
	
	
		requestAnimationFrame(blockmove)
	
}


document.addEventListener('keydown', move);
document.addEventListener('keyup', move2);
requestAnimationFrame(blockmove);


