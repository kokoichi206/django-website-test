//
// 敵のクラス
// クリボーは 96
//
const ENEMY_KURIBO   = 1;
const ENEMY_KAME     = 2;
const ENEMY_KUMO     = 4;
const ENEMY_BOSS     = 8;


class Enemy extends Sprite{
    constructor(sp, x, y, vx, vy, tp){
        super(sp, x, y, vx, vy);
        if ( tp == undefined ) tp = ENEMY_KURIBO;
        this.tp = tp;   // アイテムの種類（type）を表す数字。

        this.die = 0;   // やられた判定、おじさんに倒されたら true
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

        // // キノコを取っているエフェクトの時は、世界が止まる
        // if ( ojisan.kinoko ) return;

        this.proc_kuribo();

        this.checkFloor();
        this.checkWall();
        super.update();
    }

    draw(){
        super.draw();
    }
}