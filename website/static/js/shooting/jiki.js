//
// jiki.js
//
// 弾クラス
class Tama extends CharaBase{
    constructor( x,y, vx,vy ){
        super( 6, x,y, vx,vy );
        // this.w = 4;
        // this.h = 6;
        this.r = 4; // 4 pixel
        this.power = 10;
    }

    update(){
        super.update();

        for( let i=0; i<teki.length; i++ ){
            if( !teki[i].kill ){
                if( checkHit(
                    this.x,this.y,this.r,
                    teki[i].x,teki[i].y,teki[i].r
                )){
                    this.kill = true;
                    if( (teki[i].hp -= this.power)<=0 ){
                        teki[i].kill = true;
                        ItemDrop(teki[i]);
                        explosion( 
                            teki[i].x, teki[i].y,
                            teki[i].vx>>3, teki[i].vy>>3);
                        score += teki[i].score;
                    } else {
                        expl.push( new Expload( 0,this.x, this.y,0,0) );
                    }

                    // hpが1000以上あるキャラはボスとみなして、処理をさせる
                    if( teki[i].mhp >= 1000 )
                    {
                        bossHP = teki[i].hp;
                        bossMHP = teki[i].mhp;
                    }
                    break
                }
            }
        }
    }

    draw(){
        super.draw();
    }
}

// 自機クラス
// hp制、max hp = 100
class Jiki{
    constructor(){
        this.x      = (FIELD_W/2)<<8;
        this.y      = (FIELD_H - 50)<<8;(FIELD_H/2)<<8;
        this.mhp    = 100;
        this.hp     = this.mhp;

        this.speed  = 512;   // 256で1フレーム１ピクセル
        this.anime  = 0;
        // 弾の出せる間隔を制御する
        this.reload = 0;
        this.relo2  = 0;
        this.r      = 3;
        this.damage = 0;
        this.muteki = 0;
        this.count  = 0;
        this.stCount= 0;
    }

    // 自機の移動
    update(){
        this.count++;
        if( this.damage ) this.damage--;
        if( this.muteki ) this.muteki--;
        if( this.stCount ) this.stCount--;

        // strong count の間、弾の数増やす
        if ( key[32] && this.reload==0 && this.stCount ){
            // tama.push(
            //     new Tama( this.x,this.y, 0,-1300 ));
            tama.push( new Tama( this.x+(6<<8),this.y-(10<<8),    0,-2000 ));
            tama.push( new Tama( this.x-(6<<8),this.y-(10<<8),    0,-2000 ));
            tama.push( new Tama( this.x+(6<<8),this.y-(10<<8),    800,-2000 ));
            tama.push( new Tama( this.x-(6<<8),this.y-(10<<8),    -800,-2000 ));
            tama.push( new Tama( this.x+(8<<8),this.y-(5<<8),  400,-2000 ));
            tama.push( new Tama( this.x-(8<<8),this.y-(5<<8), -400,-2000 ));
            // 数フレームごとにしか弾は出せない設定
            this.reload = 4;
            if( ++this.relo2 == 4 ){
                this.reload = 20;
                this.relo2 = 0;
            }
        } else if ( key[32] && this.reload==0 ){
            // tama.push(
            //     new Tama( this.x,this.y, 0,-1300 ));
            tama.push( new Tama( this.x+(6<<8),this.y-(10<<8),    0,-2000 ));
            tama.push( new Tama( this.x-(6<<8),this.y-(10<<8),    0,-2000 ));
            tama.push( new Tama( this.x+(8<<8),this.y-(5<<8),  400,-2000 ));
            tama.push( new Tama( this.x-(8<<8),this.y-(5<<8), -400,-2000 ));
            // 数フレームごとにしか弾は出せない設定
            this.reload = 4;
            if( ++this.relo2 == 4 ){
                this.reload = 20;
                this.relo2 = 0;
            }
        }
        if( !key[32] ) this.reload = this.relo2 = 0;
        if( this.reload > 0 ) this.reload--;
        if( key[37] && this.x>this.speed ){
            this.x -= this.speed;
            if (this.anime>-8) this.anime--;
        } else if( key[39] && this.x<=(FIELD_W<<8)-this.speed ){
            this.x += this.speed;
            if (this.anime<8) this.anime++;
        } else {
            if (this.anime>0) this.anime--;
            if (this.anime<0) this.anime++;
        }
        if( key[38] && this.y>this.speed ){
            this.y -= this.speed;
        }
        if( key[40] && this.x<=(FIELD_W<<8)-this.speed ){
            this.y += this.speed;
        }
    }

    draw(){
        // 無敵の状態では点滅させる
        if( this.muteki && (this.count&1)) return;
        // 4フレームで１コマとかにするため、2ビットシフトされてる
        drawSprite(2 + (this.anime>>2), this.x, this.y);

        // 噴射の描画
        drawSprite(9 + (this.anime>>2), this.x, this.y+(24<<8));
    }
}