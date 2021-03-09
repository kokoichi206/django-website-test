// デバッグのフラグ
const DEBUG = true;

// １秒にどれくらい描画してるか
let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

// スムージング
const SMOOTHING = false;

// 1000/60 = 16.6666 -> 16 にされてしまうので、きっちり60fpsにはならない
// 綺麗にモニターのレートに合わせるには、requestAnimationFrameを使う
const GAME_SPEED = 1000/60;

// const SCREEN_W = 180;
const SCREEN_W = 320;
const SCREEN_H = 320;

const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

// const FIELD_W = SCREEN_W * 2;
// const FIELD_H = SCREEN_H * 2;
const FIELD_W = SCREEN_W + 120;
const FIELD_H = SCREEN_H + 40;

const STAR_MAX = 300;


let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

// 拡大しても綺麗に表示するため、
// どのブラウザを使ってもいいようにいっぱいある
con.mozimageSmoothingEnabled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;


// FIELD,仮想画面
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;
vcon.font = "12px 'Impact'";

// カメラの画像、どこを表示するか
let camera_x = 0;
let camera_y = 0;

let gameOver = false;
let score = 0;

// ボスの情報
let bossHP = 0;
let bossMHP = 0;

// 星の実態
let star = [];

// onkeydownは遅いのと、2個目がゆっくり、長押ししたらわかる
// キーボードの状態
let key = [];

// オブジェクトたち
let teki = [];
let teta = [];
let tama = [];
let expl = [];
let jiki = new Jiki();
let item = [];

// teki[0] = new Teki( 75, 200<<8,200<<8,0,0);

// ファイル読み込み、Imageのオブジェクト
// ファイルを読み込むとき、読み込むのを待たずに（「非同期で」）次のプログラムに進んでしまう
// 本来ならその辺の処理もすべき
let spriteImage = new Image();
spriteImage.src = "sprite.png";

let spriteMarioImage = new Image();
spriteMarioImage.src = "spriteMario.png";

let spriteItemImage = new Image();
spriteItemImage.src = "itemSprite.png";

// ゲーム初期化
function gameInit(){

}
for ( let i=0; i<STAR_MAX; i++) star[i] = new Star();


// 60fpsで呼ぶ
setInterval( gameLoop, GAME_SPEED );

function updateObj( obj ){
    for ( let i=obj.length-1; i>=0; i--){
        obj[i].update();
        if( obj[i].kill ) obj.splice( i,1 );
    }
}

function drawObj( obj ){
    for ( let i=0; i<obj.length; i++) obj[i].draw();
}

// 移動の処理
function updateAll(){
    updateObj(star);
    updateObj(tama);
    updateObj(teki);
    updateObj(teta);
    updateObj(item);
    updateObj(expl);
    if( !gameOver ) jiki.update();
}

// 描画の処理
function drawAll(){
    // 背景の画像
    vcon.fillStyle = (jiki.damage)?"red":"black";
    vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);

    drawObj(star);
    drawObj(tama);

    if( !gameOver ) jiki.draw();
    drawObj(item);
    
    drawObj(teki);
    drawObj(expl);
    drawObj(teta);

    // drawMario( 0, jiki.x+(12<<8), jiki.y+(12<<8) );
    
    // drawItem( 1, jiki.x+(6<<8), jiki.y+(6<<8) );
}

// 情報の処理
function putInfo(){
    // 自機の範囲　0　〜　FIELD_W
    // カメラの範囲 0　〜　（FIELD_W - SCREEN_W）
    camera_x = Math.floor((jiki.x>>8)/FIELD_W * (FIELD_W-SCREEN_W));
    camera_y = Math.floor((jiki.y>>8)/FIELD_H * (FIELD_H-SCREEN_H));

    // ボスのHPを表示する
    if( bossHP > 0 )
    {
        let sz = (SCREEN_W-20) * bossHP/bossMHP;
        let sz2 = (SCREEN_W-20)
        vcon.fillStyle = "rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x+10, camera_y+10,sz,10);
        vcon.strokeStyle = "rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x+10, camera_y+10,sz2,10);
    }

    // 自機のHPを表示する
    if( jiki.hp > 0 )
    {
        let sz = (SCREEN_W-20) * jiki.hp/jiki.mhp;
        let sz2 = (SCREEN_W-20)
        vcon.fillStyle = "rgba(0,0,255,0.5)";
        vcon.fillRect(camera_x+10, camera_y+SCREEN_H-14,sz,10);
        vcon.strokeStyle = "rgba(0,0,255,0.9)";
        vcon.strokeRect(camera_x+10, camera_y+SCREEN_H-14,sz2,10);
    }

    // スコア表示
    vcon.fillStyle = "white";
    vcon.fillText( "SCORE "+score, camera_x+10, camera_y+14 );

    // 仮想画面から実際のキャンバスにコピー
    con.drawImage( vcan, camera_x,camera_y,SCREEN_W,SCREEN_H, 0,0,CANVAS_W,CANVAS_H);

    if( gameOver ){
        con.font = "20px 'Impact'";
        con.fillStyle = "white";    
        let s = "GAME OVER";
        let w = con.measureText(s).width;
        let x = CANVAS_W/2 - w/2;
        let y = CANVAS_H/2 - 20 + 20;
        con.fillText(s,x,y);
        con.font = "20px 'Impact'";
        con.fillStyle = "white";    
        s = "Push 'R' key to restart !";
        w = con.measureText(s).width;
        x = CANVAS_W/2 - w/2;
        y = CANVAS_H/2 - 20;
        con.fillText(s,x,y);
    }

    

    if( DEBUG ){
        drawCount++;
        if( lastTime +1000 <= Date.now() ){
            fps = drawCount;
            drawCount = 0;
            lastTime = Date.now();
        }

        con.font = "20px 'Impact'";
        con.fillStyle = "white";
        con.fillText( "FPS: " + fps, 20,20 );
        con.fillText( "Tama: " + tama.length, 20,40 );
        con.fillText( "Teki: " + teki.length, 20,60 );
        con.fillText( "Teta: " + teta.length, 20,80 );
        con.fillText( "Expl: " + expl.length, 20,100 );
        con.fillText( "X: " + (jiki.x>>8), 20,120 );
        con.fillText( "Y: " + (jiki.y>>8), 20,140 );
        con.fillText( "HP: " + jiki.hp, 20,160 );
        con.fillText( "SCORE: " + score, 20,180 );
        con.fillText( "COUNT: " + gameCount, 20,200 );
        con.fillText( "WAVE: " + gameWave, 20,220 );
        con.fillText( "Strong Time: " + jiki.stCount, 20,240 );
    }

}

// ゲーム構成をするためのカウント
let gameCount   = 0;
let gameWave    = 0;

// 何秒ごとにステージを変えるか
let timer = 20;

let starSpeed   = 100;
let starSpeedReq = 100;

// ゲームループ
function gameLoop()
{
    gameCount++;
    if ( starSpeedReq > starSpeed ) starSpeed++;
    if ( starSpeedReq < starSpeed ) starSpeed--;

    if ( gameWave == 0 )
    {
        if( rand(0,15)==1 )
        {
            teki.push( new Teki( 0,rand(0,FIELD_W)<<8, 0,0,rand(300,1200)))
        }
        if ( gameCount > 60*timer )
        {
            gameWave++;
            gameCount = 0;
            starSpeedReq = 200;
        }
    }
    else if ( gameWave == 1 )
    {
        if( rand(0,15)==1 )
        {
            teki.push( new Teki( 1,rand(0,FIELD_W)<<8, 0,0,rand(300,1200)))
        }
        if ( gameCount > 60*timer )
        {
            gameWave++;
            gameCount = 0;
            starSpeedReq = 100;
        }
    }
    else if ( gameWave == 2 )
    {
        if( rand(0,10)==1 )
        {
            let tekiType = rand(0, 1);
            teki.push( new Teki( tekiType,rand(0,FIELD_W)<<8, 0,0,rand(300,1200)))
        }
        if ( gameCount > 60*timer )
        {
            gameWave++;
            gameCount = 0;
            teki.push( new Teki(2, (FIELD_W/2)<<8, -(70<<8),0, 200));
            starSpeedReq = 600;
        }
    }
    else if ( gameWave == 3 )
    {
        if ( teki.length == 0 )
        {
            gameWave = 0;
            gameCount = 0;
            starSpeedReq = 100;
        }
    }

    
    updateAll();
    drawAll();


    putInfo();


}

// オンロードでゲーム開始
window.onload = function(){
    gameInit();
    // teki.push( new Teki(2, (FIELD_W/2)<<8, 0,0,200 ) );
}