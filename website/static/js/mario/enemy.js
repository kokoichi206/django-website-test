//
// 敵のクラス
// クリボーは 96
// 雲のやつは 121,137
const ENEMY_KURIBO   = 1;
const ENEMY_TOGE     = 2;
const ENEMY_KUMO     = 4;
const ENEMY_KAME     = 8;
const ENEMY_BOSS     = 16;


class Enemy extends Sprite{
    constructor(sp, x, y, vx, vy, tp){
        super(sp, x, y, vx, vy);
        if ( tp == undefined ) tp = ENEMY_KURIBO;
        this.tp = tp;   // アイテムの種類（type）を表す数字。

        this.die = 0;   // やられた判定、おじさんに倒されたら true
        this.prepare = 0;   // 雲のキャラが、敵を出す準備に使うカウンター
    }

    // 床の判定
    checkFloor(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if ( field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){
            this.vy     = 0;
            this.y      = ((((ly+15)>>4)<<4)-16)<<4;
        }
    }

    // 横から当たったかの判定
    // 壁、床の順に判定にした（変えた）けどオッケ？
    checkWall(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if ( field.isBlock(lx+15, ly+3) || 
            field.isBlock(lx+15, ly+12) ||
            field.isBlock(lx, ly+3) ||
            field.isBlock(lx, ly+12) ){
            this.vx     *= -1;
            // console.log('rev');
        }
    }


    // クリボーの処理, checkSideHit
    proc_kuribo(){
        // 1つ目の if はおじさんがやられた判定。
        if ( this.checkSideHit( ojisan ) ){
            // ojisanとヒットした時にぶつかったら1つ小さくなる
            if ( ojisan.type == 1 ){
                isAlive = false;
                return;
            } else if ( ojisan.type > 1 ) {
                ojisan.LoseKinoko = 1;
                // this.kill = true;
            }
            this.kill = true;
            return true;
        } else if ( this.checkTopHit( ojisan ) ){
            this.die = 1;
            ojisan.killEnemy = 1;
            // console.log('top hit');
            return true;
        }

        // 16ピクセルなので、16未満なら上に上がっていく
        // 早かったから、32. 3 にした
        if ( ++this.count <= 32 ){
            this.sz = (1+this.count)>>1;
            this.y -= 1<<3;
            // if ( this.count == 32 ) this.vx = 24;
            return true;
        }
        return false;
    }

    // 雲に乗ってる敵の処理
    proc_kumo(){
        // 雲とおじさんの距離が近くなったら、とげの敵を放る
        // console.log(ojisan.x-this.x);
        if ( Math.abs(ojisan.x-this.x) < 600 ){
            this.prepare = 1;
            this.ay = 16;
        } else if ( ojisan.x > this.x ){
            this.vx = 16;
            this.sp = 137;
            this.prepare = 0;
        } else {
            this.vx = -16;
            this.sp = 169;
            this.prepare = 0;
        }
    }

    // 雲の敵が投げた、とげの亀の処理
    proc_toge(){
        if ( this.vx > 0 ) {
            this.sp = 106;
        } else if (this.vx < 0 ) {
            this.sp = 122;
        } 
        if ( this.checkHit( ojisan ) ){
            // ojisanとヒットした時にぶつかったら1つ小さくなる
            if ( ojisan.type == 1 ){
                isAlive = false;
                return;
            } else if ( ojisan.type > 1 ) {
                ojisan.LoseKinoko = 1;
                // this.kill = true;
            }
            this.kill = true;
            return true;
        }
    }

    // 更新処理
    update(){
        if (this.kill) return;

        // キノコを取っているエフェクトの時は、世界が止まる
        if ( ojisan.kinoko ) return;
        if ( ojisan.LoseKinoko ) return;

        if ( this.die ){
            let snum = (this.die>>2)%3 + 96;   // sprite num,,4フレームで１個増える
            // this.h = this.snum==32?16:32;
            this.sp = snum;

            if ( ++this.die == 40 ) {
                this.die = 0;
                this.kill = true;
                ojisan.killEnemy = 0;
            }
            // ビヨビヨってなる時は動けないので、動かずリターン
            return;
        }


        if ( this.prepare ){
            this.sp = 121;

            let dir = (ojisan.x > this.x)? +1:-1;
            // 一定時間待って、敵をほおる
            if ( ++this.prepare == 200 ) {
                // 最終的に（一定時間たっても）距離が近いまんまだったら、
                // 敵を投げる
                if ( Math.abs(this.x-ojisan.x) < 600 ){
                    this.prepare = 0;
                    // let x = ( field.scx + this.x>>4 )>>4
                    // let y = ( field.scy + this.y>>4 )>>4
                    let x = ( this.x>>4 )>>4
                    let y = ( this.y>>4 )>>4                   
                    enemy.push(
                        new Enemy(105, x, y, 8*dir, -32, ENEMY_TOGE));
                    this.sp = 137;
                } else {
                    this.prepare = 0;
                }
            }
            if ( this.prepare > 120 ){
                this.sp = 153 - 16 * dir;
            } 
            return;
        }    

        // // キノコを取っているエフェクトの時は、世界が止まる
        // if ( ojisan.kinoko ) return;

        switch ( this.tp ) {
            case ENEMY_KURIBO:
                this.proc_kuribo();
                break;
        
            case ENEMY_KUMO:
                this.proc_kumo();
                this.x += this.vx;
                if ( (this.y>>4) > FIELD_SIZE_H*16 ) this.kill = true;
                return;
            
            case ENEMY_TOGE:
                this.proc_toge();
                break;
        }

 
        this.checkFloor();
        this.checkWall();

        super.update();
    }

    draw(){
        // 雲のやつは縦が32やから、draw()を変える？
        if ( this.sp == 137 || this.sp == 169 ){
            // draw
            this.ay = 0;
            let an = this.sp;
            let sx = (an&15)<<4;
            let sy = (an>>4)<<4;
    
            let px = (this.x>>4) - (field.scx);
            let py = (this.y>>4 + this.ay) - (field.scy);
            vcon.drawImage(chImg, sx,sy,16,32, px,py,16,32);
        } else if (this.sp == 121) {
            this.ay = 16;
            super.draw();
        } else {
            super.draw();
        }
        
    }
}