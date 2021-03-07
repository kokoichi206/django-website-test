//
// キノコとかアイテムのクラス
// ファイヤー状態で出せる火もここに入れた 112 が火。
// ここに入れると紛らわしいよな...
// 火は kill する必要ある？
//
const ITEM_KINOKO   = 1;
const ITEM_KUSA     = 2;
const ITEM_FIRE     = 4;
const ITEM_COIN     = 8;
const SPARKS        = 16;
const ITEM_STAR     = 32;

const FIRE_SPEED = 64;

class Item extends Sprite{
    constructor(sp, x, y, vx, vy, tp){
        super(sp, x, y, vx, vy);
        if ( tp == undefined ) tp = ITEM_KINOKO;
        this.tp = tp;   // アイテムの種類（type）を表す数字。
    }

    // 横の壁の判定
    checkWall(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if ( field.isBlock(lx+15, ly+3) || 
            field.isBlock(lx+15, ly+12) ||
            field.isBlock(lx, ly+3) ||
            field.isBlock(lx, ly+12) ){
            this.vx     *= -1;
        }
    }

    // 床の判定
    checkFloor(){
        if( this.vy<=0 ) return;

        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);

        if ( this.tp == SPARKS ){
            if ( field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){
                this.vy     *= -1;
                this.y      = ((((ly+15)>>4)<<4)-16)<<4;
            }            
        } else {
            if ( field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){
                this.vy     = 0;
                this.y      = ((((ly+15)>>4)<<4)-16)<<4;
            }
        }
    }



    // キノコの処理
    proc_kinoko(){
        if ( this.checkHit( ojisan ) ){
            // ojisan.
            ojisan.kinoko = 1;
            this.kill = true;
            return true;
        }

        // 16ピクセルなので、16未満なら上に上がっていく
        // 早かったから、32. 3 にした
        if ( ++this.count <= 32 ){
            this.sz = (1+this.count)>>1;
            this.y -= 1<<3;
            if ( this.count == 32 ) this.vx = 24;
            return true;
        }
        return false;
    }

    // 草の処理
    proc_kusa(){
        if ( this.y > 0 ){
            this.count++;
            if ( this.count < 16 ) this.sz = this.count;    // 少しずつ出ていく感じを出している
            else this.sz = 16;
            this.y -= 1<<4;     // 4bit, 毎フレーム１ピクセル上に登っていく
        }
    }

    // ファイヤーの処理
    proc_fire(){
        if ( this.checkHit( ojisan ) ){
            // ojisan.
            ojisan.kinoko = 1;
            ojisan.fire = 1;
            this.kill = true;
            return true;
        }

        // 16ピクセルなので、16未満なら上に上がっていく
        // 早かったから、32. 3 にした
        if ( ++this.count <= 32 ){
            this.sz = (1+this.count)>>1;
            this.y -= 1<<3;
            if ( this.count == 32 ) this.vx = 24;
            return true;
        }
        return false;
    }
    
    // コインの処理
    proc_coin(){
        if ( ++this.count <= 32 ){
            this.sz = (1+this.count)>>1;
            this.y -= 1<<3;
            if ( this.count == 32 ) {
                gotCoins += 1;
                this.kill=true;
            }
            return true;
        }
        return false;
    }

    // 火の粉の処理
    proc_sparks(){
        // if ( this.checkHit( ojisan ) ){
        //     // ojisan.
        //     ojisan.kinoko = 1;
        //     this.kill = true;
        //     return true;
        // }

        // 16ピクセルなので、16未満なら上に上がっていく
        // 早かったから、32. 3 にした
        if ( ++this.count <= 2 ){
            // this.sz = (1+this.count)>>1;
            // this.y -= 1<<3;
            let dir = ojisan.dirc?-1:1;
            if ( this.count == 2 ) this.vx = dir * FIRE_SPEED;
            return true;
        }
        return false;
        // this.vx = 24;
        // this.
    }

    // 更新処理
    update(){
        if (this.kill) return;

        // キノコを取っているエフェクトの時は、世界が止まる
        if ( ojisan.kinoko ) return;
        if ( ojisan.LoseKinoko ) return;

        switch(this.tp){
            case ITEM_KINOKO:
                if ( this.proc_kinoko() ) return;
                break;
            case ITEM_KUSA:
                this.proc_kusa();
                return;
            case ITEM_FIRE:
                this.proc_fire();
                return;
            case ITEM_COIN:
                this.proc_coin();
                return;
            case SPARKS:
                this.proc_sparks();
                // this.vx = 24;
                break;
        }

        this.checkWall();
        this.checkFloor();
        super.update();
    }

    draw(){
        super.draw();
        if ( this.tp == ITEM_KUSA){
            let c = (this.count-16)>>4; // 茎が何個必要か、のカウント
            for ( let i=0; i<=c; i++){
                let an = 486 + 16;
                let sx = (an&15)<<4;
                let sy = (an>>4)<<4;
        
                let px = (this.x>>4) - (field.scx);
                let py = (this.y>>4) - (field.scy);
                let s;
                if (i==c) s = (this.count%16);
                else s = 16;
                py += 16 + i * 16
                vcon.drawImage(chImg, sx,sy,16,16, px,py,16,s);
            }
        }
    }
}