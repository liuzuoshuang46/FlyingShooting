// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// 出场生成随机位置
var randDireAndPos = function( idx ){
    var ret = {
        dire:_.random( 180 + 60, 180 + 60 * 2 ),
        pos:cc.v2( _.random(50,600),_.random(1200,1500) + idx * 800 )
    }
    return ret;
}

cc.Class({
    extends: cc.Component,
    
    init ( opt ) {
        if( !opt.bodyWidth && !opt.bodyHeight ){
            console.error( 'moveComponent opt error' );
        }
        if( !opt.speed ){
            console.error( 'moveComponent opt.speed error' );
        }
        
        this.opt = opt;
        this.direction = _.random( 180 + 60, 180 + 60 * 2 );
        this.resetMathTan();
    },

    // 检测是否撞墙了
    checkCollisionScreen(){
        var log = function(){};

        var checkLeft, checkRight, checkTop, bodyWidth, bodyHeight;
        checkLeft = this.opt.checkLeft || 0;
        checkRight = this.opt.checkRight || cc.winSize.width;
        checkTop = this.opt.checkTop || cc.winSize.height;
        bodyWidth = this.opt.bodyWidth || this.opt.bodyHeight;
        bodyHeight = this.opt.bodyHeight || this.opt.bodyWidth;

        var colLeft,colRight,colTop;
        colLeft = colRight = colTop = false;
        if( ( this.direction >= 90 && this.direction <= 270 ) && this.node.position.x - bodyWidth / 2 <= checkLeft ) {
            colLeft = true;
        }
        if( ( this.direction >= 270 || this.direction <= 90 ) && this.node.position.x + bodyWidth / 2 >= checkRight ){
            colRight = true;
        }

        if( this.node.position.y + this.bodyHeight / 2 >= checkTop && ( this.direction > 0 && this.direction < 180 ) ){
            colTop = true;
        }

        if( colLeft ){
            log('left ' + this.direction + " : " +  (180 + 360 - this.direction) % 360);
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }else if( colRight ){
            log('right ' + this.direction + " : " +  (360 - this.direction) ) ;
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }
        
        if( colTop ){
            log('top ' + this.direction + " : " +  (360 - this.direction) ) ;
            this.direction = 360 - this.direction;
            this.resetMathTan();
        }
        
        this.checkOutScreen();
    },

    // 检查是否掉出屏幕外
    checkOutScreen () {
        var bodyHeight = this.opt.bodyHeight || this.opt.bodyWidth;
        if( this.node.position.y + bodyHeight / 2 < 0 ){
            if( this.opt.onOutScreen ) {
                this.opt.onOutScreen( this.node );
            }else{
                this.node.y += 1200 + bodyHeight;
            }
        }
    },

    // 缓存tan值
    resetMathTan () {
        this._mathTan = Math.tan( app.util.angle2radians( this.direction ) );
    },
    
    // 移动的计算
    updatePos ( dt ) {
        this.checkCollisionScreen();
        
        var speed = this.opt.speed;
        var dis = dt * speed;

        var offy = dis * (this.direction > 180 ? -1 : 1) ;
        var offx = offy / this._mathTan ;

        this.node.x += offx;
        this.node.y += offy;
    },

});
