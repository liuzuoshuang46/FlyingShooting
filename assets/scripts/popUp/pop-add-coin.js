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
        lblNum:cc.Label
    },
    
    start(){
        this.lblNum.string = app.player.get('level') * 1500;
    },

    clickGet() {
        if( !app.player.buyPopCoinEnable() ){
            app.logView.log('今日次数已满，明日再来！')
            return;
        }

        var next = function( ret ){
            if( !ret ){
                app.logView.log('分享失败，未能领取奖励');
                return;
            }
            app.player.addCandy( app.player.get('level') * 1500 );
            app.player.addBuyPopCoinNum( 1 );
            app.logView.log('已领取' + app.player.get('level') * 1500 + '金币');
            
            this.clickClose();
        }.bind( this );
        app.chsdk.share( next );
    },

    clickClose(){
        this.node.destroy();
    },

    onEnable () {
        app.chsdk.showBanner('pop_add_coin');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }

});
