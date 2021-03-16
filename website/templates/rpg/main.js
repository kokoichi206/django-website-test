
const CHRHEIGHT = 9;
const CHRWIDTH = 8;
const FONT      = "10px monospace";
const FONTSTYLE = "#ffffff"         // 文字色
const HEIGHT    = 120;
const WIDTH     = 128;
const INTERVAL = 33;        // フレーム呼び出し間隔
const MAP_WIDTH = 32;
const MAP_HEIGHT = 32;
const SCR_WIDTH = 8;
const SCR_HEIGHT = 8;
const SCROLL    = 1;        // スクロール速度
const SMOOTH    = false;
const START_HP  = 20;       //
const START_X   = 15;       // 開始位置
const START_Y   = 17;
const TILECOLUMN = 4;
const TILEROW   = 4;
const TILESIZE  = 8;
const WNDSTYLE = "rgba(0, 0, 0, 0.75)"; // ウィンドウの色

const gKey = new Uint8Array( 0x100 )    // キー入力バッファ

let gAngle = 0;     // プレイヤーの向き
let gCursor = 0;
let gEnemyHP;
let gEnemyType;     // 敵種別
let gEx = 0;        // プレイヤーの経験値
let gHP = START_HP; // プレイヤーのHP
let gMHP = START_HP; // プレイヤーの最大HP
let gOver;           // どっちが先攻かを決めるパラメタ
let gLv = 1;        // プレイヤーのレベル
let gScreen;    // 仮想画面
let gFrame = 0; // 内部カウンタ
let gItem = 0;  // 所持アイテム
let gPhase = 0;
let gImgBoss;
let gImgMap;
let gImgPlayer;
let gImgMonster;
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;
let gMessage1 = null;
let gMessage2 = null;

let gWidth;     // 実画面のサイズ
let gHeight;
let gMoveX = 0; // 移動量X
let gMoveY = 0; // 移動量Y

const gFileBoss = "boss.png";
const gFileMap = "map.png";
const gFilePlayer = "player.png";   // 透過pngなので自分で何か処理をする必要がない
const gFileMonster = "monster.png";

// 敵エンカウント確率
const gEncounter = [ 0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0];

const gMonsterName = ["スライム", "うさぎ", "ナイト", "ドラゴン", "魔王"]

// map
const gMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
    0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
    7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
   ];
   

// 戦闘画面描写
function drawFight( g ){
    g.fillStyle = "#000000";            // 背景色、黒
    g.fillRect( 0, 0, WIDTH, HEIGHT);

    if( gPhase <= 5 )    // 敵が生存している場合
    {
        if( IsBoss() ){   // ラスボスの場合
            g.drawImage( gImgBoss, WIDTH/2-gImgBoss.width, HEIGHT/2-gImgBoss.height/2);
        } else {
            let w = gImgMonster.width / 4;
            let h = gImgMonster.height;
            
            g.drawImage( gImgMonster, gEnemyType*w,0,w,h,
                Math.floor(WIDTH/2-w/2),Math.floor(HEIGHT/2-h/2),w,h );    
        }
    }

    drawMessage( g );
    drawStatus( g );

    if( gPhase == 2 )
    {
        g.fillText("👉", 6, 96 + 14 * gCursor);
    }
}

// マップ描画処理
function drawMap( g )
{
    let mx = Math.floor(gPlayerX/TILESIZE);         // プレイヤーのタイル座標X
    let my = Math.floor(gPlayerY/TILESIZE);         // プレイヤーのタイル座標Y

    for( let dy=-SCR_HEIGHT; dy<=SCR_HEIGHT; dy++){
        let ty = my + dy;                           // タイル座標Y
        let py = (ty + MAP_HEIGHT) % MAP_HEIGHT;    // ループ後タイル座標Y
        for( let dx=-SCR_WIDTH; dx<=SCR_WIDTH; dx++){
            let tx = mx + dx;                       // タイル座標X
            let px = (tx + MAP_WIDTH) % MAP_WIDTH;  // ループ後タイル座標X
            

            DrawTile( g,
                // x*TILESIZE,
                // ( tx + 8 -mx) * TILESIZE,
                tx * TILESIZE + WIDTH / 2 - gPlayerX,
                // ty * TILESIZE + 7 * TILESIZE - gPlayerY,
                ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                gMap[ py*MAP_WIDTH + px ]);
        }
    }

    // // ドットの調整を分かりやすくするための赤い線
    // g.fillStyle = "#ff0000";
    // g.fillRect( 0, HEIGHT/2 - 1, WIDTH, 2);
    // g.fillRect( WIDTH/2 - 1, 0, 2, HEIGHT);


    // プレイヤー
    g.drawImage( gImgPlayer,
        ( gFrame >> 3 & 1 ) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT, 
        WIDTH/2-CHRWIDTH/2, HEIGHT/2-CHRHEIGHT+TILESIZE/2, CHRWIDTH, CHRHEIGHT );

    // ステータスウィンドウ
    g.fillStyle = WNDSTYLE;
    g.fillRect( 2, 2, 44, 37);

    drawMessage( g );
    drawStatus( g );
}

function DrawMain()
{
    const g = gScreen.getContext("2d");

    if( gPhase <= 1 ){
        drawMap( g );                   // フィールド画面描画
    } else {
        drawFight( g );
    }
    


    // g.fillStyle = WNDSTYLE;
    // g.fillRect( 20, 3, 105, 15);

    // g.font = FONT;
    // g.fillStyle = FONTSTYLE;
    // g.fillText("x=" + gPlayerX+" y="+gPlayerY+" m="+gMap[ my*MAP_WIDTH+mx], 25, 15);
}

// メッセージ描画
function drawMessage( g )
{
    if ( !gMessage1  ){
        return;
    }

    g.fillStyle = WNDSTYLE;
    g.fillRect( 4, 84, 120, 30);

    g.font = FONT;
    g.fillStyle = FONTSTYLE;


    g.fillText( gMessage1, 6, 96 );
    if ( gMessage2 ) g.fillText( gMessage2, 6, 110 );
}

// ステータス描画
function drawStatus( g )
{
    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "Lv ", 4, 12 ); DrawTextR( g, gLv, 36, 13);
    g.fillText( "HP ", 4, 25 ); DrawTextR( g, gHP, 36, 25);
    g.fillText( "Ex ", 4, 37 ); DrawTextR( g, gEx, 36, 37);
}

function DrawTextR( g,str, x, y)
{
    g.textAlign = "right";
    g.fillText( str, x, y );
    g.textAlign = "left";
}

function DrawTile(g, x,y, idx)
{
    const ix = (idx % TILECOLUMN ) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN ) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y,TILESIZE,TILESIZE);
}

// aは攻撃力
function GetDamage( a )
{   // 攻撃力の１−２倍のダメージをランダムで
    return( Math.floor( a * ( 1 + Math.random() )));
}

function IsBoss()
{
    return ( gEnemyType == gMonsterName.length - 1 );
}

function LoadImage()
{
    gImgBoss = new Image();
    gImgBoss.src = gFileBoss;
    gImgMap = new Image();
    gImgMap.src = gFileMap;
    gImgMonster = new Image();
    gImgMonster.src = gFileMonster;
    gImgPlayer = new Image();
    gImgPlayer.src = gFilePlayer;
}


// function SetMessage( v1, v2 = null)  // IE非対応
function SetMessage( v1, v2 = null )
{
    gMessage1 = v1;
    gMessage2 = v2;
}

// フィールド進行処理
function TickField() 
{
    if( gPhase != 0 ){
        return;
    }

    if ( gMoveX != 0 || gMoveY != 0 || gMessage1 ){}         // 移動中またはメッセージ表示中の場合
    else if( gKey[ 37 ] ){ gAngle = 1; gMoveX = -TILESIZE }  // 左
    else if( gKey[ 38 ] ){ gAngle = 3; gMoveY = -TILESIZE }   // 上
    else if( gKey[ 39 ] ){ gAngle = 2; gMoveX = TILESIZE }    // 右
    else if( gKey[ 40 ] ){ gAngle = 0; gMoveY = TILESIZE }    // 下

    // 移動後のタイル座標判定
    let mx = Math.floor( ( gPlayerX + gMoveX ) / TILESIZE ); // 移動後のタイル座標X
    let my = Math.floor( ( gPlayerY + gMoveY ) / TILESIZE ); // 移動後のタイル座標X
    mx += MAP_WIDTH;                                        // マップループ処理
    mx %= MAP_WIDTH;                                        // マップループ処理
    my += MAP_HEIGHT;                                       // マップループ処理
    my %= MAP_HEIGHT;                                       // マップループ処理
    let m = gMap[ my * MAP_WIDTH + mx ];                    // タイル番号
    if( m < 3 )                                             // 侵入不可の地形の場合
    {
        gMoveX = 0;
        gMoveY = 0;
    }

    if( Math.abs( gMoveX ) + Math.abs( gMoveY ) == SCROLL ) // マス目移動が終わる直前
    {
        if( m == 8|| m == 9 ){              // お城
            gHP = gMHP;
            SetMessage("魔王を倒して", null);
        }
        if( m == 10 || m == 11 ){           // 街
            gHP = gMHP;
            SetMessage("西の果てにも", "村があります");
        }
        if( m == 12 ){           // 村
            gHP = gMHP;
            SetMessage("カギは、", "洞窟にあります");
        }
        if( m == 13 ){           // 洞窟
            gItem = 1;
            SetMessage("カギを手に入れた", null);
        }
        if( m == 14 ){           // 扉
            if( gItem == 0 ){
                gPlayerY -= TILESIZE;
                SetMessage("鍵が必要です", null);
            }
            else{
                SetMessage("扉が開いた", null);
            }
        }
        if( m == 15 ){           // 魔王
            AppearEnemy( gMonsterName.length - 1 );
        }

        if( Math.random() * 8 < gEncounter[ m ] ){  // ランダムエンカウント
            // 自分のスタート位置からのマンハッタン距離に応じて敵の強さを変える
            let t = Math.abs( gPlayerX / TILESIZE - START_X ) +
                    Math.abs( gPlayerY / TILESIZE - START_Y);
            if( m == 6 )    // マップが林だった場合
            {
                t += 8;
            }
            if( m == 7 )
            {
                t += 16;
            }
            t += Math.random() * 8;     // 敵レベルを0-0.5上昇
            t = Math.floor( t / 16 );
            t = Math.min( t, gMonsterName.length - 2 ); // 上限処理
            AppearEnemy( t )     // 敵出現フェーズ
        }
    }


    gPlayerX += Math.sign(gMoveX) * SCROLL;              // プレイヤー座標移動X
    gPlayerY += Math.sign(gMoveY) * SCROLL;              // プレイヤー座標移動Y
    gMoveX -= Math.sign( gMoveX ) * SCROLL;
    gMoveY -= Math.sign( gMoveY ) * SCROLL;

    // マップループ処理
    gPlayerX += (MAP_WIDTH * TILESIZE);
    gPlayerX %= (MAP_WIDTH * TILESIZE);
    gPlayerY += (MAP_HEIGHT * TILESIZE);
    gPlayerY %= (MAP_HEIGHT * TILESIZE);
}

function WmPaint()
{
    DrawMain();
    
    const ca = document.getElementById("main");
    const g = ca.getContext("2d");

    g.drawImage( gScreen,0,0, gScreen.width, gScreen.height, 0,0,gWidth,gHeight);
}

// ブラウザサイズ変更イベント
function WmSize()
{
    const ca = document.getElementById("main");
    // ブラウザの幅いっぱいに描画
    ca.width = window.innerWidth;
    ca.height = window.innerHeight;

    const g = gScreen.getContext("2d");
    g.imageSmoothingEnabled = g.msimageSmoothingEnabled = SMOOTH; // 補完処理

    // 実画面サイズを計測
    gWidth = ca.width;
    gHeight = ca.height;
    if( gWidth/WIDTH < gHeight/HEIGHT ){ // 縦長の画面
        gHeight = gWidth * HEIGHT / WIDTH;
    } else {
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}

// タイマーイベント発生時の処理
TUG.onTimer = function( d )
{
    if( !gMessage1 )
    {
        while( d-- ){
            gFrame++;
            TickField();
        }
    }
    WmPaint();
}

function AddExp( val )
{
    gEx += val;
    while( gLv * ( gLv + 1 ) * 2 <= gEx )           // この式はなんとなく 
    {                      // while文だと、一気に複数のレベルも上げられる
        gLv++;                                      // レベルアップ
        gMHP += 4 + Math.floor(Math.random() * 3);  // MaxHP上昇4-6
    }
}

// 敵出現処理
function AppearEnemy( t )
{
    gPhase = 1;
    gEnemyHP = t * 3 + 5;   // 敵
    gEnemyType = t;
    SetMessage("敵が現れた！");
}

function Action()
{
    gPhase++;

    // 敵の行動の場合、オーダーが
    if( ( ( gPhase + gOrder ) & 1 ) == 0 ){     // 敵の行動順の場合
        // ダメージの算出式、今は Type + 2 にした
        const d = GetDamage( gEnemyType + 2 );  // 引数に攻撃力
        SetMessage( gMonsterName[ gEnemyType ] + "の攻撃！", d + "のダメージ!");
        gHP -= d;
        if( gHP <= 0 ){
            gPhase = 7;     // 死亡フェーズ
        }
        return;
    }

    // プレイヤーの行動順
    if( gCursor == 0 ){         // 戦闘モード選択時
        // 今は攻撃力を Lv+1 にした
        const d = GetDamage( gLv + 1 ); // ダメージ計算結果取得
        SetMessage("あなたの攻撃",  d  + "のダメージ!");
        gEnemyHP -= d;
        if( gEnemyHP <= 0 ){
            // console.log(gEnemyHP);
            gPhase = 5;
        }
        return;
    }

    if( Math.random() < 0.5 ){      // 逃げる、成功時
        SetMessage("あなたは逃げ出した", null);
        gPhase = 6;
        return;
    }
    // 逃げる失敗時
    SetMessage("あなたは逃げ出した", "しかし回り込まれた!");

}

// 戦闘コマンド
function CommandFight()
{
    gCursor = 0;
    gPhase = 2;         // 戦闘コマンド選択フェーズ
    SetMessage("　　　　　 闘う：", "　　　　　 逃げる：");
}

// キー入力（DOWN)イベント
// 37とかはマジックナンバーを使うしかない？
window.onkeydown = function( ev )
{
    let c = ev.keyCode;

    if( gKey[ c ] != 0 ){   // すでに押下中の場合（キーリピート）
        return;
    }
    gKey[ c ] = 1;
    
    if( gPhase == 1 ){      // 敵が現れた場合
        CommandFight();
        return;
    }
    if( gPhase == 2 ){      // 戦闘コマンド選択の場合
        if( c == 13 || c == 90 ){
            gOrder = Math.floor( Math.random() * 2 ); // 戦闘行動順
            Action();
        } else {
            gCursor = 1 - gCursor;
        }
        return;
    }
    if( gPhase == 3 ){
        Action();
        return;
    }
    if( gPhase == 4 ){
        CommandFight();
        return;
    }
    if( gPhase == 5){
        gPhase = 6;
        AddExp( gEnemyType + 1 );
        SetMessage("敵をやっつけた", null);
        return;
    }
    if( gPhase == 6)
    {
        if( IsBoss() && gCursor == 0 )  // 敵がボス、かつ戦う選択時
        {
            SetMessage("魔王を倒し", "世界に平和が訪れた");
            return;
        }
        gPhase = 0;
    }
    if( gPhase == 7){
        gPhase = 8;
        SetMessage("あなたは死亡した", null);
        return;
    }
    if( gPhase == 8){
        SetMessage("ゲームオーバー", null);
        return;
    }

    gMessage1 = null;
    gMessage2 = null;
    

}

window.onkeyup = function( ev )
{
    let c = ev.keyCode;
    gKey[ c ] = 0;
}

window.onload = function()
{
    LoadImage();

    gScreen = document.createElement("canvas");
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;
    // サイズ変更は一回でいいかもしれないが、途中でブラウザのサイズが変わったら？
    WmSize();   // 画面サイズ初期化
    window.addEventListener("resize", function(){ WmSize() } )
    TUG.init();
}