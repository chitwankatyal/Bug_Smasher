/*Created By: Chitwan Katyal
Student ID: 301169422
Assignment 5*/

"user strict"

//Creating the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var time = 0;
var caught = false;
var fps = 10;  //Frame Rate
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 550;

//Background Image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "Images/background.jpg";

//Bug
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function() {
    bugReady = true;
};
bugImage.src = "Images/bug.gif";

var bug = {};
var bugCaught = 0;

var reset = function() {
    bug.x = 40 + (Math.random() * (canvas.height - 120));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 120));
    }
    while (bug.y < 100)
};

//Mouse down event
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {
    if (e.button !== 0)
    return;

    mouseXcanvas = e.clientX;
    mouseYcanvas = e.clientY;

    if (bugBody(bug, mouseXcanvas, mouseYcanvas)) {
        caught = true;
        clearInterval(time);
        time = setInterval(reset, 20000 / fps);
        reset();
    }
    if (resetScore(mouseXcanvas, mouseYcanvas)) {
        location.reload();
    }
    if (resetSpeed(mouseXcanvas, mouseYcanvas)) {
        clearInterval(time);
        time = setInterval(reset, 20000 / fps);
        reset();
        draw();
    }
};

// Bug's Body
function bugBody(bug, x, y) {
    if(x <= (bug.x + 80)
    && bug.x <= (x + 80)
    && y <= (bug.y + 80)
    && bug.y <= (y + 80))
    {
        fps = fps + 5;
        bugCaught++;
        return true;
    }
    return false;
};

//Reset score
function resetScore(x, y) {

    if (x >(305)
    && x < (545)
    && y > (15)
    && y < (85))
    {
        return true;
    }
    return false;
};

//Reset Speed
function resetSpeed(x, y) {
    if (x > (605)
    && x < (845)
    && y > (15)
    && y < (85))
    {
        fps = 10;
        return true;
    }
    return false;
};

//Draw everything
var draw = function() {

    ctx.clearRect (0, 0, ctx.canvas.width, ctx.canvas.height);

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 100);
    }
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }if (caught == true) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 100);
        }
        caught = false;
    }

    //Title
    ctx.textBaseline = "top";
    ctx.fillStyle = "darkblue";
    ctx.font = "35px Jokerman";
    ctx.fillText("Bug Smasher!", 5, 40);

    //Score
    ctx.font = "20px Arial Rounded MT";
    ctx.fillText("Score: " + bugCaught, 10, 10);

    //Reset score, Speed Button
    ctx.fillStyle = "cyan";
    ctx.fillRect(250, 10, 250, 80);
    ctx.fillRect(520, 10, 250, 80);

    ctx.fillStyle = "darkblue";
    ctx.fillRect(255, 15, 240, 70);
    ctx.fillRect(525, 15, 240, 70);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial Rounded MT";
    ctx.fillText("Reset Score", 275, 30);
    ctx.fillText("Reset Speed", 545, 30);
    };
    //Main game loop
    var main = function() {
        draw();
        requestAnimationFrame(main);
};

reset();
main();

