function setup() {
    createCanvas(600, 700);
    initVar();
}

let myBlockX, myBlockY;

function initVar() {
    myBlockX = 5;
    myBlockY = 1;
    for (let i=0; i<17; i++) {
        let masu_x = [];
        for (let j=0; j<12; j++) {
            if (i==0 || i==16 || j==0 || j==11) masu_x.push(-1);
            else masu_x.push(0)
        }
        masu.push(masu_x);
    }
}

function writeField() {
    clear();
    stroke(255);
    strokeWeight(1);
    line(40, 40, 40, 640);
    line(40, 40, 440, 40);
    line(40, 640, 440, 640);
    line(440, 40, 440, 640);
    for (let i=1; i<10; i++) line((i+1)*40, 40, (i+1)*40, 640);
    for (let i=1; i<15; i++) line(40, (i+1)*40, 440, (i+1)*40);
    textSize(30);
    text("count: "+parseInt(count/60), 50, 30);
    text("score: "+score, 200, 30)
}

let cs = 0;
let score = 0;
let count = 0;
let masu = [];
let kesu = [];

function draw() {
    count++;
    writeField();
    drawPzl();
    moveBlock();
}

//パズル描写
function drawPzl() {
    for (let y=1; y<16; y++) {
        for (let x=1; x<11; x++) {
            if (masu[y][x]==1) square(40*x, 40*y, 40);
        }
    }
}

let move = 0; //ブロック移動の場合分け用変数

//ブロック移動
function moveBlock() {
    switch (move) {
        case 0: //ブロック操作
            masu[myBlockY][myBlockX] = 1;
            
            if ((keyIsPressed && keyCode==DOWN_ARROW) || count%(60*5)==0) { //下移動
                keyIsPressed = false;
                if (masu[myBlockY+1][myBlockX]==0) {
                    myBlockY++;
                    masu[myBlockY][myBlockX] = 1;
                    masu[myBlockY-1][myBlockX] = 0;
                } else {
                    move = 1;
                }
            }
            if (keyIsPressed && keyCode==RIGHT_ARROW) { //右移動
                keyIsPressed = false;
                if (masu[myBlockY][myBlockX+1]==0) {
                    myBlockX++;
                    masu[myBlockY][myBlockX] = 1;
                    masu[myBlockY][myBlockX-1] = 0;
                }
            }
            if (keyIsPressed && keyCode==LEFT_ARROW) { //左移動
                keyIsPressed = false;
                if (masu[myBlockY][myBlockX-1]==0) {
                    myBlockX--;
                    masu[myBlockY][myBlockX] = 1;
                    masu[myBlockY][myBlockX+1] = 0;
                }
            }
        break;
        case 1: //列が揃っているか判定
            for (let y=16; y>0; y--) {
                if (masu[y][1]+masu[y][2]+masu[y][3]+masu[y][4]+masu[y][5]+masu[y][6]+masu[y][7]+masu[y][8]+masu[y][9]+masu[y][10]==10) {
                    kesu[y] = 1;
                } else kesu[y] = 0;
            }
            let n = 0;
            for (let y=16; y>0; y--) if (kesu[y]>0) n++
            if (n>0) move = 2;
            else {
                myBlockX = 5;
                myBlockY = 1;
                move = 0;
            }
        break;
        case 2: //ブロック削除
            for (y=16; y>0; y--) {
                if (kesu[y]>0) {
                    kesu[y] = 0;
                    score += 100;
                    for (x=11;x>0; x--) masu[y][x] = 0;
                }
            }
            move = 3;
        break;
        case 3: //ブロック全体を落とす
            let c = 0;
            for (let y=16; y>0; y--) {
                for (let x=10; x>0; x--) {
                    if (masu[y][x]>0 && masu[y+1][x]==0) {
                        masu[y+1][x] = 1;
                        masu[y][x] = 0;
                        c = 1;
                    }
                }
            }
            if (c==0) move = 1;
        break;
    }
}