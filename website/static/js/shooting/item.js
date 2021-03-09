
//
// item.js
//



// 各種設定
const MUTEKI_TIME     = 120;  // 2sec
const STRONG_TIME     = 120;  // 2sec この間色変える？？
const STRONG_POWER    = 10;   // ＋分、元が１０やから２倍

// 敵弾クラス、Teki tama = Teta
class Item{
    constructor( snum,x,y,vx,vy ){
        this.sn     = snum;
        this.x      = x;
        this.y      = y;
        this.vx     = vx;
        this.vy     = vy;
        this.type   = itemSprite[ this.sn ].type;
        this.strong = itemSprite[ this.sn ].strong;
        this.kill   = false;
        this.count  = 0;

        // 判定めっちゃ甘め
        this.r = 32;
    }
    
    draw()
    {
        drawItem( this.sn, this.x, this.y );
    }

    update()
    {
        if( checkHit( jiki.x,jiki.y,jiki.r, this.x,this.y,this.r ) )
        {
            this.kill = true;
            switch( this.type ){
                case ITEM_RECOVER:
                    jiki.hp += this.strong;
                    return;
                case ITEM_MUTEKI:
                    jiki.muteki = MUTEKI_TIME;
                    return;
                case ITEM_ATTACK:
                    jiki.strong += STRONG_POWER;
                    jiki.stCount = STRONG_TIME;
                    return;
            }
        }

    }

}
