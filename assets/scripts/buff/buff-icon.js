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
        spIcon: cc.Sprite,
        lblName: cc.Label
    },
    
    init ( buffId, delegate ) {
        this.initData( buffId, delegate );
        this.initUI();
        this.startAction();
    },
    
    initData ( buffId, delegate ) {
        this.tbData = app.json.tbBuff.json[ buffId ];
        this.buffId = buffId;
        this.delegate = delegate;
        this.removeDt = 0;
    },

    initUI () {
        if( this.tbData.type == 1 ){
            this.spBorder.spriteFrame = app.resMgr.frameBuffIconBorder;
        }else if( this.tbData.type == 2 ) {
            this.spBorder.spriteFrame = app.resMgr.frameDeBuffIconBorder;
        }
        this.spIcon.spriteFrame = app.resMgr['frameBuff' + this.buffId ];
        this.lblName.string = this.tbData.buff_name;
    },

    startAction () {
        this.node.stopAllActions();

        this.node.runAction(  cc.sequence(
            cc.delayTime( this.tbData.time ),
            cc.callFunc( function(){
                this.delegate.removeBuffIcon( this )
            }.bind( this ) )
        ) );

        this.node.runAction( cc.repeatForever(
            cc.sequence(
                cc.callFunc( function(){
                    this.spBorder.fillRange = ( this.tbData.time - this.removeDt ) / this.tbData.time;
                }.bind( this )),
                cc.delayTime( 1 ),
                cc.callFunc( function(){
                    this.removeDt += 1;
                }.bind( this )),
            )
        ) );
    }
});
