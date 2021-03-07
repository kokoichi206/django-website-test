//
// おじさんクラス
// water 中では何回もジャンプボタン使える
// 

const ANIME_STAND       = 1;
const ANIME_WALK        = 2;
const ANIME_BRAKE       = 4;
const ANIME_JUMP        = 8;

const GRAVITY           = 4;
const WATER_RESISTENCE  = 2;

const MAX_SPEED_NORMAL  = 32;

const TYPE_MINI = 1;
const TYPE_BIG  = 2;
const TYPE_FIRE = 4;

let MAX_SPEED = MAX_SPEED_NORMAL;

class Ojisan{
    constructor(x, y){
        // this.x      = x<<4;
        // this.y      = y<<4;
        this.x = x<<4;
        this.y = y<<4;
        this.ay     = 16;   // 上の空白のます、小さい時16
        this.w      = 16;
        this.h      = 16;
        this.vx     = 0;
        this.vy     = 0;
        this.anim   = 0;
        this.snum   = 0;    // sprite num
        this.acou   = 0;
        this.dirc   = 0;
        this.jump   = 0;

        this.isInWater = 0;

        this.kinoko = 0;
        this.LoseKinoko = 0;    // ちっちゃくなる時の処理用
        this.killEnemy = 0;
        this.fire = 0;  // fireかどうかの判定、そうならsnum + ??
        this.type = TYPE_MINI;

        this.ItemCount = 3;     // なんとなく作った、これでアイテムを出し分ける
    }

    // 水の中にいるかチェック
    // 水のfieldは 392 or 408
    checkWater(){
        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if (field.isWater(lx, ly)){
            this.isInWater = 1;
        } else {
            this.isInWater = 0;
        }
    }

    // 左端の判定
    checkLeft(){
        if ( this.vx >= 0 ) return;

        if ( (this.x>>4) < field.scx ){
            this.vx = 0;
            // this.x = field.scx+5;
        }
    }

    // 床の判定
    checkFloor(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        // ちっちゃいおじさんの時はそれほどギリギリまでは立てなくする
        let p = this.type==TYPE_MINI?2:0;

        if ( field.isBlock(lx+1+p, ly+31) || field.isBlock(lx+14-p, ly+31)){
            if ( this.anim == ANIME_JUMP ) this.anim = ANIME_WALK;
            this.jump   = 0;
            this.vy     = 0;
            this.y      = ((((ly+31)>>4)<<4)-32)<<4;
        }
    }

    // 天井の判定
    checkCeil(){
        // 下に進んでいるときは判定しない
        if( this.vy>=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        let ly2 = ly + (this.type==TYPE_MINI?21:5)
        // 中心だけの1点でいいかな
        let bl;
        if ( bl = field.isBlock(lx+8, ly2) ){
            this.jump   = 15; // 強制的にめり込むのをやめる
            this.vy     = 0;

            let x = (lx+8)>>4;
            let y = (ly2)>>4;
            if ( bl == 374 ){ //  
            }
            // else if (bl != 371){
            else if (bl == 368){
                    // ここはなんとなく。アイテムを順番に出したいだけ
                let itemNum = 2 ** this.ItemCount;
                let itemSpriteIndex;
                // なんかswitch使えなかった
                if (this.ItemCount == 0){ // キノコ
                    itemSpriteIndex = 218;
                } else if (this.ItemCount == 1){ // 草
                    itemSpriteIndex = 486;
                } else if (this.ItemCount == 2){ // ファイヤー
                    itemSpriteIndex = 250;
                } else if (this.ItemCount == 3){ // コイン
                    itemSpriteIndex = 384;
                }

                block.push( new Block(374, x, y) );
                item.push(
                    new Item(itemSpriteIndex, x, y, 0, 0, itemNum)
                )
                this.ItemCount = (this.ItemCount + 1)%4;

                
                // block.push( new Block(374, x, y) );
                // item.push(
                //     // new Item(218, x, y, 0, 0, ITEM_KUSA)
                //     // new Item(486, x, y, 0, 0, ITEM_KUSA)
                //     new Item(250, x, y, 0, 0, ITEM_FIRE)
                // )
            } else if (this.type == TYPE_MINI){
                block.push( new Block(bl, x, y) );
            } else { // 四方向に飛び散る処理、
                block.push( new Block(bl, x, y, 1, 20, -60 ));
                block.push( new Block(bl, x, y, 1, -20, -60 ));
                block.push( new Block(bl, x, y, 1, 20, -20 ));
                block.push( new Block(bl, x, y, 1, -20, -20 ));
            }
            

        }
    }

    // 横の壁の判定
    checkWall(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        let p = this.type==TYPE_MINI?16+8:9;

        // 右側のチェック、でっかいおじさんの時は3点でチェック
        if ( field.isBlock(lx+15, ly+p) || 
            (this.type==TYPE_BIG && (
            field.isBlock(lx+15, ly+15) ||
            field.isBlock(lx+15, ly+24))) ){
            this.vx     = 0;
            this.x     -= 8;
        }
        else if ( field.isBlock(lx, ly+p) || 
            (this.type==TYPE_BIG && (
            field.isBlock(lx, ly+15) ||
            field.isBlock(lx, ly+24) ))){
            this.vx     = 0;
            this.x     += 8;
        }
    }

    // ジャンプ処理
    updateJump(){
        // ジャンプ
        if ( keyb.ABUTTON ){
            // 水中の処理
            if ( this.isInWater ) {
                this.vy = -32;
            } else {    // 空中の処理
            // 落下している時はジャンプできない。
                if ( this.vy > 16 ) return;
                if ( this.jump == 0 ){
                    this.anim = ANIME_JUMP;
                    this.jump = 1;
                }
                // 大ジャンプの設定、あるフレーム以下の間、効果を持続
                if ( this.jump < 15 ) this.vy = -(64 - this.jump);
            }
        }
        if ( this.jump ) this.jump++;
    }

    updateWalkSub(dir){
        // Bボタン（Z）が押された時、最高速度を◯倍にする
        if ( keyb.BBUTTON ){
            MAX_SPEED = 1.5 * MAX_SPEED_NORMAL;
        } else {
            MAX_SPEED = MAX_SPEED_NORMAL;
        }
        // 最高速まで加速
        if ( dir == 0 && this.vx < MAX_SPEED ) this.vx += 1;
        if ( dir == 1 && this.vx > -MAX_SPEED ) this.vx -= 1;

        // ジャンプしてない時
        if ( !this.jump ){
            // 立ちポーズだった時はカウンタリセット
            if ( this.anim == ANIME_STAND ) this.acou = 0;
            // 歩きアニメにする
            this.anim = ANIME_WALK;
            // 方向を設定
            this.dirc = dir;
            // 逆方向の時はブレーキをかける
            if ( dir == 0 && this.vx < 0 ) this.vx += 1;
            if ( dir == 1 && this.vx > 0 ) this.vx -= 1;
            // 逆に強い加速の時はブレーキアニメ
            if ( (dir == 0 && this.vx < -8) || (dir == 1 && this.vx > 8) ){
                this.anim = ANIME_BRAKE;
            }
        }
    }

    updateWalk(){
        // 横移動
        if ( keyb.Left ){
            this.updateWalkSub(1);

        } else if ( keyb.Right ) {
            this.updateWalkSub(0);

        }else { // どっちも押されてない時
            // ジャンプ中は減速しない
            if ( !this.jump ){
                if ( this.vx > 0 ) this.vx -= 1;
                if ( this.vx < 0 ) this.vx += 1;
                if ( !this.vx ) this.anim = ANIME_STAND;
            }
        }
    }

    // スプライトを変える処理
    updateAnim(){
        // スプライトの決定
        switch(this.anim){
            case ANIME_STAND:
                this.snum = 0;
                break
            case ANIME_WALK:
                this.snum = 2 + ((this.acou/6)%3);
                break
            case ANIME_JUMP:
                this.snum = 6;
                break
            case ANIME_BRAKE:
                this.snum = 5;
                break
        }
        // ちっちゃいおじさんの時は +32
        if (this.type == TYPE_MINI) this.snum += 32;
        // 左向きの時は+48を使う
        if ( this.dirc ) this.snum += 48;
        // ファイヤーの時は
        if ( this.fire ) this.snum += 256

        if ( keyb.Squat && (this.type > 1) ) this.snum += 1;
    }

    // 毎フレーム毎の更新処理
    update(){
        // 下に落ちた時、死亡判定
        if ( this.y > 3000) isAlive = false;
        // キノコを取った時のエフェクト
        if ( this.kinoko ){
            let anim = [32, 14, 32, 14, 32, 14, 0, 32, 14, 0];
            this.snum = anim[ this.kinoko>>2 ];   // 4フレームで１個増える
            this.h = this.snum==32?16:32;
            if ( this.dirc ) this.snum += 48;

            if ( ++this.kinoko == 40 ) {
                this.kinoko = 0;
                this.type = TYPE_BIG;
                this.ay = 0;
            }
            // ビヨビヨってなる時は動けないので、動かずリターン
            return;
        }

        // キノコを失った時（敵にやられた時）のエフェクト
        if ( this.LoseKinoko ){
            let anim = [0, 14, 0, 14, 0, 14, 43, 0, 14, 32];
            this.snum = anim[ this.LoseKinoko>>2 ];   // 4フレームで１個増える
            this.h = this.snum==32?16:32;
            if ( this.dirc ) this.snum += 48;

            if ( ++this.LoseKinoko == 40 ) {
                this.LoseKinoko = 0;
                this.fire = 0;
                this.type = TYPE_MINI;
                this.ay = 16;   // 上の空白を調整
            }
            
            // ビヨビヨってなる時は動けないので、動かずリターン
            return;
        }

        // アニメ用のカウンタ
        this.acou++;
        if ( Math.abs(this.vx) == MAX_SPEED ) this.acou++;

        // 水の中かどうかでGRAVITYを変更
        this.checkWater();
        if (frameCount%50 == 0){
            console.log(GRAVITY);
        }

        this.checkLeft();
        this.updateJump();
        this.updateWalk();
        this.updateAnim();

        // 重力
        if ( this.vy < 64 ) this.vy += GRAVITY;

        let water_effect = WATER_RESISTENCE ** this.isInWater;
        this.vx /= water_effect;
        this.vy /= water_effect;

        // 横の壁のチェック
        this.checkWall();

        // 床のチェック
        this.checkFloor();

        // 床のチェック
        this.checkCeil();

        // 実際に座標を変える
        // 水中では動きは RESISTENCE だけゆっくりになる

        // console.log(this.vy);
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= water_effect;
        this.vy *= water_effect;
        // console.log(this.vy);


        // // 床にぶつかる
        // if ( this.y > 160<<4){
        //     if ( this.anim == ANIME_JUMP ) this.anim = ANIME_WALK;
        //     this.jump   = 0;
        //     this.vy     = 0;
        //     this.y      = 160<<4;
        // }
    }

    // 毎フレームごとの描画処理
    draw(){
        let px = (this.x>>4) - field.scx;
        let py = (this.y>>4) - field.scy;

        let sx = (this.snum&15)<<4;
        let sy = (this.snum>>4)<<4;

        let w = this.w;
        let h = this.h

        py += (32 - h)  // ちっちゃいおじさんの時yを+16したい

        vcon.drawImage(chImg, sx,sy,w,h, px,py,w,h);
    }
}