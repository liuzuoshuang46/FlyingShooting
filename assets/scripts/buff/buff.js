import { buff } from "../sfenum";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        spBorder: cc.Sprite,
        spIcon: cc.Sprite
    },

    init ( buffId, delegate, direction ) {
        this.initData( buffId, delegate, direction );
        this.initUI();
        this.startAction();
    },
    
    initData ( buffId, delegate, direction ) {
        this.tbData = app.json.tbBuff_ly.json[ Number(buffId - 1)];
        this.buffId = buffId;
        this.delegate = delegate;
        this.direction = direction;
        this.bodyRadius = 48;


        this.resetMathTan();
    },

    initUI () {
        //转圈的效果
        // if( this.tbData.type == 1 ){
        //     this.spBorder.spriteFrame = app.resMgr.frameBuffBorder;
        // }else if( this.tbData.type == 2 ) {
        //     this.spBorder.spriteFrame = app.resMgr.frameDeBuffBorder;
        // }
        if(this.buffId == 1){
            this.spIcon.spriteFrame = app.resMgr['frameBuff6'];//aa
        }
        else if(this.buffId == 2)
        {
            this.spIcon.spriteFrame = app.resMgr['frameBuff7'];//ff
        }
        else if(this.buffId == 3)
        {
            this.spIcon.spriteFrame = app.resMgr['frameBuff8'];//ll
        }
        else if(this.buffId == 4)
        {
            this.spIcon.spriteFrame = app.resMgr['frameBuff9'];//mm
        }


    },

    startAction () {
        this.node.stopAllActions(); 
        this.node.getComponent( cc.Animation ).stop( 'bufffade' );
        this.node.opacity = 255;

        var time1 = this.tbData.buffare_time - 3;
        var time2 = 3;

        this.node.runAction(  cc.sequence(
            cc.delayTime( time1 ),
            cc.callFunc( function(){
                this.node.getComponent( cc.Animation ).playAdditive('bufffade');
            }.bind( this ) ),
            cc.delayTime( time2 ),
            cc.callFunc( function(){
                this.delegate.removeBuff( this )
            }.bind( this ) )
        ) );
    },

    // 检测是否撞墙了
    checkCollisionScreen(){
        var colLeft,colRight,colTop,colBottom;
        colLeft = colRight = colTop = false;
        if( ( this.direction >= 90 && this.direction <= 270 ) && this.node.position.x - this.bodyRadius <= 0 ) {
            colLeft = true;
        }
        if( ( this.direction >= 270 || this.direction <= 90 ) && this.node.position.x + this.bodyRadius >= cc.winSize.width ){
            colRight = true;
        }

        if( this.node.position.y + this.bodyRadius >= cc.winSize.height && ( this.direction > 0 && this.direction < 180 ) ){
            colTop = true;
        }

        if( this.node.position.y - this.bodyRadius <= 0 && ( this.direction > 180 && this.direction < 360 ) ){
            colBottom = true;
        }

        if( colLeft ){
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }else if( colRight ){
            this.direction = (180 + 360 - this.direction) % 360;
            this.resetMathTan();
        }
        
        if( colTop || colBottom ){
            this.direction = 360 - this.direction;
            this.resetMathTan();
        }
        
        this.checkOutScreen();
    },

    // 检查是否掉出屏幕外
    checkOutScreen () {
        if( this.node.position.y + this.bodyRadius < 0 ){
            this.node.y += 1200 + this.bodyRadius * 2;
        }
    },

    // 缓存tan值
    resetMathTan () {
        this._mathTan = Math.tan( app.util.angle2radians( this.direction ) );
    },

    stepUpdate ( dt ) {
        this.checkCollisionScreen();

        var speed = 100;
        if( app.gameMgr.isPause )
            speed = 30;

        var dis = dt * speed;

        var offy = dis * (this.direction > 180 ? -1 : 1) ;
        var offx = offy / this._mathTan ;

        this.node.x += offx ;
        this.node.y += offy ;
    }
});
