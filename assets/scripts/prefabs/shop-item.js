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
        spIcon1:{
            type: cc.Sprite,
            default: null
        },
        spIcon2:{
            type: cc.Sprite,
            default: null
        },
        lblNum1:{
            type: cc.Label,
            default:null
        },
        lblNum2:{
            type: cc.Label,
            default:null
        },
        lblGift:{
            type: cc.Label,
            default:null
        },
        lblGiftNum:{
            type: cc.Label,
            default:null
        },
        lblCostNum:{
            type: cc.Label,
            default: null
        },
        lblCostType:{
            type: cc.Label,
            default: null
        },
        nodePresent:{
            type: cc.Node,
            default: null
        },
        readLine: cc.Node
    },

    init ( opts ) {
        this.initData( opts );
        this.initUI();
    },
    initData ( opts ) {
        var zIndex = 0;
        if( opts.type === app.enum.CURRENCY_CANDY ){ 
            this.tbData = app.json.tbRechargeCandy.json[ opts.id ];
        }else if( opts.type === app.enum.CURRENCY_DIAMOND ){ 
            this.tbData = app.json.tbRechargeDiamond.json[ opts.id ];
        }
        this.opts = opts;
        if( this.tbData.present ){
            this.presentNum = this.tbData.getthediamond * this.tbData.percentage / 100;
        }
    },
    initUI () {
        if( this.opts.type === app.enum.CURRENCY_CANDY ){ 
            this.spIcon1.spriteFrame = this.spIcon2.spriteFrame = app.resMgr.frameCandy;
            this.lblGift.string = '多送 ' + app.util.formatNum( this.presentNum );
            this.lblCostType.string = '钻石';
            this.spIcon1.node.width *= 0.7;
            this.spIcon2.node.width *= 0.7;
        }else{
            this.lblGift.string = '多送 ' + app.util.formatNum( this.presentNum );
            this.spIcon1.node.width /= 0.7;
            this.spIcon2.node.width /= 0.7;
        }

        this.lblGiftNum.node.active = false;

        this.lblNum1.string = 'x' + app.util.formatNum( this.tbData.getthediamond );
        this.lblCostNum.string = app.util.formatNum( this.tbData.selling );

        this.readLine.active = this.nodePresent.active = !!this.presentNum;
        this.lblNum2.string = app.util.formatNum( this.tbData.getthediamond + ( this.presentNum ? this.presentNum : 0 ) );
        this.lblGiftNum.string = app.util.formatNum( this.presentNum );
        this.node.zIndex = this.opts.zIndex;
    },

    clickBuy () {
        if( this.opts.type === app.enum.CURRENCY_CANDY ){ 
            if( app.player.checkDiamond(this.tbData.selling) && app.player.diamondBuy( this.tbData.selling ) ) {
                app.datasdk.statistics.coinBuyStatistics( this.tbData.selling );
                app.player.addCandy( this.tbData.getthediamond + ( this.presentNum ? this.presentNum : 0 ) );
            }
        }else{
            app.player.buyDiamond( this.tbData, function(){
                app.datasdk.statistics.diamondBuyStatistics( this.tbData.selling );
                app.player.addDiamond( this.tbData.getthediamond + ( this.presentNum ? this.presentNum : 0 ) );
            }.bind( this ) )
        }
    }
});
