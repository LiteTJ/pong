const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/*-------------------------Images-------------------------*/
const img = {};

img.null = new Image();
img.null.src = "img/null.svg";

img.ball = new Image();
img.ball.src = "img/ball.svg";

img.paddle = new Image();
img.paddle.src = "img/paddle.svg";
/*-------------------------End of images-------------------------*/

let GAME, KEYS = [];

window.onload = () => {
    console.log("Hello world!");
    console.log("Revamp: ball must bounce off something else before bouncing with paddle again");
    console.log("Push this to GitHub");

    init();
    tick();
}

function init()
{
	//Initialise objects
	for(let i = 0; i < 255; i++)
	{
		KEYS.push(false);
	}

    GAME = new Game();
    GAME.init();

    //Set event handlers
    document.onkeyup = (e) => {
    	KEYS[e.keyCode] = false;
    }

    document.onkeydown = (e) => {
    	KEYS[e.keyCode] = true;
    }
}

function tick()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    GAME.tick();

    window.requestAnimationFrame(tick);
}