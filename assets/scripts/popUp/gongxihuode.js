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
        lblNum: cc.Label
    },
    
    onLoad () {
    },

    init ( str,closeCall ) {
        this.lblNum.string = str;
        this.closeCall = closeCall;
    },

    clickGet () {
        this.node.destroy();
        this.closeCall && this.closeCall();
    },
    // // 出banner
    // showBanner () {
    //     var bannerInst = app.chsdk.showBanner('adunit-5c466ab615374994');
    //     bannerInst && bannerInst.hide();
    //     bannerInst && bannerInst.show();
    //     return bannerInst;
    // },
});
