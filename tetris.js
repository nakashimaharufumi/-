function setup() {
    createCanvas(600, 700);
    initVar();
}

let myBlockX, myBlockY;

function initVar() {
    myBlockX = 5;
    myBlockY = 1;
}

function writePath() {
    stroke(255);
    strokeWeight(1);
    line(40, 40, 40, 640);
    line(40, 40, 440, 40);
    line(40, 640, 440, 640);
    line(440, 40, 440, 640);
    for (let i=1; i<10; i++) line((i+1)*40, 40, (i+1)*40, 640);
    for (let i=1; i<15; i++) line(40, (i+1)*40, 440, (i+1)*40);
}
let cs = 0;
let score = 0;
let count = 0;
let masu = [];

function draw() {
    count++;
    clear();
    writePath();
    textSize(30);
    text("count: "+parseInt(count/60), 100, 30);
    drawPzl();
    moveBlock();
}

function drawPzl() {
    for (let i=0; i<17; i++) {
        let masu_x = [];
        for (let j=0; j<12; j++) {
            if (i==0 || i==16 || j==0 || j==11) masu_x.push(-1);
            //else if (i==j) masu_x.push(1);
            else masu_x.push(0)
        }
        masu.push(masu_x);
    }

    //drawBlock();

    for (let y=1; y<16; y++) {
        for (let x=1; x<11; x++) {
            if (masu[y][x]==1) square(40*x, 40*y, 40);
            //else if (masu[y][x]==0) clearSquare(40*x, 40*y, 40);
        }
    }
}

function drawBlock() {
    /*
    for (let i=-1; i<2; i++) {
        masu[myBlockY][myBlockX+i] = 1;
        //masu[myBlockY-1][myBlockX+i] = 0;
    }
    */
    masu[myBlockY][myBlockX] = 1;
    masu[myBlockY-1][myBlockX] = 0;
}

function moveBlock() {
    if (count%(60*5)==0) myBlockY++;
    if (keyIsPressed && keyCode==DOWN_ARROW) {
        keyIsPressed = false;
        if (masu[myBlockY+1][myBlockX-1]+masu[myBlockY+1][myBlockX]+masu[myBlockY+1][myBlockX+1]==0) {
            myBlockY++;
        }
    }
    drawBlock();
}