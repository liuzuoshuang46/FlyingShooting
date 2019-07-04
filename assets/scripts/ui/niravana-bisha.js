// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var buyCost = 3000;
var timeDt = 30;

cc.Class({
    extends: cc.Component,

    properties: {
        nodeEffect:cc.Node,
        spMask: cc.Sprite
    },

    start () {
        this.init();
        this.schedule( this.timeInterval, 1 );
    },

    timeInterval () {
        if( this._useIntervel && this._useIntervel > 0 ){
            this._useIntervel -= 1;
            var percent = this._useIntervel / timeDt;
            this.spMask.fillRange = percent;

            if( this._useIntervel <= 0 ){
                delete this._useIntervel;
                this.init();
            }
        }
    },

    init () {
        this.initData();
        this.initUI();
    },

    initData () {
    },

    initUI () {
        this.nodeEffect.active = false;
        this.spMask.node.active = false;

        this.spMask.fillRange = 1;

        if( this._useIntervel ){
            this.spMask.node.active = true;
        }else{
            this.nodeEffect.active = true;
        }
    },

    clickSkill () {

        app.gameMgr._niravanaPlaying = true;
        app.gameMgr.pauseAllEnemyActions();
        app.gameMgr.plane.setNiravana1State(true);

        if(window.shareJs <= 5 && app.hbswitch.hideVideoSpr)
        {
            app.chsdk.share( function( ret ){
                if( ret ){
                    app.player.addNiravanaNum();
                    app.gameMgr.useNiravana1();
                    this._useIntervel = timeDt;
                    this.init();
                }else{
                    app.logView.log('领取奖励失败，请分享到不同群组');
                    app.gameMgr._niravanaPlaying = false;
                    app.gameMgr.resumeAllEnemyActions();
                    app.gameMgr.plane.setNiravana1State(false);

                }
            }.bind( this ) );
        }
        else {
            app.chsdk.callAdVideo(function (ret) {
                if (ret) {
                    app.player.addNiravanaNum();
                    app.gameMgr.useNiravana1();
                    this._useIntervel = timeDt;
                    this.init();
                } else {
                    app.logView.log('奖励领取失败');
                    app.gameMgr._niravanaPlaying = false;
                    app.gameMgr.resumeAllEnemyActions();
                    app.gameMgr.plane.setNiravana1State(false);

                }
            }.bind( this ));
        }
        // app.player.addNiravanaNum();
        // app.gameMgr.useNiravana1();
        // this._useIntervel = timeDt;
        // this.init();
        // return;
        // if( app.player.get('level') < app.G.guideCheck.niravana.level ){
        //     app.logView.log('第' + app.G.guideCheck.niravana.level + '关开启');
        //     return;
        // }
        //
        //
        // var successCall = function(){
        //     app.player.addNiravanaNum();
        //     app.gameMgr.useNiravana();
        //     this._useIntervel = timeDt;
        //     this.init();
        // }.bind( this );
        //
        // if( !app.chsdk.canPlayVideo() ) {
        //     app.projFunc.popDiamondBuy({
        //         cost:30,
        //         str:'一次必杀技',
        //         next: successCall
        //     });
        // }else{
        //     app.chsdk.callAdVideo( function( ret ){
        //         if( ret ){
        //             successCall();
        //         }else{
        //             app.logView.log('奖励领取失败');
        //         }
        //     } );
        // }
    },
});
