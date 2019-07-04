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
        _hideCallf:null
    },

    start () {
        var btnNode = this.node.getChildByName('iknow');
        btnNode.active = false;

        var btnNode = this.node.getChildByName('iknow');
        this.scheduleOnce(function(){
            btnNode.active = true;
            btnNode.runAction( cc.fadeTo(0.2,255) );
        },1.8);
    },

    hide () {
        app.datasdk.statistics.clickGameGuideIKnow();
        app.player.set('gameGuide',1);
        this._hideCallf && this._hideCallf();
        this.node.destroy();
    },

    onEnable () {
        app.chsdk.showBanner('game_guide');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }
});
