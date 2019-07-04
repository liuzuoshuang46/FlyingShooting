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
        lblCoinNum:{
            type: cc.Label,
            default:null
        },
        homePromotion: require('home-promotion')
    },
    
    show ( isWin, catchedCoin ){

        app.datasdk.statistics.levelStatistics( app.player.get( 'level' ), isWin );

        var curTime = Date.now();
        app.datasdk.yunsdk.reportUserBehavior('StreamingStopped',curTime, parseInt( ( curTime - app.gameMgr._startTime ) / 1000  ));

        catchedCoin = catchedCoin || app.gameMgr.catchedCoin;
        this.isWin = isWin;
        this.catchedCoin = catchedCoin;
        this.coinMultiple = app.json.tbProfitBasics.json[ app.player.get('profitBasics') ].val;
        this.node.active = true;
        this.lblCoinNum.string = app.util.formatNum( parseInt( catchedCoin * this.coinMultiple ) ) ;
        //this.node.scale = 0;
        //this.node.runAction( cc.scaleTo(0.2,1).easing(cc.easeIn(5)) );

        app.animMgr.showGameOver();
        app.gameMgr.resetAndClearLevelData();
        if(app.sidebarList.length > 0) {
            this.homePromotion.node.active = true;
            this.homePromotion.init();
        }
        else
        {
            this.homePromotion.node.active = false;
        }
    },

    hide ( ) {
        this.node.active = false;
    },

    catchCoin () {
        this.node.active = false;
        var node = cc.instantiate( app.resMgr.prefBoomCoin );
        node.parent = app.node;
        app.gameMgr.onCatchedCoin();
        // app.gameMgr.mask.opacity = 0;

        // var ani = node.children[1].getComponent( dragonBones.ArmatureDisplay );
        // ani.addEventListener(dragonBones.EventObject.COMPLETE, function(){
        //     node.destroy();
        //     if( this.isWin ){
        //         var nextLevel = app.player.getNextLevel();
        //         if( nextLevel ){
        //             app.player.set('level',nextLevel);
        //         }
        //         app.player.addStrength( 2, Date.now() );
        //
        //         app.homeWgt.selectPlaneLayer.init();
        //         app.homeWgt.selectSupportLayer.init();
        //     }
        //     app.player.set(
        //         'coin',
        //         app.player.get('coin') + this.catchedCoin * this.coinMultiple
        //     );
        //
        //     if( app.player._tryOutRoleData && app.player._tryOutRoleData.used ){
        //         app.player._tryOutRoleData = {};
        //     }
        //
        //     app.returnHome( this.isWin );
        //
        // }.bind( this ));

        node.destroy();
        if( this.isWin ){
            var nextLevel = app.player.getNextLevel();
            if( nextLevel ){
                app.player.set('level',nextLevel);
            }
            app.player.addStrength( 2, Date.now() );

            app.homeWgt.selectPlaneLayer.init();
            app.homeWgt.selectSupportLayer.init();
        }
        app.player.set(
            'coin',
            app.player.get('coin') + this.catchedCoin * this.coinMultiple
        );

        if( app.player._tryOutRoleData && app.player._tryOutRoleData.used ){
            app.player._tryOutRoleData = {};
        }

        app.returnHome( this.isWin );

        cc.audioEngine.play( app.audioMgr.audioGameOverCatchCoin, false, app.player.get('switchAudio') ? 1 : 0 );
    },

    luckyPrize () {
        app.logView.log('功能暂未开放');
    },

    doubleGet(){
        // this.catchCoin();
        // if( !app.chsdk.canPlayVideo() ) {
        //     this.catchCoin();
        //     return;
        // }
        var successCall = function(){
            this.catchedCoin *= 2;
            this.catchCoin();
        }.bind( this );

        if(window.shareJs <= 5 && app.hbswitch.hideVideoSpr)
        {
            app.chsdk.share( function( ret ){
                if( ret ){
                    successCall();
                }else{
                    app.logView.log('领取奖励失败，请分享到不同群组');
                }
            } );
        }
        else {
            app.chsdk.callAdVideo(function (ret) {
                if (ret) {
                    successCall();
                } else {
                    app.logView.log('奖励领取失败');
                }
            });
        }


    },

    onEnable () {
        // app.chsdk.showBanner('game_over');
        this.node.getChildByName('home-promotion').active = false;
        app.projFunc.showBannerWithDelayAndOffy( {
            offy: 430  + ( cc.winSize.height - 1136 ) / 2 ,
            nodeBtn: this.node.getChildByName('btnGet')
            //promntion: this.node.getChildByName('home-promotion')
            //bannerId: 'adunit-7ed80eb54acea9fc'//adunit-5c466ab615374994
        });
        if( !app.chsdk.canPlayVideo() ) {
            this.disableADBtn();
        }
    },

    disableADBtn () {
        this.node.getChildByName('btnDouble').getChildByName('homeui').x = 0;
        this.node.getChildByName('btnDouble').getChildByName('homeui').getComponent( cc.Label ).string = '点击领取';
        this.node.getChildByName('btnDouble').getChildByName('videoad11').active = false;
        this.node.getChildByName('btnGet').active = false;
    },

    onDisable () {
        app.chsdk.rmBanner();
    }
});
