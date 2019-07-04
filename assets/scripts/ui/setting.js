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
        btnShake:{
            type: cc.Node,
            default: null
        },
        btnAudio:{
            type: cc.Node,
            default: null
        },
        clickNodeShake:{
            type: cc.Node,
            default:null
        },
        clickNodeAudio:{
            type: cc.Node,
            default:null
        },
    },

    start () {
        this.initUI();
        this.resetBtn();
    },

    initUI () {
        this.clickNodeAudio.on(cc.Node.EventType.TOUCH_END, function(){ 
            app.player.set('switchAudio',!app.player.get('switchAudio'));
            this.resetBtn();
        }.bind(this) );
        this.clickNodeShake.on(cc.Node.EventType.TOUCH_END, function(){ 
            app.player.set('switchShake',!app.player.get('switchShake')) 
            this.resetBtn();
        }.bind(this) );
    },

    resetBtn () {
        var openPos = 60;
        var closePos = 130;
        this.btnShake.x = app.player.get('switchShake') ? closePos : openPos;
        this.btnAudio.x = app.player.get('switchAudio') ? closePos : openPos;
    },

    closeLy () {
        this.node.active = false;
    },

    onEnable () {
        app.chsdk.showBanner('setting');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }

});
