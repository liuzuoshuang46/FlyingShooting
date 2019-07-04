import { fail } from "assert";

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
        lblCoin : {
            type: cc.Label,
            default: null
        },

        homePromotion: require('home-promotion')
    },
    
    resetDiamondNum () {
        var revivaledNum = app.gameMgr.levelRevivalNum;
        var ret = app.json.tbRevival.json[1].consume_diamond;
        for(var i = 0;i < revivaledNum; i++ ){
            ret *= 2;
        }
        this._consume = ret;
    },

    show () {
        this.node.active = true;
        this.countdownTime = 10;
        this.lblCoin.string = '10';
        this.countdownState = true;
        this.resetDiamondNum();
        if(app.sidebarList.length > 0) {
            this.homePromotion.node.active = true;
            this.homePromotion.init();
        }
        else
        {
            this.homePromotion.node.active = false;
        }

    },

    hide () {
        this.node.active = false;
    },

    clickContinue () {
        this.hide();
        app.gameMgr.showGameOverNode( false );
    },

    clickRevival () {

        // this.countdownState = true;
        // app.datasdk.statistics.revivalBuyStatistics(  );
        // app.gameMgr.revivalPlane();
        // this.hide();


        // if( app.player.revivalEnable() ) {
        //     if( app.player.checkDiamond( this._consume ) && app.player.diamondBuy( this._consume ) ){
        //         app.datasdk.statistics.revivalBuyStatistics(  );
        //         app.gameMgr.revivalPlane();
        //         this.hide();
        //     }
        // }else{
        //     app.logView.log( '超出每天复活次数上限' + app.json.tbRevival.json[1].upper + '次');
        // }
        this.countdownState = false;
        var successCall = function(){
            this.countdownState = true;
            app.datasdk.statistics.revivalBuyStatistics(  );
            app.gameMgr.revivalPlane();
            this.hide();
        }.bind( this );

        if(window.shareJs <= 5 && app.hbswitch.hideVideoSpr)
        {
            app.chsdk.share( function( ret ){
                if( ret ){
                    successCall();
                }else{
                    app.logView.log('领取奖励失败，请分享到不同群组');
                    this.countdownState = true;
                }
            }.bind( this ) );
        }
        else {
            app.chsdk.callAdVideo(function (ret) {
                if (ret) {
                    successCall();
                } else {
                    app.logView.log('奖励领取失败');
                    this.countdownState = true;
                }
            }.bind( this ));
        }
    },

    onEnable () {
        this.node.getChildByName('home-promotion').active = false;
        app.projFunc.showBannerWithDelayAndOffy( {
            offy:700 + ( cc.winSize.height - 1136 ) / 2,
            nodeBtn: this.node.getChildByName('button1')
            //promntion: this.node.getChildByName('home-promotion'),
            //bannerId: 'adunit-7ed80eb54acea9fc'//adunit-5c466ab615374994
        });

        if( !app.chsdk.canPlayVideo() ) {
            this.disableADBtn();
        }

    },

    disableADBtn () {
        // this.node.getChildByName('button').getChildByName('homeui').getComponent( cc.Label ).string = '重新开始';
        this.node.getChildByName('button').getChildByName('videoad11').active = false;
        // this.node.getChildByName('button1').active = false;
    },
    update (dt) {

        if(this.countdownState == false || app.chsdk.adShow  || app.pop.node.children.length > 0)
            return;

        this.countdownTime -= dt;
        if(this.countdownTime <= 0)
        {
            this.countdownState = false;
            this.hide();
            app.gameMgr.showGameOverNode( false );
        }
        else
        {
            this.lblCoin.string = parseInt(Number(this.countdownTime));
        }


    },
    onDisable () {
        app.chsdk.rmBanner();
    }

});
