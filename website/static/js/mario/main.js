
// 裏画面、仮想画面
let vcan = document.createElement("canvas")
let vcon = vcan.getContext("2d");

// 実画面
let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

// 拡大してもきれいにくっきり表示させる。
con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;



let frameCount = 0;
let startTime;

let isAlive = true;


// character image
let chImg = new Image();
// 注意、読み込む前に次の命令を実行してしまう
chImg.src = "sprite.png";
// chImg.onload = draw;

let ojisan;
let field;
let block;
let item;
let enemy;

function init(){
    // おじさんを作る
    ojisan = new Ojisan(100, 100);

    // フィールドを作る
    field = new Field();

    // ブロックのオブジェクト
    block = [];
    item = [];
    enemy = [];
}

init();
// // おじさんを作る
// let ojisan = new Ojisan(100, 100);

// // フィールドを作る
// let field = new Field();

// // ブロックのオブジェクト
// let block = [];
// let item = [];
// let enemy = [];

function updateObj(obj){
    // スプライトのブロックを更新、逆回しにしとくと途中で消えても問題なさそう？
    for ( let i=obj.length-1; i>=0; i--){
        obj[i].update();
        if ( obj[i].kill ) obj.splice(i,1);
    }
}

function fireCheckHit( obj1, obj2 ){
    // 判定を緩くしないと、キノコを押した瞬間に当たり判定になってしまう
    // 物体１
    let left1   = (obj1.x>>4)       + 2;
    let right1  = left1 + obj1.w    - 4;
    let top1    = (obj1.y>>4)       + 5 + obj1.ay;
    let bottom1 = top1 + obj1.h     - 7;

    // 物体２
    let left2   = (obj2.x>>4)       + 2;
    let right2  = left2 + obj2.w    - 4;
    let top2    = (obj2.y>>4)       + 5 + obj2.ay;
    let bottom2 = top2 + obj2.h     - 7;

    return (
        left1 <= right2 &&
        right1 >= left2 &&
        top1 <= bottom2 &&
        bottom1 >= top2);
}

// Fire と敵が触れてないかチェック
function checkDeadEnemy(){
    for ( let i=0; i<item.length; i++){
        if ( item[i].tp == SPARKS ){
            for ( let j=enemy.length-1; j>=0; j--){
                if ( fireCheckHit(item[i], enemy[j]) ){
                    enemy[j].kill = true;
                    item[i].kill = true;
                }
            }        
        }
    }
}

// 更新処理
function update(){
    // マップの更新
    field.update();

    checkDeadEnemy();

    updateObj(block);
    updateObj(item);
    updateObj(enemy);

    // おじさんの更新
    ojisan.update();
}

// スプライトの描画
function drawSprite(snum, x, y){
    let sx = (snum&15) * 16;
    let sy = (snum>>4) * 16;
    vcon.drawImage(chImg, sx,sy,16,32, x,y,16,32);
}

function drawObj(obj){
    // スプライトのブロックを表示
    for ( let i=0; i<obj.length; i++){
        obj[i].draw();
    }
}

function draw(){
    // 画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

    // マップを表示
    field.draw();


    drawObj(block);
    drawObj(item);
    drawObj(enemy);

    // おじさんを表示,少数があると隣のピクセルとかが出てしまってた
    ojisan.draw();
    
    // デバック情報を表示
    vcon.font = "20px 'Impact'";
    vcon.fillStyle = "white";
    vcon.fillText("FRAME: "+frameCount, 10, 20);


    

    // 仮想画面から実画面へ拡大転送
    con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
        0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3)


}

function drawDead(){

    // 画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

    // マップを表示
    field.draw();

    drawObj(block);
    drawObj(item);
    drawObj(enemy);

    // おじさんを表示,少数があると隣のピクセルとかが出てしまってた
    ojisan.draw();
    
    // デバック情報を表示
    vcon.font = "20px 'Impact'";
    vcon.fillStyle = "white";
    vcon.fillText("FRAME: "+frameCount, 10, 20);

    // Dead画面を表示
    vcon.font = "25px 'Impact'";
    vcon.fillStyle = "white";
    vcon.fillText("YOU ARE DEAD", 60, 100);
    vcon.fillText("Press Enter to continue", 10, 150);

    // 仮想画面から実画面へ拡大転送
    con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
        0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3)

    console.log('aaa');
    return;

}
// setInterval(mainLoop, 1000/60);

// loop start
window.onload = function(){
    startTime = performance.now();
    mainLoop();
}

function mainLoop() {
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime) / GAME_FPS;

    if (nowFrame > frameCount ){
        let c = 0;
        while( nowFrame > frameCount ){
            frameCount++;
            // update
            update();
            // maxで4倍速
            if ( ++c >= 4) break;
        }

        // render, drawing
        draw();
    }

    if ( isAlive ){
        // ブラウザが表示してくださいって言うタイミングで読んでくれる
        requestAnimationFrame(mainLoop); 
    } else {
        drawDead();
    }

}

// 連想配列？
let keyb = {};

// キーボードが押された時に呼ばれる、イベントドリブンの関数
document.onkeydown = function(e){
    if(e.keyCode == 37)keyb.Left = true;
    if(e.keyCode == 39)keyb.Right = true;    
    if(e.keyCode == 40)keyb.Down = true;  

    if(e.keyCode == 90)keyb.BBUTTON = true;   // Z  
    if(e.keyCode == 88)keyb.ABUTTON = true;   // X

    if(e.keyCode == 65)keyb.Squat = true;
    // if(e.keyCode == 65){
    //     // // block.push( new Block(368, 5,5) );
    //     // let x = ( field.scx + SCREEN_SIZE_W*0.8 )>>4
    //     // let y = ( field.scy + SCREEN_SIZE_H /2 )>>4
    //     // enemy.push(
    //     //     new Enemy(96, x, y, -16, 0, 1))
    //     // console.log(field.scx);
    // }
    if(e.keyCode == 83) ojisan.kinoko = 0 ;             // s

    if(e.keyCode == 13) {                             // enter
        isAlive = true;
        frameCount = 0;
        init();
        mainLoop();
    } 
    if(e.keyCode == 32) isAlive = false ;             // space

    // if(e.keyCode == 65)field.scx--;             // a
    // if(e.keyCode == 83){                            // s
    //     let adjust = 8;
    //     let x = ojisan.x>>adjust;
    //     let y = ojisan.y>>adjust;
    //     console.log(x)
    //     item.push(
    //         new Item(112, x, y, 0, 0, SPARKS)); 
    // }
    if(e.keyCode == 83){                            // s
        if ( ojisan.fire ){
            let adjust = 8;
            let x = ojisan.x>>adjust;
            let y = ojisan.y>>adjust;
            console.log(x)
            item.push(
                new Item(112, x, y, 0, 0, SPARKS)); 
        }
    }
}

// キーボードが離された時に呼ばれる
document.onkeyup = function(e){
    if(e.keyCode == 37)keyb.Left = false;
    if(e.keyCode == 39)keyb.Right = false;    
    if(e.keyCode == 40)keyb.Down = true;  

    if(e.keyCode == 90)keyb.BBUTTON = false;   // Z  
    if(e.keyCode == 88)keyb.ABUTTON = false;   // X
    if(e.keyCode == 65)keyb.Squat = false;
}
