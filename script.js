const block = document.querySelector('.block');
const what = document.querySelector('.what');

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


