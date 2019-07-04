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
        lblDesc:cc.Label,
        lblPrice:cc.Label
    },
    
    clickBuy (  ) {
        var opt = this.opt;
        if( app.player.checkDiamond( opt.cost ) ){
            app.player.diamondBuy( opt.cost );
            opt.next && opt.next();
            this.clickClose();
        }
    },

    loadOpt ( opt ) {
        this.opt = opt;
        this.lblDesc.string = '是否花费' + opt.cost + '钻石购买' + opt.str;
        this.lblPrice.string = opt.cost;
    },

    clickClose () {
        this.node.destroy();
    }
});
