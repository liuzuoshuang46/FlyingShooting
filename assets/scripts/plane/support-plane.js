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
        isState : false,
        planeSpfram:{
            type: [cc.SpriteFrame],
            default: []
        },
    },

    start( ) {
        this.node.x = 320;
        this.node.y = -100;
        this.nofireLeftTime = 0.5;


        this.mPos = cc.v2(0,0);
    },
    
    setPlanePos( pos ){
        this.targetPos = pos;
        this.offPos = cc.v2( pos.x - this.node.x, pos.y - this.node.y );
        this.dire = Math.atan2( this.offPos.y, this.offPos.x );
        this.isState = true;
    },

    exitScene () {
        this.isState = false;
        // var time = ( -300 - this.node.y ) * -1 / 800;
        // this.node.runAction( cc.sequence(
        //     cc.moveTo( time, this.node.x, -300 ),
        //     cc.callFunc( function(){ this.node.destroy(); }.bind( this ))
        // ) );
        this.node.active = false;
        this.node.destroy();


    },
    updataSkin(skinId)
    {
        //this.node.getChildByName('skin').getComponent(cc.Sprite).spriteFrame = this.planeSpfram[Number(skinId - 1)];

        skinId =  skinId%2;
        var js = 0;
        var node = this.node.getChildByName('skin');
        node.stopAllActions();
        node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.delayTime(0.1 ),
                    cc.callFunc( function(){
                        js ++;
                        js = js >= 4 ? 0 : js;
                        node.getComponent(cc.Sprite).spriteFrame = this.planeSpfram[skinId* 4 + js];
                    }.bind( this ))
                )
            )
        );

    },
    stepUpdate ( dt ) {
        if( this.nofireLeftTime > 0 ){
            this.nofireLeftTime -= dt;
        }
        // var dis = app.util.v2Distance( this.node.position, this.targetPos );
        // if( dis < 130 ){
        //     return;
        // }
        // var speed = dis * 2;
        // if( speed < 100 ){
        //     speed = 100;
        // }
        // if( speed > 800 ){
        //     speed = 800;
        // }
        // this.node.x += Math.cos( this.dire ) * dt * speed;
        // this.node.y += Math.sin( this.dire ) * dt * speed;


        if(this.mPos == undefined)
            return;
        var point = this.targetPos;
        //cc.log("point=",point);
        point = cc.v2(point.x + this.mOffsetPos.x,point.y + this.mOffsetPos.y);
        //cc.log("point=",point);
        var tempPos =cc.v2(point.x - this.mPos.x,point.y - this.mPos.y);//;
        //cc.log("tempPos=",tempPos);
        this.mPos =cc.v2(tempPos.x/9 + this.mPos.x,tempPos.y/9 + this.mPos.y);
        //cc.log("mPos=",this.mPos);
        this.node.position = this.mPos;
    }
});
