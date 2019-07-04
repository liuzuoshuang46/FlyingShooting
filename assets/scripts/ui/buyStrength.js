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
        lblCost:{
            type: cc.Label,
            default: null
        },
        lblStrength:{
            type: cc.Label,
            default: null
        },
    },
    
    show () {
        this.init() ;
    },

    init () {
        this.initData();
        this.initUI();
    },

    initData() {
        var buyedNum = app.player.getDailyResetByKey('buyStrengthEnable');
        var ret = app.json.tbRechargeStrength.json[1].selling;
        for(var i = 0;i < buyedNum; i++ ){
            ret *= 2;
        }
        this._consume = ret;

        this._power = app.json.tbRechargeStrength.json[1].power;
    },
    initUI() {
        this.lblCost.string = '立即获得';this._consume;
        this.lblStrength.string = this._power;
    },

    clickBuy () {
        if( app.player.get('strengthData').num >= app.strengthMax ){
            app.logView.log('体力已满，无需购买');
            return;
        }
        var canBuy = app.player.buyStrengthEnable();
        if( canBuy ){
            // if( app.player.checkDiamond(this._consume) && app.player.diamondBuy(this._consume) ){
            //     app.datasdk.statistics.strengthBuyStatistics(  );
            //     app.player.addStrength( this._power );
            //     app.player.addBuyStrengthNum( 1 );
            // }
            var next = function( ret ){
                if( ret ){
                    app.datasdk.statistics.strengthBuyStatistics(  );
                    app.player.addStrength( this._power );
                    app.player.addBuyStrengthNum( 1 );
                    app.logView.log('领取体力成功');
                }else{
                    app.logView.log('购买体力失败');
                }
            }.bind( this );

            app.chsdk.share( next );
        }else{
            app.logView.log('超出每次购买次数限制');
        }
        this.init();
    },

    onEnable () {
        app.chsdk.showBanner('buy_strength');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }
});
