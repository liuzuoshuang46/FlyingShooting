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
        _idx:0
    },

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.next, this );
        this.next();
    },

    next () {
        if( this._isPlaying ){
            return;
        }

        ++this._idx;
        if( this._idx >= 3 ){
            this.skip();
            return;
        }

        this.getComponent(cc.Animation).play('story-guide-' + this._idx);
        this.getComponent(cc.Animation).on('finished',function(){
            this._isPlaying = false;
        },this);
        
        this._isPlaying = true;
    },

    skip () {
        app.player.set('storyGuide',1);
        this.node.destroy();

        app.homeWgt.nextStartAction();
    },

    onEnable () {
        app.chsdk.showBanner('story_guide');
    },

    onDisable () {
        app.chsdk.rmBanner();
    }
});
