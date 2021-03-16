// let TUG = TUG || {}
var TUG = TUG || {}


TUG.mCurrentFrame = 0;      // 経過フレーム数
TUG.mFPS = 60;              // フレームレート


TUG.onTimer = function()
{

}

TUG.init = function()
{
    // これだと、環境によって速度が異なってしまう。
    requestAnimationFrame( TUG.wmTimer );
    // setInterval( function(){ TUG.wmTimer() }, 33);
}

TUG.wmTimer = function()
{
    if( !TUG.mCurrentStart )   // 初回呼出時
    {
        TUG.mCurrentStart = performance.now();  // 開始時刻を設定
    }

    let d = Math.floor( (performance.now() - TUG.mCurrentStart) * TUG.mFPS / 1000 );
    // console.log(d);
    if( d > 0 )
    {
        TUG.onTimer( d );
        // FPS制御
        TUG.mCurrentFrame += d;     // 60FPS以上のものにも対応する
    }
    
    requestAnimationFrame( TUG.wmTimer );
}