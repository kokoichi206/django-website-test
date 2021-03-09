//
// teki.js
//

// 敵弾クラス、Teki tama = Teta
class Teta extends CharaBase{
    constructor( sn,x,y,vx,vy, t ){
        super(sn,x,y,vx,vy);
        this.r = 3;
        if( t==undefined ) this.timer=0;
        this.timer = t;
    }

    update()
    {
        if( this.timer )
        {
            this.timer --;
            return;
        }
        super.update();

        if( !gameOver && !jiki.muteki && 
            checkHit(
            this.x,this.y,this.r,
            jiki.x,jiki.y,jiki.r))
            {
                this.kill = true;
                if( (jiki.hp -= 30)<=0 ){
                    gameOver = true;
                } else {
                    jiki.damage = 10;
                    jiki.muteki = 60;
                }
            }

        this.sn = 14 + ((this.count>>3)&1);

    }
}

// 敵クラス , 親クラスCharaBaseの中身を継承したもの
class Teki extends CharaBase{
    constructor( t, x,y, vx,vy )
    {
        super( 0, x,y, vx,vy );
        this.tnum = tekiMaster[t].tnum;
        this.r      = tekiMaster[t].r;
        this.mhp    = tekiMaster[t].hp;
        this.hp     = this.mhp;
        this.score  = tekiMaster[t].score;
        this.flag   = false;
        
        this.dir    = 90;
        this.relo   = 0;
    }

    update(){
        // 共通のアップデート
        if ( this.relo ) this.relo--;
        super.update();

        // 個別のアップデート
        tekiFunc[this.tnum](this)

        // 当たり判定
        if( !gameOver && !jiki.muteki && 
            checkHit(
            this.x,this.y,this.r,
            jiki.x,jiki.y,jiki.r))
            {
                if ( this.mhp<500 ) this.kill = true;
                
                if( (jiki.hp -= 30)<=0 ){
                    gameOver = true;
                } else {
                    jiki.damage = 10;
                    jiki.muteki = 60;
                }

            }
    }

    draw(){
        super.draw();
    }
}

// 弾を自機に向けて発射する
function tekiShot(obj, speed){
    if( gameOver ) return;

    let px = (obj.x>>8);
    let py = (obj.y>>8);

    // 「完全に」枠から出てる時のみ描画せずにリターンする
    if ( px-40 <camera_x || px+40>=camera_x+SCREEN_W
        || py-40 <camera_y || py+40>=camera_y+SCREEN_H) return;

    
    let angle, dx, dy;
    angle = Math.atan2( jiki.y-obj.y, jiki.x-obj.x);
    // ランダムに少しバラつかせる
    // angle += rand(-10,10) * Math.PI/180;

    dx = Math.cos(angle) * speed;
    dy = Math.sin(angle) * speed;

    teta.push( new Teta( 15, obj.x, obj.y, dx, dy) )
}

// ピンクのひよこの移動パターン
function tekiMove01(obj){
    if( !obj.flag ){
        if( jiki.x > obj.x && obj.vx<120 ) obj.vx += 4;
        else if( jiki.x < obj.x && obj.vx>-120 ) obj.vx -= 4;    
    }
    else{
        if( jiki.x < obj.x && obj.vx<400 ) obj.vx += 30;
        else if( jiki.x > obj.x && obj.vx>-400 ) obj.vx -= 30;    
    }

    if( Math.abs( jiki.y-obj.y ) < (100<<8) && !obj.flag ){
        obj.flag = true;
        tekiShot(obj, 600);
    }

    if( obj.flag && obj.vy>-800) obj.vy-=30;

    // スプライトの変更
    const ptn = [39,40,39,41];
    obj.sn = ptn[ (obj.count>>3)&3 ];
}

// 黄色のひよこの移動パターン
function tekiMove02(obj){
    if( !obj.flag ){
        if( jiki.x > obj.x && obj.vx<600 ) obj.vx += 30;
        else if( jiki.x < obj.x && obj.vx>-600 ) obj.vx -= 30;    
    }
    else{
        if( jiki.x < obj.x && obj.vx<600 ) obj.vx += 30;
        else if( jiki.x > obj.x && obj.vx>-600 ) obj.vx -= 30;    
    }

    if( Math.abs( jiki.y-obj.y ) < (100<<8) && !obj.flag ){
        obj.flag = true;
        tekiShot(obj, 600);
    }

    // if( obj.flag && obj.vy>-800) obj.vy-=30;
    // スプライトの変更
    const ptn = [33,34,33,35];
    obj.sn = ptn[ (obj.count>>3)&3 ];
}

// ボスひよこ（黄色）の移動パターン
function tekiMove03(obj){
    if( !obj.flag && (obj.y>>8)>=60 ) obj.flag = 1;

    // ある程度までゆっくり降りてくる
    if( obj.flag == 1 )
    {
        if( (obj.vy-=2)<0 )
        {
            obj.flag = 2;
            obj.vy = 0;
        }
    }
    // 降りた後は左右に移動
    else if( obj.flag == 2 )
    {
        if( obj.vx<300 ) obj.vx += 10;
        if( (obj.x>>8) > (FIELD_W-100) ) obj.flag = 3;
    }
    else if( obj.flag == 3 )
    {
        if( obj.vx>-300 ) obj.vx -= 10;
        if( (obj.x>>8) < 100 ) obj.flag = 2;
    }

    // 弾の発射
    // flag>1,つまり縦移動が終わってから弾を発射する
    if( obj.flag>1 )
    {
        let angle, dx, dy;
        angle = obj.dir * Math.PI/180
        dx = Math.cos(angle) * 300;
        dy = Math.sin(angle) * 300;     // 300は弾のスピード
        let x2 = (Math.cos(angle)*70)<<8    // 中心からじゃなくて、体の周りから発射するため
        let y2 = (Math.sin(angle)*70)<<8
        teta.push( new Teta( 15, obj.x+x2, obj.y+y2, dx, dy, 60) )  // １秒間たまは動けない
    
        if( (obj.dir+=12)>=360 ) obj.dir = 0;
    }

    // hpが減ってきたら、他の攻撃パターンも追加
    if( obj.hp < obj.mhp/2 )
    {
        let cnt = obj.count % (60*5);
        if( cnt/10<4 && cnt%10==0)
        {
            let angle, dx, dy;
            angle = (90+45-(cnt/10)*30) * Math.PI/180
            dx = Math.cos(angle) * 300;
            dy = Math.sin(angle) * 300;     // 300は弾のスピード
            let x2 = (Math.cos(angle)*70)<<8    // 中心からじゃなくて、体の周りから発射するため
            let y2 = (Math.sin(angle)*70)<<8
            teki.push( new Teki( 3, obj.x+x2, obj.y+y2, dx, dy) )  // １秒間たまは動けない    
        }
    }


    // スプライトの変更
    obj.sn = 75;
}

// 黄色のひよこの移動パターン
function tekiMove04(obj){
    if ( obj.count == 10 )
    {
        obj.vx = obj.vy = 0;
    }
    if ( obj.count == 60 )
    {
        if( obj.x > jiki.x ) obj.vx = -30;
        else obj.vx = 30;
        obj.vy = 100;
    }
    if ( obj.count>100 && !obj.relo )
    {
        if ( rand(0, 100) == 1 )
        {
            tekiShot(obj, 300);
            obj.relo = 200;
        }
    }

    // if( obj.flag && obj.vy>-800) obj.vy-=30;
    // スプライトの変更
    const ptn = [33,34,33,35];
    obj.sn = ptn[ (obj.count>>3)&3 ];
}

let tekiFunc = [
    tekiMove01,
    tekiMove02,
    tekiMove03,
    tekiMove04,
];