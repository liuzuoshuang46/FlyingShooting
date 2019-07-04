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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        supportIcon:cc.Sprite,
        supportSprite: {
            type: [cc.SpriteFrame],
            default: []
        },
    },
    onEnable () {
        app.gameMgr.pauseAllEnemyActions();
        app.projFunc.showBannerWithDelayAndOffy( {
            offy: 220,
            nodeBtn: this.node.getChildByName('button1')
            //promntion: this.node.getChildByName('home-promotion')
            //bannerId: 'adunit-7ed80eb54acea9fc'//adunit-5c466ab615374994
        });


    },
    updataSpriteFrame(indx)
    {
        this.supportIndx = indx;
        this.supportIcon.spriteFrame = this.supportSprite[indx];
    },
    clickClose ()
    {
        app.gameMgr.resumeAllEnemyActions();
        this.node.destroy();
    },
    clickTryRole ()
    {
        var successCall = function(){
            app.gameMgr.resumeAllEnemyActions();
            this.node.destroy();
            app.player.set('useSupportId',Number(this.supportIndx));
            app.gameMgr.plane.initRoleData();
            app.gameMgr.plane.checkSupportPlane();
        }.bind( this );

        app.chsdk.callAdVideo( function( ret ){
            if( ret ){
                successCall();
            }else{
                app.logView.log('奖励领取失败');
            }
        } );



    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    onDisable () {
        app.chsdk.rmBanner();
    }
});
