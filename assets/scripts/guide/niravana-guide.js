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
        
    },

    start () {
        app.gameMgr.pauseGame();
        app.gameMgr.mask.opacity = 0;
        app.gameMgr.mask.stopAllActions();
    },

    next () {
        app.gameMgr.resumeGame();
        app.gameMgr._guidePlaying = false;
        this.node.destroy();
        app.gameMgr.useNiravana();
    },

    onEnable () {
        app.chsdk.showBanner('niravana_guide');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }
    
});
